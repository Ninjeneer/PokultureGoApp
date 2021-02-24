import React, { Component } from 'react';
import {View,StyleSheet,StatusBar,Image,Dimensions, TouchableOpacity} from 'react-native';
import {Button,Container,Header,Left,Right,Icon,Text,Radio } from 'native-base';

import { WebView } from 'react-native-webview';
import html_script from './html_script';


class Map extends React.Component {




  render() {
    return (
    <Container>
        <WebView ref={'Map_Ref'} source={{html: html_script }} style={styles.Container}></WebView>
        <View>
          <TouchableOpacity style={styles.Button} >
            <Text style={styles.ButtonText}>TEST</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
    }
  }
export default Map

const styles = StyleSheet.create({
   Container: {
    flex:1,
    padding:10,
    backgroundColor: 'gray'
   },
   WebView: {
     flex:2
   },
   Button:{
     backgroundColor: 'black',
     alignItems: 'center',
     bottom:0
   },
   ButtonText:{
     color:'white',

   }
});