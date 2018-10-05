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
  ScrollView,
} from 'react-native';

import { 
  NavigationActions
 } from 'react-navigation';

import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-root-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import {connect} from 'react-redux'

import {
  paymentDataForPerform,
  makePayment
} from '../Store/actions'

import {
  dH,
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
} from '../Helpers/constantes'

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
  
  makePayment(){
    this.setModalVisible(true)

    const {amount,description} = this.state    
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
    this.props.paymentDataForPerform(this.props.globalAccessToken,this.props.IdUserLoggedin)
    .then((response)=>{
      console.log('state')
      if(response.type===GET_PAYMENT_DATA_FAIL){
        this.setState({
          amount:'',
          description:''
        })
        this.setModalVisible(false)
        Toast.show(TOAST_AUTH_ERROR, TOAST_CONFIG)
      } else if (response.type === GET_PAYMENT_DATA_SUCCESS){
        const data = response.payload.data
        const paymentObj={
          OwnerId:this.props.IdUserLoggedin,
          amount: amount,
          description: description,
          type: data.paymentTypes[0].id,
          subject: this.props.userTo.id,
        }
        return paymentObj
      }else{
        this.setModalVisible(false)
        Toast.show(TOAST_UNKNOWN_ERROR, TOAST_CONFIG)
      }
    })
    .then((paymentObj)=>{
      this.props.makePayment(this.props.globalAccessToken,paymentObj).then((response)=>{
        console.log('makePayment=>response',response)
        if(response.type===MAKE_PAYMENT_FAIL){
          this.setModalVisible(false)
          this.setState({
            amount:'',
            description:''
          })
          Toast.show(TOAST_MAKE_PAYMENT_ERROR, TOAST_CONFIG)
        }else if(response.type===MAKE_PAYMENT_SUCCESS){
          this.setModalVisible(false)
          this.setState({
            amount:'',
            description:''
          })
          Toast.show(TOAST_MAKE_PAYMENT_SUCCESS, TOAST_CONFIG)
          this.props.navigation.navigate('SelectUser')
        }

      })
      .catch((error)=>{
        console.log('MakePayment=>error:',error)
      })

    })
    .catch((error)=>{
      console.log('paymentDataForPerform=>error:',error)
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.modalVisible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />
        <ScrollView style={styles.contentContainer}>
          <View style={styles.regform}>
            <View style={styles.viewfield}>
              <Text style={styles.title}>Pagar a:</Text>
            </View>
            <View style={styles.viewUser}>
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
            <View style={styles.viewfield}>
              <Icon name="ios-pricetag" style={styles.icon}/>
              <View style={styles.registerfield}>
                <TextInput
                  style={styles.textinput}
                  placeholder={'Valor'}
                  secureTextEntry={false}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor='rgba(255,255,255,0.5)'
                  onChangeText={(value) => this.setState({ amount: value })}
                  value={this.state.amount}
                />
              </View>
            </View>
            <View style={styles.viewfield}>
              <Icon name="ios-list" style={styles.icon}/>
              <View style={[styles.registerfield,styles.registerfieldTA]}>
                <TextInput
                  style={styles.textarea}
                  placeholder={'Descripción'}
                  multiline={true}
                  numberOfLines={10}
                  secureTextEntry={false}
                  underlineColorAndroid={'transparent'}
                  placeholderTextColor='rgba(255,255,255,0.5)'
                  onChangeText={(value) => this.setState({ description: value })}
                  value={this.state.description}
                />
              </View>
            </View>
            <View style={styles.viewfield}>
              <TouchableOpacity style={styles.button}  onPress={() => this.makePayment()}>
                <Text style={styles.btnText}>Realizar Pago</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  paymentDataForPerform,
  makePayment
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePayment);
