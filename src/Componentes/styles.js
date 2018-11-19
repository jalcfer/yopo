/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

import {
    StyleSheet,
} from 'react-native'

import{
    dH,
    dW,
} from '../Helpers/constantes'

import {
  PRIMARY,
  SECONDARY,
  LINE,
  INPUTFORM,
  SECONDARYBLUE,
  BGBLUE,
} from '../Helpers/colors'



 /**
  * Login Styles
  */
const styles = StyleSheet.create({
    container: {
      backgroundColor: PRIMARY,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    logo:{
      flex:1,
      width:dW*0.92,
    },
    regform:{
      justifyContent:'center',
      backgroundColor: SECONDARY,
      alignSelf:'stretch',
      marginHorizontal:dW*0.04,
      borderRadius:15,
      paddingVertical:dH*0.02,
    },
    viewfield:{
      flexDirection:'row',
      backgroundColor:'transparent',
      borderBottomColor:'#000',
      borderBottomWidth:1,
      marginHorizontal:dW*0.05,
      marginBottom:dH*0.01,
    },
    icon:{
      paddingTop: dH*0.027,
      marginLeft: dW*0.05,
      fontSize: 18,
      color: SECONDARYBLUE,
    },
    button:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:SECONDARYBLUE,
      marginVertical:dH*0.05,
      marginHorizontal:dW*0.1,
      paddingVertical:dH*0.04,
    },
    btnText:{
      backgroundColor:'transparent',
      color:SECONDARY,
      fontSize:14,
    },
    anchor:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:dH*0.05,
      marginBottom:dH*0.05,
    },
    anchorText:{

    },
    /**
     * Personal Data Config Styles
     */
    containerPD:{
      backgroundColor: SECONDARY,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    header:{
      width:dW,
      height:dH*0.1,
    },
    headerTitle:{
      color: SECONDARY,
      fontSize:18,
    },
    avatarView:{
      justifyContent:'center',
      alignItems:'center',
      width:dW,
      marginTop:dH*0.05,
    },
    avatarText:{
      marginVertical:dH*0.02
    },
    line:{
      borderBottomColor:LINE,
      borderBottomWidth:0.5,
      height:0,
      width:dW*0.2,
    },
    regformPersonalData:{
      justifyContent:'center',
      backgroundColor: SECONDARY,
      alignSelf:'stretch',
      marginHorizontal:dW*0.04,
      marginVertical:dH*0.01,
      alignItems:'center',
    },
    field:{
      marginVertical:dH*0.03,
    },
    inputContainer:{
      //borderColor:'green',
      //borderWidth:1,
      padding:0,
      borderBottomColor:SECONDARYBLUE,
      borderBottomWidth:0.7,
    },    
    input:{
      padding:0,
      marginVertical:0,
      paddingLeft:dW*0.05,
      fontSize:14,
      color:INPUTFORM,
      minHeight:30,
      width:dW*0.8
    },
    labelContainer:{
      justifyContent:'flex-start',
      alignItems:'flex-start',
      padding:0,
      margin:0,
      height:dH*0.025,
    },
    label:{
      fontSize:14,
      marginRight: 0,
      marginTop: 0,
      marginLeft:dW*0.1,
    },
    genderButtons:{
      marginTop:dH*0.03,
      height: dH*0.08,
      width: dW*0.8,
    },
    buttonContinuar:{
      backgroundColor:PRIMARY,
      marginVertical:dH*0.03,
      marginHorizontal:dW*0.1,
      paddingVertical:dH*0.02,
      width:dW*0.8,
    },
    captchaView:{
      flexDirection:'row',
      width:dW*0.8,
      height:dH*0.14,
      marginVertical:dH*0.03,
    },
    captchaImage: {
      flex: 1,
      resizeMode: 'contain',
    },
  
    /**
     * CONFIG ADDRESS STYLES
     */
    mapsContainer:{
      paddingTop:dH*0.03,
      height:dH*0.4,
      width:dW*0.8,
    },
    marker: {
      height: 64,
      width: 64
    },
    markerFixed: {
      left: '50%',
      marginLeft: -32,
      marginTop: -32,
      position: 'absolute',
      top: '50%'
    },
    /**
     * PROFILE STYLES
     */
    profileContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: BGBLUE,
    },
    imageView:{
      flex:1,
      width:dW,
      alignItems:'center',
      justifyContent:'center',
    },
    historyView:{
      flex:1.5,
      width:dW,
      paddingHorizontal:dW*0.1,
      backgroundColor:SECONDARY,
    },
    nameAccess:{
      marginVertical:dH*0.01,
      alignItems:'center',
    },
    text:{
      color:SECONDARY,
    },
    textCuenta:{
      paddingVertical:dH*0.03,
      paddingLeft:dW*0.02,
      color:BGBLUE,
    },
    history:{

    },
    balanceView:{
      flexDirection:'row',
      marginVertical:dH*0.02,
    },
    textSaldo:{
      flex:1,
    },
    balance:{
      flex:1.5,
      backgroundColor:PRIMARY,
      textAlign:'right',
      textAlignVertical:'center',
      color:'white',
      borderRadius:5,
      fontSize:18,
      paddingHorizontal:dH*0.02,
    },
    /**
     * PAYMENT STYLES
     */
    contentContainer:{
      width:dW,
    },
    selectForm:{
      marginTop:dH*0.1,
      height:dH*0.3
    },    
    BgSelectUser:{
      backgroundColor:BGBLUE,
    },
    buttonSearch:{
      position:'absolute',
      right:dW*0.1,
      top:-20,
    },
    iconSearch:{
      color:PRIMARY,
      fontSize:44,
    },
    title:{
      color:BGBLUE,
      marginLeft:dW*0.1,
      fontSize:14,
    },
    viewUser:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:dH*0.07,
      height:dH*0.2,
      borderColor:'green',
      borderWidth:1,
    },
    /**
     * MAKEPAYMENT STYLES
     */
    userContainer:{
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',
      paddingHorizontal:dW*0.03,
    },
    formMakePayment:{
      marginTop:dH*0.05,
      height:dH*0.3
    },    
    userProfileImage:{
      flex:0.3,
    },
    image:{
      flex:1,
      resizeMode:"contain",
      borderRadius:30,
      overflow:'hidden',
      alignItems:'center',
    },
    userData:{
      flex:1,
      paddingLeft:dW*0.03,
      height:'100%',
      justifyContent:'center',
    },
    name:{
      color:BGBLUE,
      fontSize:24,
      paddingBottom:dH*0.01,
    },
    username:{
      color:'rgba(0,0,0,0.5)',
      fontSize:18,
    },
    cancelar:{
      backgroundColor:PRIMARY,
      marginVertical:3,
    }
  });

  export default styles