/**
 * NAPPS - Neuronapps
 * https://github.com/baure/napps
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { 
  NavigationActions
 } from 'react-navigation';

import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-root-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import {connect} from 'react-redux'

import {login} from '../Store/actions'

import {
  dH,
  TOAST_INVALID_EMAIL,
  TOAST_USER_DISABLED,
  TOAST_EMPTY_USERNAME,
  TOAST_UNKNOWN_ERROR,
  TOAST_PASSWORD_ERROR,
  TOAST_CONFIG,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  TOAST_AUTH_ERROR,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_FAIL,
  RECEIVE_PAYMENT_SUCCESS,
  RECEIVE_PAYMENT_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
} from '../Helpers/constantes'

import {
  validate
} from '../Helpers/functions'

class Login extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      name: '',
      usuario:'',
      password:'',
      message:'',
      modalVisible:false,
    };
  }

  signOutUser() {
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  componentWillMount(){
    if (this.props.globalAccessToken!=='') {
      this.props.navigation.navigate('Main')
    }
  } 
  
  componentDidMount() {
    console.log('****************************this.props**************************')
    console.log(this.props)
  }

  componentWillUnmount() {
  }  
  
  signIn(){
    this.setModalVisible(true)

    const {usuario,password} = this.state    
    if(usuario === ''){
      Toast.show(TOAST_EMPTY_USERNAME, TOAST_CONFIG);      
      this.setModalVisible(false)    
      return false
    }
    if(password===''){
      Toast.show(TOAST_PASSWORD_ERROR, TOAST_CONFIG);      
      this.setModalVisible(false)    
      return false
    }
    this.props.login(usuario,password).then((data)=>{
      console.log('state')
      if(data.type===LOGIN_FAIL){
        this.setState({
          usuario:'',
          password:''
        })
        this.setModalVisible(false)
        Toast.show(TOAST_AUTH_ERROR, TOAST_CONFIG)
      } else if (data.type === LOGIN_SUCCESS){
        this.setModalVisible(false)
        this.props.navigation.navigate('Main')
      }else{
        this.setModalVisible(false)
        Toast.show(TOAST_UNKNOWN_ERROR, TOAST_CONFIG)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.modalVisible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />
        <View style={styles.regform}>
          <View style={[styles.viewfield,styles.noPadding]}>
            <View style={styles.viewImage}>
              <Image style={styles.logo} source={require('../../assets/login/yopo.png')}/>
            </View>
          </View>
          <View style={styles.viewfield}>
            <Icon name="ios-call" style={styles.icon}/>
            <View style={styles.registerfield}>
              <TextInput
                style={styles.textinput}
                placeholder={'Celular'}
                secureTextEntry={false}
                underlineColorAndroid={'transparent'}
                placeholderTextColor='rgba(255,255,255,0.3)'
                onChangeText={(value) => this.setState({ usuario: value })}
                value={this.state.usuario}
              />
            </View>
          </View>
          <View style={styles.viewfield}>
            <Icon name="md-key" style={styles.icon}/>
            <View style={styles.registerfield}>
              <TextInput
                style={styles.textinput}
                placeholder={'Contraseña'}
                secureTextEntry={true}
                underlineColorAndroid={'transparent'}
                placeholderTextColor='rgba(255,255,255,0.3)'
                onChangeText={(value) => this.setState({ password: value })}
                value={this.state.password}
              />
            </View>
          </View>
          <View style={styles.viewfield}>
            <TouchableOpacity style={styles.button}  onPress={() => this.signIn()}>
              <Text style={styles.btnText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => {
  let accessToken = state.userLoggedin.hasOwnProperty('sessionToken') ? state.userLoggedin.sessionToken : '';
  return {
    globalAccessToken: accessToken
  };
};

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
