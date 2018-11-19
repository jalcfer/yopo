/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

//import { combineReducers } from 'redux'
//import login from './reducer/login'

import {
  LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, MAKE_PAYMENT, MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_FAIL, GET_USERS, GET_USERS_SUCCESS, GET_USERS_FAIL,
  GET_USER, GET_USER_SUCCESS, GET_USER_FAIL, GET_PAYMENT_DATA,
  GET_PAYMENT_DATA_SUCCESS, GET_PAYMENT_DATA_FAIL, SET_DATA, CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  UPLOAD_IMAGE_PROFILE,
  UPLOAD_IMAGE_PROFILE_SUCCESS,
  UPLOAD_IMAGE_PROFILE_FAIL,
  M_EMAIL,
  GET_CAPTCHA,
  GET_CAPTCHA_SUCCESS,
  GET_CAPTCHA_FAIL,
  GET_CAPTCHA_BYID,
  GET_CAPTCHA_BYID_SUCCESS,
  GET_CAPTCHA_BYID_FAIL,
  AUTH,
  AUTH_SUCCESS,
  AUTH_FAIL,
  GET_ACCOUNT_HISTORY,
  GET_ACCOUNT_HISTORY_SUCCESS,
  GET_ACCOUNT_HISTORY_FAIL,
  GET_ACCOUNT,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  RECEIVE_PAYMENT,
  RECEIVE_PAYMENT_SUCCESS,
  RECEIVE_PAYMENT_FAIL,
  CLEAR_USERTO,
 } from '../Helpers/constantes'

 import {
  getCaptchaId
 } from '../Helpers/functions'

/*
export const AppReducer = combineReducers({
  login,
})
*/

const initialState = { 
  userLoggedin: {}, 
  paymentData: {}, 
  payment: {}, 
  userTo: {},
  captchaById:'', 
  accountHistory:'',
  receivePayment:{},
  account:'',
  newUser:{
    name:'',
    username: '',
    email: M_EMAIL,
    customValues: {
        gender:'', //genderFemale/genderMale
        tipoId:'',
        identification:''
      },
    group: "members",
    addresses: [
      {
        name: 'address1',
        addressLine1: '',
        neighborhood:'',
        city: '',
        region: 'Casanare',
        country: 'CO', //CO
        defaultAddress: true,
        hidden: true,
        location: {
          latitude: 0,
          longitude: 0
        },        
      }
    ],
    mobilePhones: [
      {
        name: 'celular',
        number: "",
        hidden: false,
        enabledForSms: true,
        verified: true,
        kind: "mobile"
      }
    ],
    passwords: [
      {
        type: 'login',
        value: '',
        checkConfirmation: 'false',
        forceChange: false
      }
    ],
    captcha: {
      challenge: '',
      response: ''
    },
    images: [],
    acceptAgreement: true,
    skipActivationEmail: true,
    asMember: true
  },
  globalAccessToken:''
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_USERTO:
      return {...state,userTo:{}}
    case SET_DATA:
      console.log('SET_DATA:',action.payload)
      //let newUser
      state.newUser.name = action.payload.name,
      state.newUser.username = action.payload.celular,
      state.newUser.email = action.payload.email,
      state.newUser.customValues.gender = action.payload.gender
      state.newUser.customValues.tipoId = action.payload.tipoId
      state.newUser.customValues.identification = action.payload.identification
      state.newUser.mobilePhones[0].number = action.payload.celular
      state.newUser.passwords[0].value = action.payload.password
      state.newUser.captcha.response = action.payload.captchaResponse
      return { 
        ...state
      };
    case LOGIN:
      console.log('LOGIN:',action.payload)
      return { ...state, };
    case LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS:',action.payload)
      return { ...state, userLoggedin: action.payload.data };
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL:',state)
      return { ...state, error: 'Error getting repos info' };
    case AUTH:
      console.log('AUTH:',action.payload)
      return { ...state, };
    case AUTH_SUCCESS:
      console.log('AUTH_SUCCESS:',action.payload)
      return { ...state, userLoggedin: action.payload.data };
    case AUTH_FAIL:
      console.log('AUTH_FAIL:',state)
      return { ...state, error: 'Error getting repos info' };
    case MAKE_PAYMENT:
      console.log('MAKE_PAYMENT:',action.payload)
      return { ...state, loadingInfo: true };
    case MAKE_PAYMENT_SUCCESS:
      console.log('MAKE_PAYMENT_SUCCESS:',action.payload)
      return { ...state, loadingInfo: false, payment: action.payload.data };
    case MAKE_PAYMENT_FAIL:
      console.log('MAKE_PAYMENT_FAIL:',action.payload);
      return {
        ...state,
        loadingInfo: false,
        errorInfo: 'Error getting repo info'
      };
    case GET_PAYMENT_DATA:
      console.log('GET_PAYMENT_DATA:',action.payload)
      return { ...state, loadingInfo: true };
    case GET_PAYMENT_DATA_SUCCESS:
      console.log('GET_PAYMENT_DATA_SUCCESS:',action.payload)
      return { ...state, loadingInfo: false, paymentData: action.payload.data };
    case GET_PAYMENT_DATA_FAIL:
      console.log('GET_PAYMENT_DATA_FAIL:',action.payload);
      return {
        ...state,
        loadingInfo: false,
        errorInfo: 'Error getting repo info'
      };
    case GET_USERS:
      console.log('GET_USERS:',action.payload)
      return { ...state, loadingProfile: true };
    case GET_USERS_SUCCESS:
      console.log('GET_USERS_SUCCESS:',action.payload)
      return { ...state, loadingProfile: false, users: action.payload.data };
    case GET_USERS_FAIL:
      console.log('GET_USERS_FAIL:',action.payload)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting user info'
      };
    case GET_USER:
      console.log('GET_USER:',action.payload)
      return { ...state, loadingProfile: true };
    case GET_USER_SUCCESS:
      console.log('GET_USER_SUCCESS:',action.payload)
      return { ...state, loadingProfile: false, userTo: action.payload.data };
    case GET_USER_FAIL:
      console.log('GET_USER_FAIL:',action.payload)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting user info'
      };
    case UPLOAD_IMAGE_PROFILE:
      console.log('UPLOAD_IMAGE_PROFILE:',action.payload)
      return { ...state, loadingProfile: true };
    case UPLOAD_IMAGE_PROFILE_SUCCESS:
      console.log('UPLOAD_IMAGE_PROFILE_SUCCESS:',action.payload)
      state.newUser.images.push(action.payload.data)
      return { 
        ...state
      };
    case UPLOAD_IMAGE_PROFILE_FAIL:
      console.log('UPLOAD_IMAGE_PROFILE_FAIL:',action.payload)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting user info'
      };
    case CREATE_USER:
      console.log('CREATE_USER:',action.payload)
      return { ...state, loadingProfile: true };
    case CREATE_USER_SUCCESS:
      console.log('CREATE_USER_SUCCESS:',action.payload)
      return { ...state, newUser: action.payload.data };
    case CREATE_USER_FAIL:
      console.log('CREATE_USER_FAIL:',action)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error creating user'
      };
    case GET_CAPTCHA:
      console.log('GET_CAPTCHA:',action.payload)
      return { ...state, loadingProfile: true };
    case GET_CAPTCHA_SUCCESS:
      console.log('GET_CAPTCHA_SUCCESS:',action.payload)
      state.newUser.captcha.challenge = getCaptchaId(action.payload.headers.location)
      return { ...state };
    case GET_CAPTCHA_FAIL:
      console.log('GET_CAPTCHA_FAIL:',action)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting captcha'
      };
    case GET_CAPTCHA_BYID:
      console.log('GET_CAPTCHA_BYID:',action.payload)
      return { ...state, loadingProfile: true };
    case GET_CAPTCHA_BYID_SUCCESS:
      console.log('GET_CAPTCHA_BYID_SUCCESS:',action.payload)
      return { ...state,captchaById:action.payload.data };
    case GET_CAPTCHA_BYID_FAIL:
      console.log('GET_CAPTCHA_BYID_FAIL:',action)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting captcha by id'
      };
    case GET_ACCOUNT_HISTORY:
      console.log('GET_ACCOUNT_HISTORY:',action.payload)
      return { ...state, loadingProfile: true };
    case GET_ACCOUNT_HISTORY_SUCCESS:
      console.log('GET_ACCOUNT_HISTORY_SUCCESS:',action.payload)
      return { ...state,accountHistory:action.payload.data };
    case GET_ACCOUNT_HISTORY_FAIL:
      console.log('GET_ACCOUNT_HISTORY_FAIL:',action)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting account history'
      };
    case GET_ACCOUNT:
      console.log('GET_ACCOUNT:',action.payload)
      return { ...state, loadingProfile: true };
    case GET_ACCOUNT_SUCCESS:
      console.log('GET_ACCOUNT_SUCCESS:',action.payload)
      return { ...state,account:action.payload.data };
    case GET_ACCOUNT_FAIL:
      console.log('GET_ACCOUNT_FAIL:',action)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting account history'
      };
    case UPDATE:
      console.log('UPDATE:',action.payload)
      return { ...state, loadingProfile: true };
    case UPDATE_SUCCESS:
      console.log('UPDATE_SUCCESS:',action.payload)
      return { ...state };
    case UPDATE_FAIL:
      console.log('UPDATE_FAIL:',action)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting account history'
      };
    case RECEIVE_PAYMENT:
      console.log('RECEIVE_PAYMENT:',action.payload)
      return { ...state, loadingProfile: true };
    case RECEIVE_PAYMENT_SUCCESS:
      console.log('UPDATE_SUCCESS:',action.payload)
      return { ...state, };
    case RECEIVE_PAYMENT_FAIL:
      console.log('UPDATE_FAIL:',action)
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting account history'
      };
    default:
      console.log('default:state',state)
      return state;
  }
}