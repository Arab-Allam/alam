import React from "react";
import { View, Text, Dimensions, Button, TouchableOpacity } from "react-native";
import Styles from "../../typeOfGame/page/Styles";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Images from "../../../component/Images";
import { Font } from "../../../../assets/fonts/Fonts";

const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968;

const RectangleContainer = () => {
  return (
    <View style={Styles.rectangleContainer}>
      <Images imageStyle={Styles.ss} localSource={require('../../../../assets/images/sss.png')} />
        <Text style={[Styles.TextStyle, { color: '#1E093C',position:'absolute', top:responsiveHeight(33)}]}>
          مرحـباً بــك فـي مــديـنة عــراب
        </Text>
        <TouchableOpacity style={{backgroundColor:'#DB6704',position:'absolute', width:responsiveWidth(31),height:responsiveWidth(6),top: width >= TABLET_WIDTH ? responsiveHeight(50): responsiveHeight(55) ,borderRadius:8, padding:9.5
        }}>
          <Text style={{color:'white',alignSelf:'center',fontSize:  width >= TABLET_WIDTH ? responsiveFontSize(2): responsiveFontSize(3),fontFamily:Font.bold, fontWeight:400}}>تسجيل الدخول</Text>
        </TouchableOpacity>
        </View>
  );
};

export default RectangleContainer;
