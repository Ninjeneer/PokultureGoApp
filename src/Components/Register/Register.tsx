import React from 'react'
import User from '../../models/User'
import { View, TextInput, Text, Button, PermissionsAndroid, Alert, StyleSheet } from 'react-native'
import RestAPI from '../../RestAPI'
const RNFS = require('react-native-fs');
export default class Register extends React.Component<any, { pseudo: string, password: string, checkPassword: string }>  {
    render() {
        return (
            <View style={styles.general}>
                <Text style={styles.title}> POKULTURE GO</Text>
                <View>
                    <TextInput onChangeText={(pseudo) => this.setState({ pseudo })} placeholder='Pseudo' style={styles.input} />
                    <TextInput onChangeText={(password) => this.setState({ password })} secureTextEntry={true} style={styles.input} placeholder="Mot de passe" />
                    <TextInput onChangeText={(checkPassword) => this.setState({ checkPassword })} secureTextEntry={true} style={styles.input} placeholder="Confirmer le mot de passe" />
                </View>

                <Button
                    onPress={this.buttonpress}
                    title="Register"
                    color="#841584"
                />
            </View>
        )
    }
    buttonpress = () => {
        RestAPI.register(new User(this.state['pseudo'], this.state['password'], '')).then((response: User) => {
            RNFS.writeFile(RNFS.DocumentDirectoryPath + '/user.txt', JSON.stringify(response), 'utf8')
                .then(() => {
                    console.log('FILE WRITTEN!');
                })
                .catch((err: Error) => {
                    console.log(err.message);
                });
        })
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