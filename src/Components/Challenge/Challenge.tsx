import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationRoute } from 'react-navigation';
import RestAPI from '../../RestAPI';
import * as ImagePicker from 'react-native-image-picker';

export default class Challenge extends React.Component<{ route: NavigationRoute }, any> {
    constructor(props) {
        super(props);
        this.state = {
            challenge: null
        }
        console.log(this.props.route.params)
    }

    componentDidMount() {
        RestAPI.getChallengeByID(this.props.route.params!.challengeID).then((challenge) => this.setState({ challenge }));
    }

    public takePicture = () => {
        ImagePicker.launchCamera({
            mediaType: 'photo',
            saveToPhotos: false,
            maxWidth: 1920,
            maxHeight: 1080,
            includeBase64: true
        }, (response) => {
            if (!response.didCancel && !response.errorCode && !response.errorMessage) {
                this.setState({ image: response.base64 })
            }
        });
    }

    public validateChallenge = () => {
        RestAPI.validatePhotoChallenge(this.state.challenge.id, { latitude: 0, longitude: 0 }, this.state.image).then((response) => {
            if (response.validated) {
                Alert.alert('Défi validé !', `Félicitations, vous avez validé ce défi, vous remportez donc ${response.score} points.`);
            } else {
                Alert.alert('Défi invalidé !', `Une des conditions suivantes ne respecte pas le défi : 1) le POI n'est pas identifiable 2) vous n'êtes pas à proximité.`);
            }
        }).catch(e => console.log(JSON.stringify(e)))
    }

    public render() {
        return (
            <View style={{ height: '100%', padding: 15 }}>
                { this.state.challenge ?
                    (
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.title}>Défi {this.state.challenge.type.toUpperCase()} !</Text>
                                <Text style={styles.description}>Pour compléter ce défi, vous devez prendre une photo du point d'intérêt sur lequel vous vous trouver. Une fois cette photo validée, la somme de {this.state.challenge.score} vous sera versée.</Text>
                                <Text style={styles.disclaimer}>ATTENTION : afin que la photo soit validée, veillez à ce qu'elle soit de qualité correcte et que l'on identifie clairement le point d'intérêt dessus.</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.button} onPress={this.takePicture}>
                                    <Text style={{ textAlign: 'center' }}>Prendre une photo</Text>
                                </TouchableOpacity>
                                {
                                    this.state.image !== undefined &&
                                    (
                                        <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={this.validateChallenge}>
                                            <Text style={{ textAlign: 'center' }}>Valider le défi</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                    ) :
                    (
                        <Text>Impossible de charger le challenge</Text>
                    )
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    description: {
        fontSize: 18,
        lineHeight: 30,
        textAlign: 'justify'
    },
    disclaimer: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'justify',
        fontStyle: 'italic'
    },
    button: {
        backgroundColor: '#FF0000',
        padding: 15,
        justifyContent: 'center',
        alignContent: 'center',
    }
})