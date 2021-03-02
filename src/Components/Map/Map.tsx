import React, { Component, createRef, RefObject } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import GetLocation from 'react-native-get-location'
import { WebView } from 'react-native-webview';
import html_script from './html_script';
import RestAPI from '../../RestAPI';
import IPOI from '../../models/POI';

export default class Map extends React.Component {
  private mapRef: RefObject<WebView>;

  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef<WebView>();
  }

  componentDidMount() {
    this.getPOIsAround();
  }

  render() {
    return (
      <>
        <WebView ref={this.mapRef} source={{ html: html_script }} style={styles.Webview} />
        <View style={styles.ButtonArea}>
          <TouchableOpacity style={styles.Button} onPress={() => this.getPOIsAround()}>
            <Text style={styles.ButtonText}>Ma position</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  public getPOIsAround = () => {
    setTimeout(() => {
      this.watchMovement()
    }, 2000);
  }

  private watchMovement() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000000
    }).then(location => {
      // Update map view according to position
      RestAPI.getPOINearLocation(location.latitude, location.longitude).then((poiTab: IPOI[]) => {
        this.mapRef.current!.injectJavaScript(`L.markerClusterGroup().clearLayers()`); // Clear every markers before rendering new ones
        for (let i = 0; i < poiTab.length; i++) {
          this.mapRef.current!.injectJavaScript(`markers.push(L.marker([${poiTab[i].location[1]}, ${poiTab[i].location[0]}])); markers[markers.length - 1].addTo(mymap)`);
          this.mapRef.current!.injectJavaScript(`markers[${i}].bindPopup("${poiTab[i].name}")`);
        }
        poiTab.forEach(poi => {
        });
        this.mapRef.current!.injectJavaScript(`mymap.setView([${location.latitude}, ${location.longitude}], 15)`)
        this.mapRef.current!.injectJavaScript(`var c = L.circle([${location.latitude}, ${location.longitude}], 20, {
          color: 'red',
          fillColor: 'red',
          fillOpacity: 0.5
      }); c.bindPopup("Vous êtes ici"); c.addTo(mymap); c.openPopup();`)
      })
    }).catch(function (error) {
      console.log(error)
    });
  }
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'grey'

  },
  Webview: {
    flex: 2,

  },
  ButtonArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  Button: {
    width: 100,
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  }
});