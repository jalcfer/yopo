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
export const baseURL = 'https://communities.cyclos.org/elyopo/api/'


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
export const TOAST_EMPTY_USERNAME='Debes escribir tu número de celular'
export const TOAST_AUTH_ERROR='Número de celular o Contraseña No Válido'
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
export const TOAST_CREATE_USER_SUCCESS='El Usuario se creo con éxito, está pendiente de activación por parte, del administrador'
export const TOAST_CREATE_USER_FAIL='Hubo un error al crear el usuario, por favor verifíque los datos y vuelva a intentarlo'


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

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL'

export const UPLOAD_IMAGE_PROFILE='UPLOAD_IMAGE_PROFILE'
export const UPLOAD_IMAGE_PROFILE_SUCCESS='UPLOAD_IMAGE_PROFILE_SUCCESS'
export const UPLOAD_IMAGE_PROFILE_FAIL='UPLOAD_IMAGE_PROFILE_FAIL'

export const GET_CAPTCHA = 'GET_CAPTCHA'
export const GET_CAPTCHA_SUCCESS = 'GET_CAPTCHA_SUCCESS'
export const GET_CAPTCHA_FAIL = 'GET_CAPTCHA_FAIL'

export const GET_CAPTCHA_BYID = 'GET_CAPTCHA_BYID'
export const GET_CAPTCHA_BYID_SUCCESS = 'GET_CAPTCHA_BYID_SUCCESS'
export const GET_CAPTCHA_BYID_FAIL = 'GET_CAPTCHA_BYID_FAIL'

export const AUTH = 'AUTH'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'

export const GET_ACCOUNT_HISTORY = 'GET_ACCOUNT_HISTORY'
export const GET_ACCOUNT_HISTORY_SUCCESS = 'GET_ACCOUNT_HISTORY_SUCCESS'
export const GET_ACCOUNT_HISTORY_FAIL = 'GET_ACCOUNT_HISTORY_FAIL'

export const GET_ACCOUNT = 'GET_ACCOUNT'
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS'
export const GET_ACCOUNT_FAIL = 'GET_ACCOUNT_FAIL'

export const SET_DATA = 'SET_DATA'
export const SELECT_USER = 'SELECT_USER'
export const CLEAR_USERTO = 'CLEAR_USERTO'

export const UPDATE='UPDATE'
export const UPDATE_SUCCESS='UPDATE_SUCCESS'
export const UPDATE_FAIL='UPDATE_FAIL'



/**
 * tipoId Buttons
 */
export const IDTYPESBTN = ['Nit', 'C.C.', 'T.I.']
export const IDTYPES = ['Nit', 'Cédula de Ciudadania', 'Tarjeta de Identidad']

/**
 * Gender Buttons
 */
export const GENDERSBTN = ['Hombre', 'Mujer']
export const GENDERS = ['genderMale', 'genderFemale']

/**
 * ReCaptcha V3
 */
export const SITEKEY = '6LfcK3UUAAAAABy5-5fW5fOC-p95kNL1qFeRQadF'
export const URL = 'communities.cyclos.org'

/**
 * LAT && LNG DELTA for Goggle Maps
 */
export const LAT_DELTA = 0.0025
export const LNG_DELTA = 0.0025

/**
 * Constants Address
 */

 export const COUNTRY = 'Colombia'
 export const COUNTRYCODE = 'CO'
 export const DEPARTAMENTO = 'Casanare'

 /**
  * MASTER CREDENTIALS TO CREATE USERS
  */
export const M_USER = 'dmateus'
export const M_PASS = 'a1s1d1f1'
export const M_EMAIL = 'jalcfer@gmail.com'
/**
 * Email Default
 */

