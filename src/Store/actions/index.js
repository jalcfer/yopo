
import {
  LOGIN,
  GET_USERS,
  GET_USER,
  SELECT_USER,
  MAKE_PAYMENT,
  GET_PAYMENT_DATA,
  SET_DATA,
  CREATE_USER,
  UPLOAD_IMAGE_PROFILE,
  GET_CAPTCHA,
  GET_CAPTCHA_BYID,
  AUTH,
  GET_ACCOUNT_HISTORY,
  GET_ACCOUNT,
  UPDATE,
  RECEIVE_PAYMENT,
  CLEAR_USERTO,
} from '../../Helpers/constantes'

export function setPersonalData(data) {
  return {
    type: SET_DATA,
    payload: data
  }
}

export function createUser(newUser) {
  return {
    type: CREATE_USER,
    payload: {
      request: {
        method:'POST',
        url: '/users/',
        headers: {
          'Content-Type': 'application/json'
        },
        data:newUser
      }      
    }
  }
}

export function uploadProfileImage(data) {
  return {
    type: UPLOAD_IMAGE_PROFILE,
    payload: {
      request: {
        method:'POST',
        url: '/images/temp',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data:data
      }      
    }
  }
}

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

export function getCaptcha() {
  return {
    type: GET_CAPTCHA,
    payload: {
      request: {
        method:'POST',
        url: '/captcha',
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          group:'members'
        }
      }      
    }
  }
}
export function getCaptchaById(id) {
  return {
    type: GET_CAPTCHA_BYID,
    payload: {
      request: {
        method:'GET',
        url: `/captcha/${id}`,
        headers: {
          'Content-Type': 'application/json'
        }
      }      
    }
  }
}
export function getSelf(Token) {
  return {
    type: AUTH,
    payload: {
      request: {
        method:'GET',
        url: `/auth/`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
      }      
    }
  }
}

export function getHistory(ownerId,accountType,Token) {
  return {
    type: GET_ACCOUNT_HISTORY,
    payload: {
      request: {
        method:'GET',
        url: `${ownerId}/accounts/${accountType}/history`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
      }      
    }
  }
}

export function getAccount(ownerId,accountType,Token) {
  return {
    type: GET_ACCOUNT,
    payload: {
      request: {
        method:'GET',
        url: `${ownerId}/accounts/${accountType}`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
      }      
    }
  }
}

export function updateProfile(ownerId,datatoUpdate,Token) {
  return {
    type: UPDATE,
    payload: {
      request: {
        method:'POST',
        url: `/users/${ownerId}/profile`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
        data:datatoUpdate
      }      
    }
  }
}

export function uploadImage(ownerId,data,Token) {
  return {
    type: UPLOAD_IMAGE_PROFILE,
    payload: {
      request: {
        method:'POST',
        url: `${ownerId}/images`,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Session-Token': Token
        },
        data:data
      }      
    }
  }
}

export function receivePayment(confirmationPassword,Payment,Token){
  return {
    type: RECEIVE_PAYMENT,
    payload: {
      request: {
        method:'POST',
        url: `/pos/`,
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': Token
        },
        data:{
          confirmationPassword:confirmationPassword,
          payment:Payment
        }
      }      
    }
  }
}

export function clearUserTo(){
  return {
    type:CLEAR_USERTO
  }
}