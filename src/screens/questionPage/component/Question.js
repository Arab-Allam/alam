import React from "react";
import { View,Text } from "react-native";
import { Font } from "../../../../assets/fonts/Fonts";
import QuestionPageStyle from "../page/QuestionPageStyle";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";
const Question = ({TheQuestion,TheSentencse}) =>{

    return(
        <View style={QuestionPageStyle.QuestionContainer}>
        <Text style={[QuestionPageStyle.QuestionText,{fontSize:responsiveFontSize(2.2)}]}>ما إعــراب كـلـمـة محـمـد؟{}</Text>
        <Text style={[QuestionPageStyle.QuestionText,{fontSize:responsiveFontSize(3)}]}>أكــل محــمــد التــفـاحــه</Text>
        </View>

    )
}
export default Question;