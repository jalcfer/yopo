/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

//import { combineReducers } from 'redux'
//import login from './reducer/login'

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  MAKE_PAYMENT,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_FAIL,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_PAYMENT_DATA,
  GET_PAYMENT_DATA_SUCCESS,
  GET_PAYMENT_DATA_FAIL,
 } from '../Helpers/constantes'

/*
export const AppReducer = combineReducers({
  login,
})
*/

const initialState = { userLoggedin: {}, paymentData: {}, payment: {}, userTo: {}, globalAccessToken:''};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log('LOGIN:',action.payload)
      return { ...state, };
    case LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS:',action.payload)
      return { ...state, userLoggedin: action.payload.data };
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL:',state)
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
    default:
      console.log('default:state',state)
      return state;
  }
}