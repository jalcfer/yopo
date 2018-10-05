/**
 * NAPPS - Neuronapps
 * https://github.com/baure/napps
 * @flow
 */

import {
    StyleSheet,
} from 'react-native'

import{
    dH,
    dW,
} from '../Helpers/constantes'


 /**
  * Login Styles
  */
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#669D6E',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    regform:{
      alignSelf:'stretch',
    },
    textinput:{
      fontFamily: 'Open Sans',
      fontWeight: '500',
      fontStyle: 'normal',
      flex:1,
      color:'#fff',
      fontSize:14,
      height:20,
    },
    textarea:{
      fontFamily: 'Open Sans',
      fontWeight: '500',
      fontStyle: 'normal',
      flex:1,
      color:'#fff',
      fontSize:14,
      textAlignVertical:'top',
    },
    viewfield:{
      flexDirection:'row',
      backgroundColor:'transparent',
      alignSelf:'stretch',
      justifyContent:'center',
      paddingHorizontal:30,
      paddingBottom:10,
    },
    noPadding:{
      paddingHorizontal:0,
    },
    Padding:{
      paddingHorizontal:30,
    },
    viewUser:{
      flexDirection:'row',
      backgroundColor:'transparent',
      alignSelf:'stretch',
      justifyContent:'center',
      height:dH*0.2,
      paddingHorizontal:30,
      paddingBottom:10,
    },
    viewImage:{
      flex:1,
      height:dH*0.4,
      marginBottom:dH*0.1,
      backgroundColor:'#FFF',
      paddingVertical:dH*0.05,
      justifyContent:'center',
      alignItems:'center',
    },
    logo:{
      width: '60%',
      height: '60%',
      resizeMode:'contain',
      paddingHorizontal:dW*0.01,
    },
    registerfield:{
      flex:1,
      borderBottomColor:'#020030',
      borderBottomWidth:0.5,
      height:40
    },
    registerfieldTA:{
      height:80,
    },
    icon:{
      paddingTop: 10,
      marginRight: 10,
      fontSize: 32,
      color: '#020030',
    },
    iconSearch:{
      fontSize: 32,
      color: '#020030',
    },
    button:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      paddingVertical:9,
      paddingHorizontal:15,
      marginTop:dH*0.04,
      borderRadius:20,
      borderColor:'#020030',
      borderWidth:0.7,
    },
    buttonSearch:{
      flex:0.5,
      justifyContent:'center',
      alignItems:'center',
    },
    btnText:{
      fontFamily: 'Open Sans',
      fontWeight: '500',
      fontStyle: 'normal',
      backgroundColor:'transparent',
      color:'#fff',
      fontSize:18,
    },
    title:{
      flex:1,
      fontFamily: 'Open Sans',
      fontWeight: '500',
      fontStyle: 'normal',
      backgroundColor:'transparent',
      color:'#fff',
      fontSize:18,
      textAlign:'left',
    },
    line:{
      flex:1,
      borderBottomColor:'#020030',
      borderBottomWidth:0.5,
      height:10,
    },
    oText:{
      fontFamily: 'Open Sans',
      fontWeight: '600',
      fontStyle: 'normal',
      backgroundColor:'transparent',
      color:'#fff',
      fontSize:14,
    },
    facebookButton:{
      flexDirection:'row',
  
    },
    iconfacebook:{
      fontSize:23,
      color:'white',
    },
    faceText:{
      fontFamily: 'Open Sans',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize:14,
      color:'#fff',
      marginLeft:10,
      height:20,
      paddingTop:2,
    },
    contentContainer:{
      width:dW,
    },

    userContainer: {
      flex:1,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',
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
      color:'#FFF',
      fontSize:24,
      paddingBottom:dH*0.01,
    },
    username:{
      color:'rgba(255,255,255,0.5)',
      fontSize:18,
    },
  });

  export default styles