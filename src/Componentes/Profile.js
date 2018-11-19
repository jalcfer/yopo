/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {
  dW,
  dH,
  GET_ACCOUNT_HISTORY_SUCCESS,
  GET_ACCOUNT_HISTORY_FAIL,
  GET_ACCOUNT_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
}from '../Helpers/constantes'

import { 
  Avatar,
  Divider,
  List,
  ListItem,
  Icon
} from 'react-native-elements';

import {
  getSelf,
  getHistory,
  getAccount,
  updateProfile,
  uploadProfileImage,
  uploadImage,
} from '../Store/actions'

import {connect} from 'react-redux'
import { PAYMENTOUT, PAYMENTIN } from '../Helpers/colors';

import styles from './styles'
import OpenSans from '../Helpers/fonts';
import Spinner from 'react-native-loading-spinner-overlay'
import ImagePicker from 'react-native-image-picker';

import moment from 'moment'
import 'moment/locale/es';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarImage:null,
      fullName:null,
      ownerId:null,
      accountType:null,
      history:[],
      usuario:null,
      balance:null,
    };
  }

  componentWillMount(){
  }

  componentDidMount(){
    this.getAccount()
  }

  getSelf(){
    const {globalAccessToken} = this.props
    this.props.getSelf(globalAccessToken)
    .then((response)=>{
      console.log('getSelf::response',response)
      switch (response.type) {
        case AUTH_SUCCESS:
          this.getAccount()
          break
        case AUTH_FAIL:
          this.setModalVisible(false)
          break
        default:
          break
      }
    })
  }

  getAccount(){
    this.setModalVisible(true)
    const {userLoggedin, globalAccessToken} = this.props
    const ownerId = userLoggedin.user.id
    const accountType = userLoggedin.permissions.banking.accounts[0].account.type.id

    this.props.getAccount(ownerId,accountType,globalAccessToken)
    .then((response)=>{
      switch (response.type) {
        case GET_ACCOUNT_SUCCESS:
          this.setModalVisible(false)
          this.getHistory(response.payload.data)
          break;
        case GET_ACCOUNT_FAIL:
          this.setModalVisible(false)
          break;      
        default:
          break;
      }
    })
  }

  getHistory(account){
    const {userLoggedin, globalAccessToken} = this.props
    const avatarImage = userLoggedin.user.hasOwnProperty('image') ? userLoggedin.user.image.url : null
    const fullName = userLoggedin.user.display
    const ownerId = userLoggedin.user.id
    const accountType = userLoggedin.permissions.banking.accounts[0].account.type.id
    const usuario = userLoggedin.user.shortDisplay
    const balance = account.status.balance + account.currency.symbol

    this.props.getHistory(ownerId,accountType,globalAccessToken)
    .then((response)=>{
      switch (response.type) {
        case GET_ACCOUNT_HISTORY_SUCCESS:
          this.setState({
            avatarImage:avatarImage,
            fullName:fullName,
            ownerId:ownerId,
            accountType:accountType,
            usuario:usuario,
            history:response.payload.data,
            balance: balance
          })
          break;
        case GET_ACCOUNT_HISTORY_FAIL:
          break;
        default:
          break;
      }
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props!==nextProps){
      console.log('Profile::nextProps',nextProps)
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderTitle(name,desc){
    return desc ? desc : name
  }

  renderDate(date){
    console.log('rendering date',date)
    const newD = moment(date,'DD-MMM-YYYY').locale('es')
    console.log('newD',newD)
    return newD
  }

  renderIcon(kind,from){
    let color=''
    let name=''
    console.log('rendering icon')
    switch (kind) {
      case 'system':
        if(this.isMyPayment(from.id)){
          name='launch'
          color = PAYMENTOUT
        }else{
          name='input'
          color = PAYMENTIN
        }
        return <Icon name={name} color = {color}/>
      case 'user':
        if(this.isMyPayment(from.id)){
          name='arrow-down'
          color = PAYMENTOUT
        }else{
          name='arrow-up'
          color = PAYMENTIN
        }
        return <Icon name={name} color = {color}/>
      default:
        break;
    }
  }

  openImagePicker(){
    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: 'Selecciona una foto para tu perfil',
      customButtons: [
        {
          name: 'okBtn', 
          title: 'OK'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType:'photo',
      maxWidth:200,
      maxHeight:200,
      cancelButtonTitle:'Cancelar',
      takePhotoButtonTitle:'Desde la cámara',
      chooseFromLibraryButtonTitle:'Desde la librería',
      cameraType:'front',
      allowsEditing:true,
    };
    
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setModalVisible(true)
        const data = new FormData()
        
        data.append('name','profile')
        data.append('kind','profile')
        data.append("image", {
          uri: response.uri  ,
          type: response.type,
          name: response.fileName
        });
        const ownerId = this.props.userLoggedin.user.id
        const {globalAccessToken} = this.props
        this.props.uploadImage(ownerId,data,globalAccessToken)
        .then((response)=>{
          console.log(response)
          return response.payload.data
        })
        .finally((imageId)=>{
          this.updateProfile(imageId)
        })
      }
    });
  }

  updateProfile(id){
    const {globalAccessToken,userLoggedin} = this.props    
    const ownerId = userLoggedin.user.id
    const idNewImage = id+''
    const idOldImage = userLoggedin.user.hasOwnProperty('image') ? userLoggedin.user.image.id : null

    let objToUpdate = {
      removeImages: [],
    }
    if (idOldImage) {
      objToUpdate.removeImages.push(idOldImage)

      this.props.updateProfile(ownerId,objToUpdate,globalAccessToken)
      .then((response)=>{
        switch (response.type) {
          case UPDATE_SUCCESS:
            this.getSelf()
            break;
          case UPDATE_FAIL:

            break;
        
          default:
            break;
        }
      })
    }else{
      this.getSelf()
    }
  }

  isMyPayment(id){
    return id === this.props.userLoggedin.user.id ? true : false
  }


  render() {
    const {history} = this.state
    return (
      <View style={styles.profileContainer}>
        <Spinner visible={this.state.modalVisible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />
        <View style={styles.imageView}>
          <Avatar
            xlarge
            rounded
            source={{uri: this.state.avatarImage}}
            onPress={() => this.openImagePicker()}
            activeOpacity={0.7}
          />
          <View style={styles.nameAccess}>
            <Text h1 style={[styles.text,OpenSans.Bold]}>{this.state.fullName}</Text>
            <Text h4 style={[styles.text,OpenSans.Light]}>{this.state.usuario}</Text>
          </View>
        </View>
        <View style={styles.historyView}>
          <Text h1 style={[styles.textCuenta,OpenSans.Bold]}>CUENTA</Text>
          <Divider style={{ backgroundColor: 'gray' }} />
          <View style={styles.balanceView}>
            <Text h1 style={[styles.textSaldo,OpenSans.Bold]}>Saldo Disponible</Text>
            <Text h1 style={[styles.balance,OpenSans.Bold]}>{this.state.balance}</Text>
          </View>
          <ScrollView style={styles.history}>
            <List containerStyle={{marginBottom: 20}}>
              {
                history.map((item) => (
                  <ListItem
                    key={item.date}
                    title={this.renderTitle(item.type.name,item.description)}
                    subTitle={this.renderDate(item.date)}
                    subtitleStyle={{borderColor:'red',borderWidth:0.5,backgroundColor:'green'}}
                    rightTitle={item.amount}
                    hideChevron={true}

                  />
                ))
              }
            </List>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  let accessToken = state.userLoggedin.hasOwnProperty('sessionToken') ? state.userLoggedin.sessionToken : '';
  return {
    globalAccessToken: accessToken,
    userLoggedin:state.userLoggedin
  };
};

const mapDispatchToProps = {
  getSelf,
  getHistory,
  getAccount,
  updateProfile,
  uploadProfileImage,
  uploadImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
