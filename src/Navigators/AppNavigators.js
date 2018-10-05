/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

import React from 'react';

import { 
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import {
  dH,
  dW,
} from '../Helpers/constantes'

import Icon from 'react-native-vector-icons/Ionicons'


/**
 * Init stack
 */
import Login from '../Componentes/Login';

 
/**
 * Main stack
 */
import Marketplace from '../Componentes/Marketplace';
import SelectUser from '../Componentes/SelectUser'
import MakePayment from '../Componentes/MakePayment';
import ReceivePayment from '../Componentes/ReceivePayment';
import Profile from '../Componentes/Profile';
/* 
  ******* Código para incluir la tienda en fase 2 ********
    Marketplace: { 
      screen: Marketplace,
      navigationOptions: {
        header: null,
      }
    },
*/
const Payment = createStackNavigator({
  SelectUser:{
    screen: SelectUser,
    navigationOptions:{
      header: null,
    }
  },
  MakePayment:{
    screen: MakePayment,
    navigationOptions:{
      header:null
    }
  }
},{
  initialRouteName:'SelectUser',
  headerMode:'screen',
  navigationOptions:{
    title:'Pagar'
  }
})


const PaymentsTabs = createMaterialTopTabNavigator({
  Pagar: Payment,
  ReceivePayment: { 
    screen: ReceivePayment,
    navigationOptions: {
      title:'Recibir Pago',
    }
  },
},{
  tabBarOptions: {
    scrollEnabled: true,
    labelStyle: {
      fontSize: 14,
      color:'#000',
    },
    tabStyle: {
      width: dW*0.5,
      height:dH*0.09,
    },
    style: {
      backgroundColor: '#FFF',
    },
    indicatorStyle: {
      backgroundColor: '#020030'
    }
  },
});

const MainStack= createBottomTabNavigator(
  {
    PaymentsTabs:PaymentsTabs,
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null,
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName
        if (routeName === 'Marketplace') {
          //color = `${focused ? 'home' : '-outline'}`;
          iconName = 'ios-home'
        } else if (routeName === 'PaymentsTabs') {
          //iconName = `ios-wallet${focused ? '' : '-outline'}`;
          iconName = 'ios-wallet'
        } else if (routeName === 'Profile') {
          //iconName = `person${focused ? '' : '-outline'}`;
          iconName = 'ios-person'
        }
  
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon color={tintColor} name={iconName} size={30}/>;
      },
    }),
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'rgb(0, 0, 51)',
      inactiveTintColor: '#CECECE',
      showLabel: false,
      style:{height:50}
    },
    animationEnabled: false,
    swipeEnabled: false,
  },{
    initialRouteName:'Marketplace',
    headerMode:'screen',
  }
)

const RootNavigator = createStackNavigator({
  Login :{
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  Main : MainStack
},{
  initialRouteName:'Login',
  headerMode:'screen',
  navigationOptions:{
    header:null
  }
});

export default RootNavigator