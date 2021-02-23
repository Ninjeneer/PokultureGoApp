import React from 'react'
import User from '../../models/User'
import { View, TextInput, Text, Button } from 'react-native'
import RestAPI from '../../RestAPI'

export default class Connection extends React.Component<{}, { pseudo: string, password: string }>  {

    render() {
        return (
            <View style={styles.general}>
                <Text style={styles.title}> POKULTURE GO</Text>
                <View>
                    <TextInput onChangeText={(pseudo) => this.setState({ pseudo })} placeholder='Pseudo' style={styles.input} />

                    <TextInput onChangeText={(password) => this.setState({ password })} secureTextEntry={true} style={styles.input} placeholder="Mot de passe" />
                    
                </View>

                <Button style={styles.input}
                    onPress={this.buttonpress}
                    title="Connection"
                    color="#841584"
                   
                />
            </View>
        )
    }
    buttonpress = () => {
        RestAPI.register(new User(this.state['pseudo'], this.state['password']));
    }
}


const styles = {
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
}