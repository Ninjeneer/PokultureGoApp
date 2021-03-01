import React, { Component, createRef, RefObject } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text } from 'native-base';
import GetLocation from 'react-native-get-location'
import { WebView } from 'react-native-webview';
import html_script from './html_script';

export default class Map extends React.Component {
  private mapRef: RefObject<WebView>;

  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef<WebView>();
  }

  render() {
    return (
      <>
        <WebView ref={this.mapRef} source={{ html: html_script }} style={styles.Webview} />
        <View style={styles.ButtonArea}>
          <TouchableOpacity style={styles.Button} onPress={() => this.getMyPosition()}>
            <Text style={styles.ButtonText}>Ma position</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  public getMyPosition = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 200000,
    }).then(location => {
      console.warn(location.latitude);
      console.warn(location.longitude);
      this.mapRef.current!.injectJavaScript('L.marker([${location.latitude}, ${location.longitude}]).addTo(mymap)')
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