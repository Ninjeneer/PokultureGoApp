import React from 'react'
import IUser from '../../models/User'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native'
import RestAPI from '../../RestAPI'
import RNFS from 'react-native-fs'
import AppButton from '../Global/AppButton'
export default class Connection extends React.Component<any, { pseudo: string, password: string }>  {
    constructor(props: any) {
        super(props);

        RNFS.readFile(RNFS.ExternalDirectoryPath + '/userinfo', 'utf8')
            .then((content) => {
                console.log(content)
                RestAPI.setUser(JSON.parse(content));
                console.log("auto logging");
                this.props.navigation.replace('Map');
            });
    }

    public render() {
        return (
            <View style={styles.general}>
                <Text style={styles.title}> POKULTURE GO</Text>
                <View>
                    <TextInput onChangeText={(pseudo) => this.setState({ pseudo })} placeholder='Pseudo' style={styles.input} />
                    <TextInput onChangeText={(password) => this.setState({ password })} secureTextEntry={true} style={styles.input} placeholder="Mot de passe" />
                </View>

                <View>
                    <AppButton
                        onPress={this.login}
                        text="Se connecter"
                    />
                    <AppButton
                        onPress={this.goToRegister}
                        text="Pas encore de compte ? S'inscrire"
                        style={{ marginTop: 10 }}
                    />
                </View>
            </View>
        )
    }

    public login = () => {
        RestAPI.login(this.state['pseudo'], this.state['password']).then((user) => {
            RestAPI.setUser(user);
            this.props.navigation.replace('Map');
        })
    }

    public goToRegister = () => {
        this.props.navigation.replace('Register')
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