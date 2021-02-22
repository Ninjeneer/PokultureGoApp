import React from 'react'
import User from '../../models/User'
import { View, TextInput,Text, Button, PermissionsAndroid, Alert } from 'react-native'
import RestAPI from '../../RestAPI'
//import { ImagePicker } from 'react-native-image-picker'

class Register extends React.Component<{}, { pseudo: string, password: string, checkPassword: string }>  {
    
    render(){
        return (
            <View style={styles.general}>
                <Text  style={styles.title}> POKULTURE GO</Text>
                <View>
                    <TextInput onChangeText={(pseudo)=>this.setState({pseudo})} placeholder='Pseudo' style={styles.input}/>
                    
                    <TextInput onChangeText={(password)=>this.setState({password})} secureTextEntry={true} style={[styles.password,styles.input]} placeholder="Mot de passe"/>
                    
                    <TextInput onChangeText={(checkPassword)=>this.setState({checkPassword})} secureTextEntry={true} style={[styles.password,styles.input]} placeholder="Confirmer le mot de passe"/>
                </View>
                    
                <Button style={styles.input}
                onPress={this.buttonpress}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
/>
                    
            </View>


        )
    }
    buttonpress = () => {
        const user = new User(this.state['pseudo'],this.state['password'],'nothing')
        RestAPI.register(user)
        


        
    }
} export default Register


const styles = {
    password: {

    },
    input:{
       marginTop:5,
       
        borderWidth: 2
    },
    
    title:{
        textAlign: 'center',
        fontSize: 30
     
       
    },
    general:{
        padding:15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
}