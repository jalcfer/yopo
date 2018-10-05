/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

import {
  Dimensions,
} from 'react-native';

import Toast from 'react-native-root-toast'
import axios from 'axios'

/**
 * Alto(Height) y Ancho(Width) del dispositivo
 */
export const dW = Dimensions.get('window').width
export const dH = Dimensions.get('window').height

/**
 * API Cyclos 4.1:x
 */
export const DataForNewURL='https://communities.cyclos.org/elyopo/api/users/data-for-new?group=members'
export const CreateUserURL='https://communities.cyclos.org/elyopo/api/users/'


/**
 * Toast config
 * backgroundColor
 * shadowColor
 * textColor
 */

export const TOAST_CONFIG = {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  onShow: () => {
      // calls on toast\`s appear animation start
  },
  onShown: () => {
      // calls on toast\`s appear animation end.
  },
  onHide: () => {
      // calls on toast\`s hide animation start.
  },
  onHidden: () => {
      // calls on toast\`s hide animation end.
  }
}

/**
 * Messages
 */
export const TOAST_EMPTY_USERNAME='Debes escribir tu usuario'
export const TOAST_AUTH_ERROR='Usuario o Contraseña No Válido'
export const TOAST_PASSWORD_ERROR='Contraseña incorrecta'
export const TOAST_SHORT_PASSWORD='La Contraseña debe ser mayor a 6 caracteres'
export const TOAST_EMAIL_INUSE='Ya tienes una cuenta con ese email'
export const TOAST_EMAIL_NOTALLOWED='No se permite crear cuentas con email/password'
export const TOAST_PASSWORD_WEAK='El password es demasiado debil'
export const TOAST_UNKNOWN_ERROR='Error desconocido, intenta mas tarde'
export const TOAST_USER_DISABLED='El usuario se encuentra inactivo'
export const TOAST_USER_NOTFOUND='No hay un usuario con ese número de teléfono'
export const TOAST_EMPTY_DESC='Debes poner una descripción'
export const TOAST_EMPTY_AMOUNT='Debes poner la cantidad de yopos'
export const TOAST_MAKE_PAYMENT_ERROR='Error al realizar el pago'
export const TOAST_MAKE_PAYMENT_SUCCESS='El pago se realizó con éxito'


/**
 *  Client to Axios
 */

export const Client = axios.create({
  baseURL: 'https://communities.cyclos.org/elyopo/api',
  responseType: 'json'
});

/**
 * Reducer Types
 */

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

export const GET_PAYMENT_DATA = 'GET_PAYMENT_DATA'
export const GET_PAYMENT_DATA_SUCCESS = 'GET_PAYMENT_DATA_SUCCESS'
export const GET_PAYMENT_DATA_FAIL = 'GET_PAYMENT_DATA_FAIL'

export const MAKE_PAYMENT = 'MAKE_PAYMENT'
export const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS'
export const MAKE_PAYMENT_FAIL = 'MAKE_PAYMENT_FAIL'

export const RECEIVE_PAYMENT = 'RECEIVE_PAYMENT'
export const RECEIVE_PAYMENT_SUCCESS = 'RECEIVE_PAYMENT_SUCCESS'
export const RECEIVE_PAYMENT_FAIL = 'RECEIVE_PAYMENT_FAIL'

export const GET_USERS = 'GET_USERS'
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export const GET_USERS_FAIL = 'GET_USERS_FAIL'

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'



export const SELECT_USER = 'SELECT_USER'




