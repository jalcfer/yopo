/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */
import {
  DataForNewURL,
}from '../Helpers/constantes'

import {default_config as config}  from '../config/config'

let globalSessionToken = ''

export const setSessionToken = (newToken) => {
  globalSessionToken = newToken
}

export const deleteSessionToken = () => globalSessionToken = ''

export const setCyclosUrl = () => {
  config.CYCLOS.url = 'https://'+config.CYCLOS.host	+'/'+config.CYCLOS.network +'/api/'
}

const httpCommonHeaders = () => {
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  return headers
}

const httpHeaders = (requiresAuthorisation) => {
  const headers = httpCommonHeaders()
  if (globalSessionToken && requiresAuthorisation) {
    headers.append('Session-Token', globalSessionToken)
  }
  return headers
}

const basicAuthHeaders = (username, password) => {
  const headers = httpCommonHeaders()
  headers.append('Authorization', 'Basic ' + encode(username + ':' + password))
  return headers
}

const processResponse = (dispatch, expectedResponse = 200) => (response) => {
  console.log('response',response)
  throwErrorOnUnexpectedResponse(response, expectedResponse)
  return response.json()
}

export const post = (url, params, dispatch, expectedResponse = 201) =>
  fetch(BASE_URL + url, merge({ headers: httpHeaders(params.requiresAuthorisation) },
		{ method: 'POST', body: JSON.stringify(params) }))
    .then(processResponse(dispatch, expectedResponse))

export const authenticate = (username, password, dispatch) =>
  fetch(BASE_URL + 'auth/session', {
    headers: basicAuthHeaders(username, password),
    method: 'POST'
  })
  .then(processResponse(dispatch))
  .then((results) => {
    globalSessionToken = results.sessionToken
    console.log('BASE_URL',BASE_URL)
    console.log('authenticate_URL',BASE_URL+'auth/session')
    return results.sessionToken
  })

export const checkPassword = (username, password) => {
  return fetch(BASE_URL + 'self/passwords?fields=type.name&fields=status', {
    headers: basicAuthHeaders(username, password)
  })
  // 403 with '{"code":"inaccessibleChannel"}' is returned upon correct PIN
  // 401 with '{"code":"login"}' is returened on incorrect username/PIN combination
  // 401 with '{"code":"login","passwordStatus":"temporarilyBlocked"}' is returned when PIN blocked, be it correct or incorrect
  .then((response) => {
    throwErrorOnUnexpectedResponse(response, 200)
    return response.json()
    .then(json => {
      return true
    })
  })
}



/*
{
    "emailRequired": true,
    "profileFieldActions": {
      "fiscal_number": {
        "edit": true,
        "managePrivacy": true
      },
      "image": {
        "edit": true,
        "managePrivacy": false
      },
      "website": {
        "edit": true,
        "managePrivacy": false
      },
      "address": {
        "edit": true,
        "managePrivacy": true
      },
      "gender": {
        "edit": true,
        "managePrivacy": true
      },
      "phone": {
        "edit": true,
        "managePrivacy": true
      },
      "business_type": {
        "edit": true,
        "managePrivacy": false
      },
      "name": {
        "edit": true,
        "managePrivacy": false
      },
      "email": {
        "edit": true,
        "managePrivacy": true
      },
      "username": {
        "edit": true,
        "managePrivacy": false
      }
    },
    "customFields": [
      {
        "id": "7762070814178012479",
        "name": "Website",
        "internalName": "website",
        "type": "url",
        "control": "text",
        "kind": "user",
        "size": "large",
        "required": false,
        "hasValuesList": false
      },
      {
        "id": "7762070814178012735",
        "name": "Gender",
        "internalName": "gender",
        "type": "singleSelection",
        "control": "radio",
        "kind": "user",
        "informationText": "Information text about gender",
        "required": false,
        "possibleValueCategories": [],
        "hasValuesList": true,
        "possibleValues": [
          {
            "id": "7762070814178012735",
            "value": "Female"
          },
          {
            "id": "7762070814178012479",
            "value": "Male"
          }
        ]
      },
      {
        "id": "7762070814178012991",
        "name": "Fiscal number",
        "internalName": "fiscal_number",
        "type": "string",
        "control": "text",
        "kind": "user",
        "size": "large",
        "pattern": "####.####",
        "required": false,
        "hasValuesList": false
      },
      {
        "id": "7762070814178863167",
        "name": "Business type",
        "internalName": "business_type",
        "type": "singleSelection",
        "control": "singleSelection",
        "kind": "user",
        "required": false,
        "allSelectedLabel": "All business",
        "possibleValueCategories": [],
        "hasValuesList": true,
        "possibleValues": [
          {
            "id": "7762070814179318335",
            "value": "Restaurants"
          },
          {
            "id": "7762070814179318591",
            "value": "Supermarkets"
          },
          {
            "id": "7762070814179316799",
            "value": "Clothing"
          },
          {
            "id": "7762070814179317055",
            "value": "Furniture"
          },
          {
            "id": "7762070814179317311",
            "value": "Travel agencies"
          },
          {
            "id": "7762070814179317567",
            "value": "Leisure"
          },
          {
            "id": "7762070814179315775",
            "value": "Financial"
          },
          {
            "id": "7762070814179316031",
            "value": "Technical"
          }
        ]
      }
    ],
    "allowSetSendActivationEmail": false,
    "generatedUsername": false,
    "addressConfiguration": {
      "useMap": true,
      "enabledFields": [
        "addressLine1",
        "zip",
        "city",
        "region",
        "country"
      ],
      "requiredFields": [
        "addressLine1"
      ],
      "address": {
        "name": "Address",
        "country": "US",
        "defaultAddress": true,
        "hidden": true
      },
      "availability": "optional",
      "edit": true,
      "managePrivacy": true,
      "maxAddresses": 0
    },
    "phoneConfiguration": {
      "country": "US",
      "alwaysShowInternationalNumber": false,
      "extensionEnabled": false,
      "smsEnabled": false,
      "landLineExample": "(201) 555-0123",
      "mobileExample": "(201) 555-0123",
      "mobilePhone": {
        "name": "Mobile phone",
        "hidden": true,
        "kind": "mobile"
      },
      "landLinePhone": {
        "name": "Land line phone",
        "hidden": true,
        "kind": "landLine"
      },
      "mobileAvailability": "optional",
      "landLineAvailability": "optional",
      "edit": true,
      "managePrivacy": true,
      "maxLandLines": 1,
      "maxMobiles": 2
    },
    "contactInfoConfiguration": {
      "availability": "disabled",
      "customFields": [],
      "maxContactInfos": 0
    },
    "imageConfiguration": {
      "manage": true,
      "availability": "optional",
      "maxImages": 2
    },
    "passwordTypes": [
      {
        "id": "7762070814178012479",
        "name": "Password",
        "internalName": "login",
        "description": "Please enter your password below. This password is used to login to the system. The password should contain at least 4 characters and have a maximum of 12 characters.",
        "canForceChange": false
      }
    ],
    "captchaType": "internal",
    "user": {
      "hiddenFields": [
        "email"
      ],
      "group": "members",
      "addresses": [],
      "mobilePhones": [],
      "landLinePhones": [],
      "contactInfos": [],
      "passwords": [],
      "images": [],
      "asMember": false
    },
    "agreements": [
      {
        "id": "7762070814178012479",
        "name": "Demo (test) agreement",
        "content": "<div align=\"center\"><br /> -THIS AGREEMENT IS JUST FOR TESTING PURPOSES -<br /></div><div><br /></div>When registering to the demo site we advice to use a real email address (needed for the confirmation email and notifications). For the rest we strongly recommend to only use mockup / dummy data to ensure your privacy. This text continues also with a dummy registration agreement:<div><br /></div><div>1. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam cursus. Morbi ut mi. Nullam enim leo, egestas id, condimentum at, laoreet mattis, massa. Sed eleifend nonummy diam. Praesent mauris ante, elementum et, bibendum at, posuere sit amet, nibh. Duis tincidunt lectus quis dui viverra vestibulum. Suspendisse vulputate aliquam dui. Nulla elementum dui ut augue. Aliquam vehicula mi at mauris. Maecenas placerat, nisl at consequat rhoncus, sem nunc gravida justo, quis eleifend arcu velit quis lacus. Morbi magna magna, tincidunt a, mattis non, imperdiet vitae, tellus. Sed odio est, auctor ac, sollicitudin in, consequat vitae, orci. Fusce id felis. Vivamus sollicitudin metus eget eros.<br />Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In posuere felis nec tortor. <br /><br />2. Pellentesque faucibus. Ut accumsan ultricies elit. Maecenas at justo id velit placerat molestie. Donec dictum lectus non odio. Cras a ante vitae enim iaculis aliquam. Mauris nunc quam, venenatis nec, euismod sit amet, egestas placerat, est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras id elit. Integer quis urna. Ut ante enim, dapibus malesuada, fringilla eu, condimentum quis, tellus. Aenean porttitor eros vel dolor. Donec convallis pede venenatis nibh. Duis quam. Nam eget lacus. Aliquam erat volutpat. Quisque dignissim congue leo.<br /><br />3. Mauris vel lacus vitae felis vestibulum volutpat. Etiam est nunc, venenatis in, tristique eu, imperdiet ac, nisl. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In iaculis facilisis massa. Etiam eu urna. Sed porta. Suspendisse quam leo, molestie sed, luctus quis, feugiat in, pede. Fusce tellus. Sed metus augue, convallis et, vehicula ut, pulvinar eu, ante. Integer orci tellus, tristique vitae, consequat nec, porta vel, lectus. Nulla sit amet diam. Duis non nunc. Nulla rhoncus dictum metus. Curabitur tristique mi condimentum orci. Phasellus pellentesque aliquam enim. Proin dui lectus, cursus eu, mattis laoreet, viverra sit amet, quam. Curabitur vel dolor ultrices ipsum dictum tristique. Praesent vitae lacus. Ut velit enim, vestibulum non, fermentum nec, hendrerit quis, leo. Pellentesque rutrum malesuada neque.<br /><br />4. Nunc tempus felis vitae urna. Vivamus porttitor, neque at volutpat rutrum, purus nisi eleifend libero, a tempus libero lectus feugiat felis. Morbi diam mauris, viverra in, gravida eu, mattis in, ante. Morbi eget arcu. Morbi porta, libero id ullamcorper nonummy, nibh ligula pulvinar metus, eget consectetuer augue nisi quis lacus. Ut ac mi quis lacus mollis aliquam. Curabitur iaculis tempus eros. Curabitur vel mi sit amet magna malesuada ultrices. Ut nisi erat, fermentum vel, congue id, euismod in, elit. Fusce ultricies, orci ac feugiat suscipit, leo massa sodales velit, et scelerisque mi tortor at ipsum. Proin orci odio, commodo ac, gravida non, tristique vel, tellus. Pellentesque nibh libero, ultricies eu, sagittis non, mollis sed, justo. Praesent metus ipsum, pulvinar pulvinar, porta id, fringilla at, est.<br /><br />5. Phasellus felis dolor, scelerisque a, tempus eget, lobortis id, libero. Donec scelerisque leo ac risus. Praesent sit amet est. In dictum, dolor eu dictum porttitor, enim felis viverra mi, eget luctus massa purus quis odio. Etiam nulla massa, pharetra facilisis, volutpat in, imperdiet sit amet, sem. Aliquam nec erat at purus cursus interdum. Vestibulum ligula augue, bibendum accumsan, vestibulum ut, commodo a, mi. Morbi ornare gravida elit. Integer congue, augue et malesuada iaculis, ipsum dui aliquet felis, at cursus magna nisl nec elit. Donec iaculis diam a nisi accumsan viverra. Duis sed tellus et tortor vestibulum gravida. Praesent elementum elit at tellus. Curabitur metus ipsum, luctus eu, malesuada ut, tincidunt sed, diam. Donec quis mi sed magna hendrerit accumsan. Suspendisse risus nibh, ultricies eu, volutpat non, condimentum hendrerit, augue. Etiam eleifend, metus vitae adipiscing semper, mauris ipsum iaculis elit, congue gravida elit mi egestas orci. Curabitur pede.<br /><br />6. Maecenas aliquet velit vel turpis. Mauris neque metus, malesuada nec, ultricies sit amet, porttitor mattis, enim. In massa libero, interdum nec, interdum vel, blandit sed, nulla. In ullamcorper, est eget tempor cursus, neque mi consectetuer mi, a ultricies massa est sed nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Proin nulla arcu, nonummy luctus, dictum eget, fermentum et, lorem. Nunc porta convallis pede.<br /><br /></div>"
      }
    ],
    "nfcTokenTypes": []
  }

  const userData={
    name: "Jaime Alberto",
    username: "jalcfer",
    email: "jalcfer@gmail.com",
    customValues: {
        website:'',
        gender:'Male/Female',
        fiscal_number:'',
        business_type:'Restaurants/Supermarkets/Clothing/Furniture/Travel agencies/Leisure/Financial/Technical'
    },
    hiddenFields: [
        "email"
      ],
    group: "members",
    addresses: [
      {
        name: "Finca 41",
        addressLine1: "Vereda El Colorado",
        city: "Guarne",
        region: "Antioquia",
        country: "Colombia",
        location: {
          latitude: 6.243021,
          longitude: -75.405078
        },
        defaultAddress: true,
        hidden: true
      }
    ],
    mobilePhones: [
      {
        name: "Celular",
        number: "+573206487385",
        hidden: true,
        enabledForSms: true,
        verified: true,
        kind: "mobile"
      }
    ],
    passwords: [
      {
        type: "login",
        value: "C4ld3r0nf",
        checkConfirmation: true,
        confirmationValue: "C4ld3r0nf",
        forceChange: false
      }
    ],
    acceptAgreement: true,
    skipActivationEmail: true,
    asMember: true,
  }
  */