import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RestAPI from '../../RestAPI';
import AppButton from '../Global/AppButton';

export default class Test extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            poi: null
        };
    }

    componentDidMount() {
        RestAPI.getPOIByID("6032b2df21a8a03ac2be43bb").then((poi) => {
            this.setState({ poi });
            console.log(poi);
            RestAPI.getChallengeByID(poi.challenge).then((challenge) => {
                this.setState({ challenge })
                console.log(challenge);
            });
        });
    }

    public close = () => {
        console.log("close")
        this.setState({ visible: false });
    }

    public render() {
        return (
            <View style={{ height: '100%' }}>
                <Text>hello</Text>
                {
                    this.state.visible ?
                        (<View style={styles.overlay}>
                            <ScrollView>
                                <Image source={{ uri: this.state.poi ? (this.state.poi.images ? this.state.poi.images[0] : 'file://./../../assets/img-placeholder.png') : 'file://./../../assets/img-placeholder.png' }} style={styles.poiImage}></Image>
                                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>{this.state.poi ? this.state.poi.name : 'POI Name'}</Text>
                                <Text style={styles.textOverlay}>{this.state.poi ? this.state.poi.description : ''}</Text>
                            </ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ flex: 1, padding: 5 }}>
                                    <AppButton onPress={this.close} text="Fermer" />
                                </View>
                                <View style={{ flex: 1, padding: 5 }}>
                                    <AppButton onPress={() => this.props.navigation.navigate('Challenge', { challengeID: this.state.challenge ? this.state.challenge._id : null })} text="Défi" />
                                </View>
                            </View>
                        </View>) : (<Button title="ma bite" onPress={() => this.setState({ visible: true })}></Button>)
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
        borderWidth: 1,
        borderColor: 'red',
        maxWidth: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'cover',
        marginBottom: 20
    }
})