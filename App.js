/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */


import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

//import { AppReducer } from './src/Store/Reducer'
import AppReducer from './src/Store/Reducer'
import RootNavigator from './src/Navigators/AppNavigators'
import { Client } from './src/Helpers/constantes'
import axiosMiddleware from 'redux-axios-middleware'

const store = createStore(AppReducer, applyMiddleware(axiosMiddleware(Client)));



export default class Yopo extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Yopo', () => Yopo);