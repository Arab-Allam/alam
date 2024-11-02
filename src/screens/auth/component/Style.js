
import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";
import { Platform } from "react-native";
import { Font } from "../../../../assets/fonts/Fonts";
const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968; 

const Styles = StyleSheet.create({
container: {flex: 1},
bgImage:{ width: responsiveWidth(100), height:responsiveHeight(100),zIndex:-2},
ss: {borderRadius:responsiveFontSize(2.2),width: width >= TABLET_WIDTH ? responsiveWidth(77.26) : responsiveWidth(67.5) ,height: width >= TABLET_WIDTH ? responsiveWidth(52) : responsiveWidth(41)},
authContainer:{backgroundColor:'white',borderRadius:20,width: width >= TABLET_WIDTH ? responsiveWidth(73.26) : responsiveWidth(65),height: width >= TABLET_WIDTH ? responsiveHeight(70) : responsiveHeight(85),marginTop: width >= TABLET_WIDTH ? 105 : responsiveHeight(6),alignSelf:'center', borderColor:'#E88102',borderWidth:1,position:'absolute'},
title:{fontSize:responsiveFontSize(4),color:'#8AC9FF',alignSelf:'center', marginTop: width >= TABLET_WIDTH ? 75 : responsiveWidth(4) , fontWeight:'700',fontFamily:Font.bold},
containerTextinput: {marginTop: 10,},
label: {fontSize: 26,fontWeight: 'bold',color: '#DB6704',alignSelf:'center', marginLeft:responsiveWidth(35)},
inputContainer: {backgroundColor: '#E7E7E7', borderRadius: 20, width:width >= TABLET_WIDTH ? responsiveWidth(42) : responsiveWidth(30),textAlign:'right',alignContent:'flex-end',alignItems:'flex-end',paddingRight:responsiveWidth(2),fontSize:30},
input: {textAlign: 'right',padding:width >= TABLET_WIDTH ? responsiveWidth(2):responsiveWidth(1.3)},
// contentContainer:{flexDirection:'columns'}
});
export default Styles;