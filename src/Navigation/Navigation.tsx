import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
//import component for routing
import Register from '../Components/Register/Register'


//create a stack navigator for ONE component
const Stack = createStackNavigator();

export default class Navigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        );
    }

}