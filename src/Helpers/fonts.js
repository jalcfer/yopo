/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

import {
  StyleSheet
} from 'react-native'

import fontMaker from './fontMaker'

const OpenSans = StyleSheet.create({
  ExtraBold: fontMaker({ 
    weight: 'ExtraBold', 
    family: 'OpenSans',
  }),
  Bold: fontMaker({ 
    weight: 'Bold', 
    family: 'OpenSans',
  }),
  SemiBold: fontMaker({ 
    weight: 'SemiBold', 
    family: 'OpenSans',
  }),
  Normal: fontMaker({ 
    weight: 'Normal', 
    family: 'OpenSans',
  }),
  Light: fontMaker({ 
    weight: 'Light', 
    family: 'OpenSans',
  }),
  ExtraBoldItalic: fontMaker({ 
    weight: 'ExtraBold', 
    family: 'OpenSans',
    style:'italic',
  }),
  BoldItalic: fontMaker({ 
    weight: 'Bold', 
    family: 'OpenSans',
    style:'italic',
  }),
  SemiBoldItalic: fontMaker({ 
    weight: 'SemiBold', 
    family: 'OpenSans',
    style:'italic',
  }),
  Italic: fontMaker({ 
    weight: 'Normal', 
    family: 'OpenSans',
    style:'italic',
  }),
  LightItalic: fontMaker({ 
    weight: 'Light', 
    family: 'OpenSans',
    style:'italic',
  }),
})

export default OpenSans