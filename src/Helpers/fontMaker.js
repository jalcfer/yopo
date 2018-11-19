/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */


import { Platform } from 'react-native';

// we define available font weight and styles for each font here
const font = {
    OpenSans: {
      weights: {
        ExtraBold: '800',
        Bold: '700',
        SemiBold: '600',
        Normal: '400',
        Light: '300',
      },
      styles: {
        Italic: 'italic',
        Normal: 'normal'
      }
    },
  }
  
  // generate styles for a font with given weight and style
const fontMaker = (options = {}) => {
  let { weight, style, family } = Object.assign({
    weight: null,
    style: null,
    family: 'OpenSans'
  }, options)

  const { weights, styles } = font[family]

  if (Platform.OS === 'android') {
    weight = weights[weight] ? weight : ''
    style = styles[style] ? style : ''

    const suffix = weight + style

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : '')
    }
  } else {
    weight = weights[weight] || weights.Normal
    style = styles[style] || 'normal'

    return {
      fontFamily: family,
      fontWeight: weight,
      fontStyle: style
    }
  }
}

export default fontMaker