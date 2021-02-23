import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from '../Components/Login/Login';
//import Connection from '../ComponentConnection/Connection';
//import component for routing
import Register from '../Components/Register/Register'


//create a stack navigator for ONE component
const Stack = createStackNavigator();



export default class Navigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        );
    }

}