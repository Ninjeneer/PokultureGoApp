import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from '../Components/Login/Login';
//import Connection from '../ComponentConnection/Connection';
import Challenge from '../Components/Challenge/Challenge';
import Overlay from '../Components/Overlay/Overlay';
//import component for routing
import Register from '../Components/Register/Register'
import Map from '../Components/Map/Map'
import RestAPI from '../RestAPI';

const Stack = createStackNavigator();
export default class Navigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Map">{(props) => <Map {...props}></Map>}</Stack.Screen>
                <Stack.Screen name="Challenge">{(props) => <Challenge {...props}></Challenge>}</Stack.Screen>
                <Stack.Screen name="Overlay" component={Overlay} />
            </Stack.Navigator>
        );
    }

}