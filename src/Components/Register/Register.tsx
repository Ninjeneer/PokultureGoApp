import React from 'react'
import User from '../../models/User'
import { View, TextInput, Text, Button} from 'react-native'
import RestAPI from '../../RestAPI'
import App from '../../App'
import Navigation from '../../Navigation/Navigation'

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

                <Button style={styles.input}
                    onPress={this.buttonpress}
                   
                    title="Register"
                    color="#841584"
                    
                />
            </View>
        )
    }
    buttonpress = () => {
        //RestAPI.register(new User(this.state['pseudo'], this.state['password']));
        this.props.navigation.navigate('Login')
        
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