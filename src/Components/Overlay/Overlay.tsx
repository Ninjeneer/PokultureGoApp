import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import RestAPI from '../../RestAPI';
import AppButton from '../Global/AppButton';

export default class Overlay extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            poi: null
        };
    }

    componentDidMount() {
        RestAPI.getPOIByID(this.props.route.params.poiID).then((poi) => {
            this.setState({ poi });
            RestAPI.getChallengeByID(poi.challenge).then((challenge) => {
                this.setState({ challenge })
            });
        });
    }

    public close = () => {
        this.props.navigation.goBack();
    }

    public render() {
        return (
            <View style={styles.overlay}>
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
                        <AppButton onPress={() => this.props.navigation.navigate('Challenge', { challengeID: this.state.challenge ? this.state.challenge.id : null })} text="Défi" />
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        width: Dimensions.get('window').width,
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