import React from 'react'
import IUser from '../../models/User'
import { View, TextInput, Text, StyleSheet, Alert } from 'react-native'
import RestAPI from '../../RestAPI'
import RNFS from 'react-native-fs';
import AppButton from '../Global/AppButton';
export default class Register extends React.Component<any, { pseudo: string, password: string, checkPassword: string }>  {
    constructor(props: any) {
        super(props);
        this.state = {pseudo: "", password: "", checkPassword: ""}
    }

    public render() {
        return (
            <View style={styles.general}>
                <Text style={styles.title}>POKULTURE GO</Text>
                <View>
                    <TextInput onChangeText={(pseudo) => this.setState({ pseudo })} placeholder='Pseudo' style={styles.input} />
                    <TextInput onChangeText={(password) => this.setState({ password })} secureTextEntry={true} style={styles.input} placeholder="Mot de passe" />
                    <TextInput onChangeText={(checkPassword) => this.setState({ checkPassword })} secureTextEntry={true} style={styles.input} placeholder="Confirmer le mot de passe" />
                </View>

                <View>
                    <AppButton
                        onPress={this.register}
                        text="S'inscrire"
                        disabled={
                            this.state.pseudo === "" || 
                            this.state.password === "" ||
                            this.state.checkPassword === ""}
                    />
                    <AppButton
                        onPress={this.goToLogin}
                        text="Déjà un compte ? Se connecter"
                        style={{ marginTop: 10 }}
                    />
                </View>
            </View>
        )
    }

    public register = () => {
        if (!this.state.pseudo || !this.state.password || !this.state.checkPassword) {
            Alert.alert("Erreur de saisie", "Un ou plusieurs champs sont manquants.");
            return;
        }
        if (this.state.password !== this.state.checkPassword) {
            Alert.alert("Erreur de saisie", "Les mots de passe ne correspondent pas.");
            return;
        }
        RestAPI.register(this.state['pseudo'], this.state['password']).then((user: IUser) => {
            console.log(user);
            RestAPI.setUser(user);
            const userInfoFilePath = RNFS.ExternalDirectoryPath + '/userinfo';
            RNFS.writeFile(userInfoFilePath, JSON.stringify(user), 'utf8')
                .then(() => {
                    console.log('FILE WRITTEN!')
                    RNFS.read(userInfoFilePath).then((c) => console.log(c)).catch(e => console.error(e))
                })
                .catch((err: Error) => {
                    console.error("write fail " + err.message);
                });
            this.props.navigation.replace('Map');
        })
    }

    public goToLogin = () => {
        this.props.navigation.replace('Login');
    }
}


const styles = StyleSheet.create({
    input: {
        marginTop: 5,
        borderWidth: 2
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    },
    general: {
        padding: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});