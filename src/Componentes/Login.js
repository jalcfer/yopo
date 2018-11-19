/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
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
  Button,
  FormInput, 
  FormValidationMessage,
} from 'react-native-elements'

import OpenSans from '../Helpers/fonts'
import logo from '../../assets/images/logo.png'
import futc from '../../assets/images/futc.png'
import uniremington from '../../assets/images/uniremington.png'

import { 
  NavigationActions
 } from 'react-navigation';

import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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
      celular:'',
      password:'',
      message:'',
      modalVisible:false,
    };
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

    const {celular,password} = this.state    
    if(celular === ''){
      Toast.show(TOAST_EMPTY_USERNAME, TOAST_CONFIG);      
      this.setModalVisible(false)    
      return false
    }
    if(password===''){
      Toast.show(TOAST_PASSWORD_ERROR, TOAST_CONFIG);      
      this.setModalVisible(false)    
      return false
    }
    this.props.login(celular,password).then((data)=>{
      console.log('state')
      if(data.type===LOGIN_FAIL){
        this.setState({
          celular:'',
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
        <View style={styles.logo}>
          <Image style={{flex:1,width:null,height:null,resizeMode:'contain'}} source={logo} />
        </View>
        <View style={styles.regform}>
          <View style={styles.viewfield}>
            <Icon name="cellphone" style={styles.icon}/>
            <FormInput 
              placeholder='Celular'
              value={this.state.celular}
              keyboardType='phone-pad'
              onChangeText={celular => this.setState({ celular })}
            />
            <FormValidationMessage>{this.state.cellEror}</FormValidationMessage>            
          </View>
          <View style={styles.viewfield}>
            <Icon name="key" style={styles.icon}/>
            <FormInput 
              placeholder={'Contraseña'}
              secureTextEntry={true}
              value={this.state.password}
              keyboardType='numeric'
              onChangeText={password => this.setState({ password })}
            />
            <FormValidationMessage>{this.state.cellEror}</FormValidationMessage>            
          </View>
          <Button
            large
            onPress={()=>this.signIn()}
            buttonStyle={styles.button}
            textStyle={[styles.btnText,OpenSans.Normal]}
            title='INICIAR SESIÓN' />            
        </View>
        <TouchableOpacity style={styles.anchor}  onPress={() => this.props.navigation.navigate('ConfigData')}>
          <Text style={styles.anchorText}>¿No tienes una cuenta?</Text>
          <Text style={styles.anchorText}>¡Crea una y empieza ahora mismo!</Text>
        </TouchableOpacity>
        <Text>Patrocinado por:</Text>
        <View style={{flexDirection:'row',height:dH*0.1,marginVertical:dH*0.025}}>
          <View style={{flex:1,height:'100%'}}>
            <Image style={{flex:1,width:null,height:null,resizeMode:'contain'}} source={futc} />
          </View>
          <View style={{flex:1}}>
            <Image style={{flex:1,width:null,height:null,resizeMode:'contain'}} source={uniremington} />
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
