
import {
  LOGIN,
  GET_USERS,
  GET_USER,
  SELECT_USER,
  MAKE_PAYMENT,
  GET_PAYMENT_DATA,
} from '../../Helpers/constantes'

export function login(user,password) {
  return {
    type: LOGIN,
    payload: {
      request: {
        method:'POST',
        url: '/auth/session',
        headers: {
          'Content-Type': 'application/json'
        },
        auth: {
          username: user,
          password: password
        }
      }      
    }
  }
}

export function getUsers(Token) {
  return {
    type: GET_USERS,
    payload: {
      request: {
        method:'GET',
        url: `/users/`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
      }      
    }
  }
}

export function getUser(Id,Token) {
  return {
    type: GET_USER,
    payload: {
      request: {
        method:'GET',
        url: `/users/${Id}`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
      }      
    }
  }
}

export function setSelectedUser(user) {
  return {
    type: SELECT_USER,
    payload: user
  }
}

export function paymentDataForPerform(Token,OwnerId) {
  return {
    type: GET_PAYMENT_DATA,
    payload: {
      request: {
        method:'GET',
        url: `/${OwnerId}/payments/data-for-perform`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
      }      
    }
  }
}

export function makePayment(Token,paymentObj) {
  return {
    type: MAKE_PAYMENT,
    payload: {
      request: {
        method:'POST',
        url: `/${paymentObj.OwnerId}/payments`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
        data:{
          amount: paymentObj.amount,
          description: paymentObj.description,
          type: paymentObj.type,
          subject: paymentObj.subject,
          fromName: paymentObj.fromName,
          toName: paymentObj.toName,
        }
      }      
    }
  }
}