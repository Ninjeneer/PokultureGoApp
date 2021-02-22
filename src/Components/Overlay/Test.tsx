import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Test extends React.Component<{}, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    private toggleOverlay = () => {
        this.setState({ visible: !this.state.visible });
    }

    private show = () => {
        this.setState({ visible: true });
        console.log("lol");
    }

    public render() {
        return (
            <View style={{ height: '100%' }}>
                <Text>hello</Text>
                {
                    this.state.visible ?
                        (<View style={styles.overlay}>
                            <ScrollView>
                                <Image source={require('../../assets/chateau-caen.jpg')} style={styles.poiImage}></Image>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Château de Caen</Text>
                                <Text style={styles.textOverlay}>Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay Overlay </Text>

                            </ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ flex: 1, padding: 5 }}><TouchableOpacity style={styles.button}><Text style={{ textAlign: 'center' }}>Fermer</Text></TouchableOpacity></View>
                                <View style={{ flex: 1, padding: 5 }}><TouchableOpacity style={styles.button}><Text style={{ textAlign: 'center' }}>Défi</Text></TouchableOpacity></View>
                            </View>
                        </View>) : null
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: "absolute",
        zIndex: 2000,
        top: 0,
        left: 0,
        backgroundColor: '#000000',
        opacity: 0.9,
        height: '100%',
        padding: 15

    },
    textOverlay: {
        color: 'white'
    },
    button: {
        backgroundColor: '#FF0000',
        padding: 15,
        justifyContent: 'center',
        alignContent: 'center',
    },
    poiImage: {
        borderWidth: 2,
        borderColor: 'red',
        maxWidth: '100%',
        height: undefined,
        aspectRatio: 300 / 76,
        resizeMode: 'cover',
        marginBottom: 20
    }
})