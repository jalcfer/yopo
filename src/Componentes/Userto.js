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

import {connect} from 'react-redux'

import {
  dW,
  dH,
}from '../Helpers/constantes'
import { BGBLUE } from '../Helpers/colors';

class Userto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userTo:{},
      image:'',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    console.log('nextProps',nextProps)
    console.log('this.props',this.props)
    if(nextProps!=this.props){
      this.setState({
        userTo:nextProps.userTo,
        image: nextProps.userTo.image.url
      })
    }
  }
  componentDidMount(){
    console.log('componentDidMount')
    console.log(this.props)
  }
  componentDidUpdate(){
    console.log('this.state',this.state)
  }

  render() {
    return (
      <View style={styles.userContainer}>
        <View style={styles.userProfileImage}>
          <Image style={styles.image} source={{uri:this.state.image}}></Image>
        </View>
        <View style={styles.userData}>
          <Text style={styles.name}>{this.state.userTo.hasOwnProperty('display') ? this.state.userTo.display:''}</Text>
          <Text style={styles.username}>{this.state.userTo.hasOwnProperty('username') ? this.state.userTo.username:''}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userContainer: {
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal:dW*0.03
  },
  userProfileImage:{
    flex:0.3,
  },
  image:{
    flex:1,
    resizeMode:"contain",
    borderRadius:30,
    overflow:'hidden',
    alignItems:'center',
  },
  userData:{
    flex:1,
    paddingLeft:dW*0.03,
    height:'100%',
    justifyContent:'center',
  },
  name:{
    color:BGBLUE,
    fontSize:24,
    paddingBottom:dH*0.01,
  },
  username:{
    color:'rgba(0,0,0,0.5)',
    fontSize:18,
  },
});

const mapStateToProps = state => {
  let user = state.userTo.hasOwnProperty('id') ? state.userTo : '';
  return {
    userTo: user
  };
};

export default connect(mapStateToProps)(Userto);
