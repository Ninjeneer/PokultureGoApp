import React, { Component, createRef, RefObject } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'native-base';
import GetLocation from 'react-native-get-location'
import { WebView } from 'react-native-webview';
import html_script from './html_script';
import RestAPI from '../../RestAPI';
import IPOI from '../../models/POI';
import { ScrollView } from 'react-native-gesture-handler';
import AppButton from '../Global/AppButton';

export default class Map extends React.Component<any, { poisAround: IPOI[] }> {
  private mapRef: RefObject<WebView>;

  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef<WebView>();
    this.state = { poisAround: [] }
  }

  componentDidMount() {
    this.watchMovement();
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView ref={this.mapRef} source={{ html: html_script }} style={{ flex: 1 }} androidHardwareAccelerationDisabled={true} />
        <ScrollView style={{ flex: 1 }}scrollEnabled={true}>
          {
            this.state.poisAround.filter(poi => poi.distance < 200).length === 0 ? (
              <Text style={{ textAlign: 'center' }}>Aucun point d'intérêt n'est assez proche pour lancer un défi.</Text>
            ) : (
              this.state.poisAround.map((poi, key) => {
                if (poi.distance < 200) {
                  return (<AppButton 
                    key={key} text={poi.name} 
                    onPress={() => this.props.navigation.navigate('Overlay', { poiID: poi.id })}
                    style={{ width: Dimensions.get('screen').width }}></AppButton>)
                }
              })
            )
          }
        </ScrollView>
      </View>
    );
  }

  private watchMovement() {
    if (!this.mapRef.current) {
      return;
    }
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000000
    }).then(location => {
      // Update map view according to position
      RestAPI.getPOINearLocation(location.latitude, location.longitude).then((poiTab: IPOI[]) => {
        this.setState({ poisAround: poiTab });
        this.mapRef.current!.injectJavaScript(`markers.forEach(m => m.remove()); if (c) { c.remove(); }`); // Clear every markers before rendering new ones
        for (let i = 0; i < poiTab.length; i++) {
          this.mapRef.current!.injectJavaScript(`markers.push(L.marker([${poiTab[i].location[1]}, ${poiTab[i].location[0]}])); markers[markers.length - 1].addTo(mymap)`);
          this.mapRef.current!.injectJavaScript(`markers[${i}].bindPopup("${poiTab[i].name}")`);
        }

        this.mapRef.current!.injectJavaScript(`mymap.setView([${location.latitude}, ${location.longitude}], 15)`);
        this.mapRef.current!.injectJavaScript(`var c = L.circle([${location.latitude}, ${location.longitude}], 20, {
          color: 'red',
          fillColor: 'red',
          fillOpacity: 0.5
      }); c.bindPopup("Vous êtes ici"); c.addTo(mymap);`);
      setTimeout(() => {
        this.watchMovement();
      }, 2000);
      })
    }).catch(function (error) {
      console.log(error)
    });
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  ButtonArea: {
    flex: 1,
    flexDirection: 'row'
  }
});