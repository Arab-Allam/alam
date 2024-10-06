import React from "react";
import { View, Text, Dimensions } from "react-native";
import Styles from "../page/Styles";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import ChooseTypeOfGame from "./ChooseTypeOfGame";
import Images from "../../../component/Images";

const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968;

const RectangleContainer = () => {
  return (
    <View style={Styles.rectangleContainer}>
      <Images imageStyle={Styles.ss} localSource={require('../../../../assets/images/sss.png')} />
        <Text style={[Styles.TextStyle, { color: '#1E093C',position:'absolute', top:responsiveHeight(16)}]}>
          مرحـباً بــك فـي مــديـنة عــراب
        </Text>
        <Text style={[Styles.TextStyle, { padding: 0, color: 'white',position:'absolute',top: width >= TABLET_WIDTH ? responsiveHeight(29): responsiveHeight(30)}]}>
          إبــدا مـعـنا الأن
        </Text>
        <Text style={[Styles.TextStyle, { fontSize: width >= TABLET_WIDTH ? 23.5 : responsiveFontSize(1.6),position:'absolute',top: width >= TABLET_WIDTH ? responsiveHeight(41): responsiveHeight(45),color:"rgba(0, 0, 0, 0.70);"}]}>
          لنتعـــرف عــلى عـراب، عــراب هـو مسـاعدك الشـخـصي و صــاحبـك المـفــضل لتـحـظى بلغة عربـية فصيـحة ورائـعة
        </Text>
        
        <ChooseTypeOfGame />

    </View>
  );
};

export default RectangleContainer;
