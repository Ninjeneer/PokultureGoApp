import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import RestAPI from '../../RestAPI';
import * as ImagePicker from 'react-native-image-picker';
import AppButton from '../Global/AppButton';
import GetLocation from 'react-native-get-location'


export default class Challenge extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            challenge: null,
            validated: false,
            loading: false,
            messages: {
                UnrecognizedImage: "L'image n'a pas été reconnue",
                TooFarFromPOI: "Vous êtes trop loin du point d'intérêt"
            }
        }
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
        this.setState({ loading: true });
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 30000000
        }).then(location => {
            RestAPI.validatePhotoChallenge(this.state.challenge.id, { latitude: location.latitude, longitude: location.longitude }, this.state.image).then((response) => {
                this.setState({ loading: false });
                if (response.validated) {
                    Alert.alert('Défi validé !', `Félicitations, vous avez validé ce défi, vous remportez donc ${response.score} points.`, [{
                        text: "Retour à la carte",
                        onPress: () => this.props.navigation.replace("Map")
                    }]);
                } else {
                    let text = `Le défi n'a pas été validé pour ${response.reasons!.length > 0 ? 'les raisons suivantes' : 'la raison suivante'} :\n`
                    response.reasons!.forEach((r, i) => text += `${i + 1}) ${this.state.messages[r]}\n`);
                    Alert.alert('Défi invalidé !', text);
                }
            }).catch(e => {
                this.setState({ loading: false });
                console.error(e);
                Alert.alert('Erreur', 'Une erreur inattendue est survenue.');
            });
        }).catch((error) => {
            this.setState({ loading: false });
            console.log(error)
        });
    }

    public render() {
        return (
            <View style={{ height: '100%', padding: 15 }}>
                { this.state.challenge ?
                    (
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.title}>Défi {this.state.challenge.type.toUpperCase()} !</Text>
                                <Text style={styles.description}>Pour compléter ce défi, vous devez prendre une photo du point d'intérêt sur lequel vous vous trouver. Une fois cette photo validée, la somme de {this.state.challenge.score} points vous sera versée.</Text>
                                <Text style={styles.disclaimer}>ATTENTION : afin que la photo soit validée, veillez à ce qu'elle soit de qualité correcte et que l'on identifie clairement le point d'intérêt dessus.</Text>
                            </View>
                            <View>
                                <AppButton onPress={this.takePicture} text="Prendre une photo" disabled={this.state.loading} />
                                {
                                    this.state.image !== undefined && !this.state.validated &&
                                    (
                                        <AppButton style={{ marginTop: 10 }} onPress={this.validateChallenge} disabled={this.state.loading} text={this.state.loading ? 'Chargement...' : 'Valider le défi'} />
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
    }
})