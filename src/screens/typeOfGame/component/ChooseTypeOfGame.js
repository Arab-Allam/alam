import React from "react";
import { TouchableOpacity, View, Text , Dimensions} from "react-native";
import Images from "../../../component/Images";
import Styles from "../page/Styles";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Platform } from "react-native";
import { Font } from "../../assets/fonts/Font";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968; 
const ChooseTypeOfGame = ()=>{
    const navigation = useNavigation();

    return(
<View style={Styles.ChooseTypeOfGameContainer}>

    
    <TouchableOpacity style={Styles.rightImage} onPress={() => navigation.navigate('PlayWithFriend')} >
    <Images imageStyle={Styles.PlayWithAFriend} localSource={require('../../../../assets/images/p1.png')}/>
    <Text style={[Styles.TextStyle,{fontSize:responsiveFontSize(2), marginBottom:responsiveHeight(3),color: "#CBA6FF", }]}>ألعب مع صديق</Text>
    </TouchableOpacity>

    <TouchableOpacity style={Styles.rightImage}>
    <Images imageStyle={Styles.PlayWithAFriend} localSource={require('../../../../assets/images/p2.png')}/>
    <Text style={[Styles.TextStyle,{fontSize:responsiveFontSize(2),marginBottom:responsiveHeight(3),color: "#8AC9FF"}]}>أبدأ الأن</Text>
    </TouchableOpacity>
</View>
    )
}
export default ChooseTypeOfGame;