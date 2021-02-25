import React from 'react'
import User from '../../models/User'
import { View, TextInput, Text, Button } from 'react-native'
import RestAPI from '../../RestAPI'
var RNFS = require('react-native-fs');
var path = RNFS.DocumentDirectoryPath + '/test.txt';
export default class Connection extends React.Component<any, { pseudo: string, password: string }>  {
    constructor() {
        
        super({});
        var content =  RNFS.readFile(path, 'utf8')
        console.log(content)
        
        
      }
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
                <Button style={styles.input}
                    onPress={this.inscription}
                    title="Connection"
                    color="#841584"
                   
                />
            </View>
        )
    }
    buttonpress = () => {
        //RestAPI.register(new User(this.state['pseudo'], this.state['password'],''));
    }
    inscription = () => {
        this.props.navigation.navigate('Register')
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