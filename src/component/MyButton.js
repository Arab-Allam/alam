import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Font } from "../../assets/fonts/Fonts";

const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968;


const Mybutton = ({ButtonName,ButtonStyle,op})=>{

    return(
        <TouchableOpacity style={{backgroundColor:'#DB6704', width: width >= TABLET_WIDTH ?responsiveWidth(28):responsiveWidth(15) ,height:width >= TABLET_WIDTH ? responsiveWidth(5.5):responsiveWidth(4.1) ,borderRadius:8, paddingTop:responsiveWidth(1) }}onPress={op}>
          <Text style={{color:'white',alignSelf:'center',fontSize:  width >= TABLET_WIDTH ? responsiveFontSize(1.8): responsiveFontSize(1.5),fontFamily:Font.bold,}}>{ButtonName}</Text>
        </TouchableOpacity>
    )
}
export default Mybutton