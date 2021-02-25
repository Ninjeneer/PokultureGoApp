import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Challenge from '../Components/Challenge/Challenge';
import Overlay from '../Components/Overlay/Overlay';
//import component for routing
import Register from '../Components/Register/Register'
import Map from '../Components/Map/Map'


//create a stack navigator for ONE component
const Stack = createStackNavigator();

export default class Navigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="Challenge">{(props) => <Challenge {...props}></Challenge>}</Stack.Screen>
                <Stack.Screen name="Overlay" component={Overlay} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        );
    }

}