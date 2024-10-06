import React from "react";
import { TouchableOpacity, View, Text , Dimensions} from "react-native";
import Images from "../../../component/Images";
import Styles from "../../typeOfGame/page/Styles";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Platform } from "react-native";
import { Font } from "../../../../assets/fonts/Fonts";

const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968; 
const ChooseMood = ()=>{

    return(
<View style={Styles.ChooseTypeOfGameContainer}>

    
    <TouchableOpacity style={Styles.rightImage} >
    <Images imageStyle={Styles.PlayWithAFriend} localSource={require('../../../../assets/images/P3.png')}/>
    <Text style={[Styles.TextStyle,{fontSize:responsiveFontSize(2), marginBottom:responsiveHeight(4),color: "#8AC9FF", }]}>انشئ كود</Text>
    </TouchableOpacity>

    <TouchableOpacity style={Styles.rightImage}>
    <Images imageStyle={Styles.PlayWithAFriend} localSource={require('../../../../assets/images/P4.png')}/>
    <Text style={[Styles.TextStyle,{fontSize:responsiveFontSize(2),marginBottom:responsiveHeight(4),color: "#FF595E"}]}>ادخل كود</Text>
    </TouchableOpacity>
</View>
    )
}
export default ChooseMood;