import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default class AppButton extends React.Component<any, any> {
    public render() {
        return (
            <TouchableOpacity style={[styles.default, this.props.style].concat(this.props.disabled ? [styles.disabled] : [])} onPress={this.props.onPress} disabled={this.props.disabled}>
                <Text style={{ textAlign: 'center' }}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: '#FF0000',
        padding: 15,
        justifyContent: 'center',
        alignContent: 'center',
    },
    disabled: {
        backgroundColor: 'grey'
    }
})