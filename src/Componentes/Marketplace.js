/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';

import {
  dW,
  dH,
}from '../Helpers/constantes'

export default class Marketplace extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      nextDiagnosis:'',
    };
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'MARKETPLACE'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#F5FCFF',
  },
  title:{
    color:'#000',
    fontSize:18,
  },
  viewImage:{
    width:dW,
    height:dH*0.08,
    marginTop:dH*0.3,
    marginBottom:dH*0.03,
  },
  logo:{
    width: '100%',
    height: '100%',
    resizeMode:'contain',
  },
});
