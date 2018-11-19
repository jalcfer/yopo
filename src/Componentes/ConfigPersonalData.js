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
  Avatar,
  Header,
  FormLabel, 
  FormInput, 
  ButtonGroup,
  Button
} from 'react-native-elements'

import{
  PRIMARY
} from '../Helpers/colors'

import OpenSans from '../Helpers/fonts'
import styles from './styles'


import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-root-toast'
import Spinner from 'react-native-loading-spinner-overlay'
import {connect} from 'react-redux'

import {
  setPersonalData,
  uploadProfileImage,
  getCaptcha,
} from '../Store/actions'

import {
  GENDERS,
  GENDERSBTN,
  IDTYPES,
  IDTYPESBTN,
  M_EMAIL,
  GET_CAPTCHA_SUCCESS,
  GET_CAPTCHA_FAIL,
  baseURL,
} from '../Helpers/constantes'

class ConfigPersonalData extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      name: null,
      identification:null,
      avatar:null,
      celular:null,
      password:null,
      email:null,
      genderIndex:null,
      idTypeIndex:null,
      modalVisible:false,
      captchaImage:null,
      captchaValue:null,
    };
  }

  modalToogle(){
    this.setState({
      modalVisible: !this.state.modalVisible
    })
  }

  componentWillMount(){
    if (this.props.globalAccessToken!=='') {
      this.props.navigation.navigate('Main')
    }
  } 
  
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    console.log('nextProps',nextProps)
    console.log('this.props',this.props)
  }
  
  componentDidMount() {
    this.modalToogle()
    this.props.getCaptcha()
    .then((response)=>{
      console.log('getCaptcha::response',response)
      switch (response.type) {
        case GET_CAPTCHA_SUCCESS:
          this.setState({
            captchaImage:response.payload.headers.location
          })
          this.modalToogle()
          break;
        case GET_CAPTCHA_FAIL:
          this.modalToogle()
          break;
        default:
          break;
      }
    })
  }

  componentWillUnmount() {
  }  
  
  updateGenderIndex (genderIndex) {
    this.setState({
      genderIndex
    })
  }

  updateIdTypeIndex (idTypeIndex) {
    this.setState({
      idTypeIndex
    })
  }

  goConfigDir(){
    const data={
      tipoId:IDTYPES[this.state.idTypeIndex],
      identification:this.state.identification,
      name:this.state.name,
      celular:this.state.celular,
      email: this.state.email,
      gender:GENDERS[this.state.genderIndex],
      password:this.state.password,
      captchaResponse:this.state.captchaValue,
    }
    this.props.setPersonalData(data)
    this.props.navigation.navigate('ConfigAddress')
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
      maxWidth:90,
      maxHeight:100,
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
        this.modalToogle()
        const data = new FormData()
        
        data.append('name','profile')
        data.append('target','userRegistration')
        data.append("image", {
          uri: response.uri  ,
          type: response.type,
          name: response.fileName
        });

        this.props.uploadProfileImage(data)
        .then((response)=>{
          console.log(response)
        })
        .finally(()=>{
          this.modalToogle()
          this.setState({
            avatar: response.uri,
          });
        })
      }
    });
  }

  render() {
    return (
      <View style={styles.containerPD}>
        <Header
          centerComponent={{ text: 'REGISTRO', style: [styles.headerTitle,OpenSans.Bold] }}
          outerContainerStyles={styles.header}
          backgroundColor={PRIMARY}
        />
        <Spinner visible={this.state.modalVisible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} />
        <ScrollView style={styles.contentContainer}>
          <View style={styles.regformPersonalData}>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}
              >
                Celular
              </FormLabel>
              <FormInput
                ref={celular => this.celular = celular}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='escribe tu número de celular'
                value={this.state.celular}
                keyboardType='numeric'
                onChangeText={celular => this.setState({ celular })}
              />
            </View>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}
              >
              Contraseña
              </FormLabel>
              <FormInput 
                ref={password => this.password = password}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='escribe una contraseña'
                value={this.state.password}
                secureTextEntry={true}
                keyboardType='numeric'
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={[styles.label]}>
                Tipo de Identificación
              </FormLabel>
              <ButtonGroup
                onPress={(index)=> this.updateIdTypeIndex(index)}
                selectedIndex={this.state.idTypeIndex}
                buttons={IDTYPESBTN}
                containerStyle={styles.genderButtons}
              />
            </View>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}>
                No. de Identificación
              </FormLabel>
              <FormInput 
                ref={identification => this.identification = identification}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='escribe tu número de identificación'
                value={this.state.identification}
                onChangeText={identification => this.setState({ identification })}
              />
            </View>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}>
              Nombre
              </FormLabel>
              <FormInput 
                ref={name => this.name = name}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='escribe tu nombre'
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
            </View>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={styles.label}>
              Email
              </FormLabel>
              <FormInput 
                ref={email => this.email = email}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='escribe un email válido'
                value={this.state.email}
                keyboardType='email-address'
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={[styles.label]}>
                Género
              </FormLabel>
              <ButtonGroup
                onPress={(index)=> this.updateGenderIndex(index)}
                selectedIndex={this.state.genderIndex}
                buttons={GENDERSBTN}
                containerStyle={styles.genderButtons}
              />
            </View>
            <View style={styles.field}>
              <FormLabel
                containerStyle={styles.labelContainer}
                labelStyle={[styles.label]}>
                Validación visual
              </FormLabel>
              <View style={styles.captchaView}>
                <Image style={styles.captchaImage} source={{uri: this.state.captchaImage}}/>
              </View>
              <FormInput 
                ref={captcha => this.captcha = captcha}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input} 
                placeholder='escriba el código de seguridad'
                value={this.state.captchaValue}
                onChangeText={captchaValue => this.setState({ captchaValue })}
              />
            </View>
            <Button
              large
              onPress={()=>this.goConfigDir()}
              rightIcon={{name: 'arrow-forward', type: 'FontAwesome5'}}
              buttonStyle={styles.buttonContinuar}
              textStyle={[styles.btnText,OpenSans.Normal]}
              title='CONTINUAR' />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  let accessToken = state.userLoggedin.hasOwnProperty('sessionToken') ? state.userLoggedin.sessionToken : '';
  return {
    globalAccessToken: accessToken
  };
};

const mapDispatchToProps = {
  setPersonalData,
  uploadProfileImage,
  getCaptcha
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPersonalData);
