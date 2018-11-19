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
  NavigationActions
 } from 'react-navigation';
 
 import { 
  Avatar,
  FormLabel, 
  FormInput, 
  Button,
  Divider
} from 'react-native-elements'


import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-root-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import {connect} from 'react-redux'

import Userto from './Userto'

import {
  getUsers,
  getUser,
} from '../Store/actions'

import {
  TOAST_USER_NOTFOUND,
  TOAST_EMPTY_USERNAME,
  TOAST_UNKNOWN_ERROR,
  TOAST_CONFIG,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  GET_USER_FAIL,
  GET_USER_SUCCESS,
  dH,
  dW,
} from '../Helpers/constantes'

import {
  validate,
} from '../Helpers/functions'
import OpenSans from '../Helpers/fonts';
import { BGBLUE } from '../Helpers/colors';

class SelectUser extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      celular: null,
      cantidad: '',
      descripcion:'',
      user:{},
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillMount(){
    if (this.props.globalAccessToken==='') {
      /**
       * TODO: logout
       * TODO: clean state
       */
      this.props.navigation.navigate('Login')
    }
  } 
  
  componentDidMount() {
  }

  componentWillUnmount() {
  }  
  
  searchByUsername(accessToken){
    this.setModalVisible(true)

    const {celular} = this.state
    if(celular === ''){
      Toast.show(TOAST_EMPTY_USERNAME, TOAST_CONFIG);      
      this.setModalVisible(false)    
      return false
    }
    this.props.getUsers(accessToken).then((response)=>{
      if(response.type===GET_USERS_FAIL){
        this.setModalVisible(false)
        Toast.show(TOAST_USER_NOTFOUND, TOAST_CONFIG)
      } else if (response.type === GET_USERS_SUCCESS){
        this.setModalVisible(false)
        const users = response.payload.data
        const userToIndex = users.findIndex(user => user.shortDisplay === this.state.celular);
        const userTo = users[userToIndex]
        if(userTo){
          this.props.getUser(userTo.id,accessToken).then((response)=>{
            if(response.type===GET_USER_FAIL){
              this.setModalVisible(false)
              Toast.show(TOAST_USER_NOTFOUND, TOAST_CONFIG)
            } else if (response.type === GET_USER_SUCCESS){
              this.setModalVisible(false)
              console.log('getUser - response',response)
              this.setState({
                user:response.payload.data
              })
            }
          })
          .catch((error)=>{
            console.log('getUserError:',error)
          })  
        }else{
          Toast.show(TOAST_USER_NOTFOUND, TOAST_CONFIG);
          this.celular.clearText();
          this.setModalVisible(false)
        }
      }else{
        this.setModalVisible(false)
        Toast.show(TOAST_UNKNOWN_ERROR, TOAST_CONFIG)
      }
    })
    .catch((error)=>{
      console.log('getUsersError:',error)
    })
  };

  render() {
    return (
      <View style={[styles.container,styles.BgSelectUser]}>
        <Spinner visible={this.state.modalVisible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />
        <ScrollView style={styles.contentContainer}>
          <View style={[styles.regform,styles.selectForm]}>
            <Text style={[styles.title,OpenSans.Bold]}>PAGAR A:</Text>
            <Divider style={{ backgroundColor: BGBLUE,marginHorizontal:dW*0.02,marginVertical:dH*0.02 }} />
            <View style={styles.field}>
              <View style={styles.registerfield}>
                <FormLabel
                  containerStyle={styles.labelContainer}
                  labelStyle={styles.label}
                >
                  Celular
                </FormLabel>
                <View>
                  <FormInput
                    ref={celular => this.celular = celular}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input} 
                    placeholder='escribe un número de celular'
                    value={this.state.celular}
                    keyboardType='numeric'
                    onChangeText={celular => this.setState({ celular })}
                  />
                  <TouchableOpacity style={styles.buttonSearch}  onPress={() => this.searchByUsername(this.props.globalAccessToken)}>
                    <Icon name="ios-search" style={styles.iconSearch}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.regform,styles.viewUser]}>
            <Userto/>
          </View>
          <TouchableOpacity style={styles.button}  onPress={() => this.props.navigation.navigate('MakePayment')}>
            <Text style={styles.btnText}>PAGAR</Text>
          </TouchableOpacity>
        </ScrollView>
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
  getUsers,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectUser);
