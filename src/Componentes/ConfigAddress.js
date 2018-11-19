/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';

import {
  requestLocationPermission
} from '../Helpers/permissions'

import Geolocation from 'react-native-geolocation-service';

import { 
  Avatar,
  Header,
  FormLabel, 
  FormInput, 
  ButtonGroup,
  Button
} from 'react-native-elements'

import{
  PRIMARY, MARKERCOLOR
} from '../Helpers/colors'

import OpenSans from '../Helpers/fonts'
import styles from './styles'

import MapView, { Marker } from 'react-native-maps'
import Toast from 'react-native-root-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import {connect} from 'react-redux'

import {createUser} from '../Store/actions'
import { 
  dH,
  LAT_DELTA,
  LNG_DELTA,
  COUNTRY,
  DEPARTAMENTO,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  TOAST_CREATE_USER_SUCCESS,
  TOAST_CREATE_USER_FAIL,
  TOAST_CONFIG,
} from '../Helpers/constantes';

import marker from '../../assets/icon/marker.png'

import Geocoder from 'react-native-geocoder';

class ConfigAddress extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      ciudad:null,
      barrio:null,
      direccion:null,
      region:{
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
      },
      modalVisible:false,
      address:{
        pais:'Colombia',
        ciudad:null,
        barrio:null,
        dir:null
      }
    }
  }

  onRegionChange = (region) => {
    console.log('region',region)
    this.setState({
      region
    })
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  evalNewAddres(){
    const {ciudad,barrio,direccion,address} = this.state
    if(ciudad != address.ciudad || barrio != address.barrio || direccion!= address.dir){
      this.updateMap()
    }
  }

  updateMap(){
    this.setModalVisible(true)
    const {ciudad,barrio,direccion} = this.state
    const NewAddress = `${direccion},${barrio},${ciudad},${DEPARTAMENTO},${COUNTRY}`
    Geocoder.geocodeAddress(NewAddress)
    .then((res) => {
      console.log('res',res)
      const region = {
        latitude:res[0].position.lat,
        longitude:res[0].position.lng,
        latitudeDelta:LAT_DELTA,
        longitudeDelta:LNG_DELTA,
      }
      return region
    })
    .catch((err) => {
      console.log(err)
    })
    .finally((region)=>{
      console.log('finally()')
      this.setState({
        address:{
          pais:COUNTRY,
          ciudad:ciudad,
          barrio:barrio,
          dir:direccion,
        }
      })
      this.setModalVisible(false)
      this.onRegionChange(region)
    })
  }

  async componentWillMount(){
    await requestLocationPermission()

    if (this.props.globalAccessToken!=='') {
      this.props.navigation.navigate('Main')
    }


    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region:{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
            latitudeDelta:LAT_DELTA,
            longitudeDelta:LNG_DELTA,
          }
        })
      },
      (error) => {
        console.log(error.code,error.message)
      },
      { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 3000 
      }
    )
  } 
  
  componentDidMount() {
    console.log('****************************ConfigAddress::this.props**************************')
    console.log(this.props)
    console.log(this.state.region)
  }

  componentWillUnmount() {
  }  
  
  createUser(){
    this.setModalVisible(true)
    const {newUser} = this.props

    console.log('====================================')
    console.log(this.state)
    console.log('====================================')
    
    newUser.addresses[0].addressLine1 = this.state.address.dir
    newUser.addresses[0].neighborhood = this.state.address.barrio
    newUser.addresses[0].city = this.state.address.ciudad
    newUser.addresses[0].region = DEPARTAMENTO
    newUser.addresses[0].location.latitude = this.state.region.latitude
    newUser.addresses[0].location.longitude = this.state.region.longitude

    console.log('newUser',newUser)
    
    this.props.createUser(newUser)
    .then((response)=>{
      console.log('response',response)
      switch (response.type) {
        case CREATE_USER_SUCCESS:
          this.setModalVisible(false)
          Toast.show(TOAST_CREATE_USER_SUCCESS, TOAST_CONFIG)
          this.props.navigation.navigate('Login')
          break;
        case CREATE_USER_FAIL:
          this.setModalVisible(false)
          Toast.show(TOAST_CREATE_USER_FAIL, TOAST_CONFIG)          
          this.props.navigation.navigate('Login')
          break;      
        default:
          break;
      }
    })
  };

  render() {
    return (
      <View style={styles.containerPD}>
        <Header
          centerComponent={{ text: 'CONFIGURA TU DIRECCIÓN', style: [styles.headerTitle,OpenSans.Bold] }}
          outerContainerStyles={styles.header}
          backgroundColor={PRIMARY}
        />
        <Spinner visible={this.state.modalVisible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />
        <ScrollView style={styles.contentContainer}>
          <View style={[styles.regform,{marginTop:dH*0.01,justifyContent:'center',alignItems:'center'}]}>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}
              >
                Ciudad
              </FormLabel>
              <FormInput
                ref={ciudad => this.ciudad = ciudad}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='¿en que ciudad vives?'
                value={this.state.celular}
                onChangeText={ciudad => this.setState({ ciudad })}
                onBlur={()=>this.evalNewAddres()}
              />
            </View>
            <View style={styles.field}>
            <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}
              >
              Barrio
              </FormLabel>
              <FormInput 
                ref={barrio => this.barrio = barrio}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='escribe el nombre de tu barrio'
                value={this.state.password}
                onChangeText={barrio => this.setState({ barrio })}
                onBlur={()=>this.evalNewAddres()}
              />
            </View>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}>
              Dirección
              </FormLabel>
              <FormInput 
                ref={direccion => this.direccion = direccion}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='¿cual es la dirección donde resides?'
                value={this.state.direccion}
                onChangeText={direccion => this.setState({ direccion })}
                onBlur={()=>this.evalNewAddres()}
              />
            </View>
            <View style={styles.mapsContainer}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}>
                  Ubica tu dirección en el mapa
              </FormLabel>
              {this.state.region.latitude ? <MapView
                style={{flex: 1,marginTop:dH*0.03}}
                provider={MapView.PROVIDER_GOOGLE}
                region={this.state.region}
                onRegionChangeComplete={(region)=>this.onRegionChange(region)}
              />:null}
              <View style={styles.markerFixed} pointerEvents="none">
                <Image style={styles.marker} source={marker} />
              </View>              
            </View>
            <Button
              large
              onPress={()=>this.createUser()}
              rightIcon={{name: 'arrow-forward', type: 'FontAwesome5'}}
              buttonStyle={styles.buttonContinuar}
              textStyle={[styles.btnText,OpenSans.Normal]}
              title='REGISTRARME' />
          </View>
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = state => {
  let accessToken = state.userLoggedin.hasOwnProperty('sessionToken') ? state.userLoggedin.sessionToken : '';
  return {
    globalAccessToken: accessToken,
    newUser:state.newUser
  };
};

const mapDispatchToProps = {
  createUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigAddress);
