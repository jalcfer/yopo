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

import {
  PRIMARY,
  SECONDARY
} from '../Helpers/colors'

import OpenSans from '../Helpers/fonts'

import Icon from 'react-native-vector-icons/Ionicons'


/**
 * Init stack
 */
import Login from '../Componentes/Login';
import ConfigPersonalData from '../Componentes/ConfigPersonalData'
import ConfigAddress from '../Componentes/ConfigAddress'

 
/**
 * Main stack
 */
import Marketplace from '../Componentes/Marketplace';
import SelectUser from '../Componentes/SelectUser'
import MakePayment from '../Componentes/MakePayment';
import SelectUserFromReceivePayment from '../Componentes/SelectUserFromReceivePayment'
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
const Init = createStackNavigator({
  Login :{
    screen: Login,
    navigationOptions: {
      header: null,
    }
  },
  ConfigData :{
    screen: ConfigPersonalData,
    navigationOptions: {
      header: null,
    }
  },
  ConfigAddress :{
    screen: ConfigAddress,
    navigationOptions: {
      header: null,
    }
  },
})

const PaymentStack = createStackNavigator({
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

const ReceivePaymentStack = createStackNavigator({
  SelectUserFromReceive:{
    screen: SelectUserFromReceivePayment,
    navigationOptions:{
      header: null,
    }
  },
  ReceivePayment:{
    screen: ReceivePayment,
    navigationOptions:{
      header:null
    }
  }
},{
  initialRouteName:'SelectUserFromReceive',
  headerMode:'screen',
  navigationOptions:{
    title:'Pagar'
  }
})



const MainStack = createMaterialTopTabNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title:'Perfil',
      showIcon:true,
      showLabel: false,
      tabBarIcon:({tintColor}) => <Icon color={tintColor} name={'ios-person'} size={30}/>
    }
  },
  Pay: { 
    screen: PaymentStack,
    navigationOptions: {
      title:'Pagar',
    }
  },
  Receive: { 
    screen: ReceivePaymentStack,
    navigationOptions: {
      title:'Recibir Pago',
    }
  },
},{
  tabBarOptions: {
    scrollEnabled: true,
    labelStyle: [{
      fontSize: 13,
      color:SECONDARY,
    },OpenSans.Bold],
    tabStyle: {
      width:dW*0.333,
      height:dH*0.09,
      textAlign:'center',
    },
    style: {
      backgroundColor: PRIMARY,
    },
    indicatorStyle: {
      backgroundColor: SECONDARY,
      height:dH*0.007

    },
    activeTintColor: 'rgb(0, 0, 51)',
    inactiveTintColor: '#CECECE',    
  },
});
/*
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
*/
const RootNavigator = createStackNavigator({
  Login : Init,
  Main : MainStack
},{
  initialRouteName:'Login',
  headerMode:'screen',
  navigationOptions:{
    header:null
  }
});

export default RootNavigator