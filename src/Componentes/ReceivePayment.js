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
  ScrollView,
} from 'react-native';

import { 
  Avatar,
  FormLabel, 
  FormInput, 
  Button,
  Divider
} from 'react-native-elements'

import { 
  NavigationActions
 } from 'react-navigation';

import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-root-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import {connect} from 'react-redux'

import {
  receivePayment,
  clearUserTo,
} from '../Store/actions'

import OpenSans from '../Helpers/fonts'

import {
  dH,dW,
  TOAST_UNKNOWN_ERROR,
  TOAST_EMPTY_AMOUNT,
  TOAST_CONFIG,
  TOAST_AUTH_ERROR,
  TOAST_EMPTY_DESC,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_FAIL,
  GET_PAYMENT_DATA_FAIL,
  GET_PAYMENT_DATA_SUCCESS,
  TOAST_MAKE_PAYMENT_ERROR,
  TOAST_MAKE_PAYMENT_SUCCESS,
  TOAST_PASSWORD_ERROR,
  RECEIVE_PAYMENT_FAIL,
  RECEIVE_PAYMENT_SUCCESS,
} from '../Helpers/constantes'

import {
  BGBLUE
} from '../Helpers/colors'

import {
  validate
} from '../Helpers/functions'

class MakePayment extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      amount: '',
      description:'',
      password:null,
    };
  }

  renderUser(){

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillMount(){
    if (this.props.globalAccessToken==='') {
      /**
       * TODO: logout
       */
    }
  } 
  
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  cancelPayment(){
    if(this.props.clearUserTo()){
      this.amount.clearText()
      this.description.clearText()
      this.password.clearText()  
      this.props.navigation.navigate('SelectUserFromReceive')
    }
  }
  
  receivePayment(){
    this.setModalVisible(true)

    const {globalAccessToken,userLoggedin} = this.props
    const {password,amount,description} = this.state    
    if(amount===''){
      Toast.show(TOAST_EMPTY_AMOUNT, TOAST_CONFIG);      
      this.setModalVisible(false)    
      return false
    }
    if(description===''){
      Toast.show(TOAST_EMPTY_DESC, TOAST_CONFIG);      
      this.setModalVisible(false)    
      return false
    }
    if(password===''){
      Toast.show(TOAST_PASSWORD_ERROR, TOAST_CONFIG);      
      this.setModalVisible(false)    
      return false
    }
    const paymentObj={
      amount: amount,
      description: description,
      currency: userLoggedin.permissions.banking.accounts[0].account.currency.id,
      subject: this.props.userTo.id
    }
    
    this.props.receivePayment(password,paymentObj,globalAccessToken)
    .then((response)=>{
      console.log('state')
      switch (response.type) {
        case RECEIVE_PAYMENT_FAIL:
          this.setModalVisible(false)
          Toast.show(TOAST_MAKE_PAYMENT_ERROR, TOAST_CONFIG)
          this.cancelPayment()
          break;
        case RECEIVE_PAYMENT_SUCCESS:
          this.setModalVisible(false)
          Toast.show(TOAST_MAKE_PAYMENT_SUCCESS, TOAST_CONFIG)          
          break;
        default:
          break;
      }
    })
    .catch((error)=>{
      console.log('paymentDataForPerform=>error:',error)
    })
  };

  render() {
    return (
      <View style={[styles.container,styles.BgSelectUser]}>
        <Spinner visible={this.state.modalVisible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />
        <ScrollView style={styles.contentContainer}>
          <View style={[styles.regform,styles.formMakePayment]}>
            <Text style={[styles.title,OpenSans.Bold]}>RECIBIR PAGO DE:</Text>
            <Divider style={{ backgroundColor: BGBLUE,marginHorizontal:dW*0.02,marginVertical:dH*0.02 }} />
            <View style={styles.userContainer}>
              <View style={styles.userProfileImage}>
                <Image style={styles.image} source={{uri:this.props.userTo.image.url}}></Image>
              </View>
              <View style={styles.userData}>
                <Text style={styles.name}>{this.props.userTo.display}</Text>
                <Text style={styles.username}>{this.props.userTo.username}</Text>
              </View>
            </View>
          </View>

          <View style={styles.field}>
            <FormLabel
              containerStyle={styles.labelContainer}
              labelStyle={[styles.label,{color:'#FFF'}]}
            >
              MONTO
            </FormLabel>
            <FormInput
              ref={amount => this.amount = amount}
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input,{color:'#FFF'}]} 
              placeholder='escribe el valor que vas a transferir'
              placeholderTextColor='rgba(255,255,255,0.5)'
              value={this.state.amount}
              keyboardType='numeric'
              onChangeText={amount => this.setState({ amount })}
            />
          </View>
          <View style={styles.field}>
            <FormLabel
              containerStyle={styles.labelContainer}
              labelStyle={[styles.label,{color:'#FFF'}]}
            >
              DESCRIPCIÓN
            </FormLabel>
            <FormInput
              ref={description => this.description = description}
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input,{color:'#FFF'}]} 
              placeholder='Descripción'
              placeholderTextColor='rgba(255,255,255,0.5)'
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
            />
          </View>
          <View style={styles.field}>
            <FormLabel
              containerStyle={styles.labelContainer}
              labelStyle={[styles.label,{color:'#FFF'}]}
            >
              CLAVE
            </FormLabel>
            <FormInput
              ref={password => this.password = password}
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input,{color:'#FFF'}]} 
              placeholder={'confirme la transacción'}
              placeholderTextColor='rgba(255,255,255,0.5)'
              secureTextEntry={true}
              value={this.state.password}
              keyboardType='numeric'
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <TouchableOpacity style={[styles.button,OpenSans.Bold,{marginBottom:3}]}  onPress={() => this.receivePayment()}>
            <Text style={[styles.btnText,OpenSans.Bold]}>RECIBIR PAGO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button,styles.cancelar]}  onPress={() => this.cancelPayment()}>
            <Text style={[styles.btnText,OpenSans.Bold]}>CANCELAR</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  const accessToken = state.userLoggedin.hasOwnProperty('sessionToken') ? state.userLoggedin.sessionToken : '';
  const userTo = state.userTo
  const id = state.userLoggedin.user.id
  const userLoggedin = state.userLoggedin
  return {
    globalAccessToken: accessToken,
    userTo:userTo,
    IdUserLoggedin: id,
    userLoggedin: userLoggedin,
  };
};

const mapDispatchToProps = {
  receivePayment,
  clearUserTo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePayment);
