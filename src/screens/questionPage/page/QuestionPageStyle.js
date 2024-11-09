import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";
import { Platform } from "react-native";
import { Font } from "../../../../assets/fonts/Fonts";
const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968; 

const QuestionPageStyle = StyleSheet.create({
    container: {flex: 1},
    bgImage:{ resizeMode:'stretch', width: width >= TABLET_WIDTH ? responsiveWidth(100) : responsiveWidth(100), height:width >= TABLET_WIDTH ? responsiveHeight(100) : responsiveHeight(100),zIndex:-2},
    PlayerInfoContainer: {flexDirection: 'row',justifyContent: 'space-around',width:  width >= TABLET_WIDTH ?  responsiveWidth(100) : responsiveWidth(70), paddingHorizontal: width >= TABLET_WIDTH ? responsiveWidth(5): responsiveWidth(1),marginTop:responsiveHeight(13)},
    // playerSection: { marginBottom: responsiveHeight(2),},
    scoreBox: {backgroundColor: 'white', borderRadius: responsiveWidth(2),padding: responsiveWidth(1),alignItems: 'flex-start',width:  width >= TABLET_WIDTH ? responsiveWidth(30):responsiveWidth(24) },
    rightAligned: {alignItems: 'flex-end',},
    nameText: {fontSize: width >= TABLET_WIDTH ? responsiveFontSize(1.3) : responsiveFontSize(1.8),fontWeight:'bold',textAlign: 'center',fontFamily:Font.bold},
    pointsText: {fontSize: width >= TABLET_WIDTH ?  responsiveFontSize(0.89): responsiveFontSize(1.2) ,color:"#000", fontFamily:Font.bold},
    ss: {backgroundColor: 'rgba(211, 211, 211, 0.2)',backgroundSize: '100% 100%',width: width >= TABLET_WIDTH ? responsiveWidth(80) : responsiveWidth(72) ,height: width >= TABLET_WIDTH ? responsiveHeight(72) : responsiveHeight(77) ,marginTop: responsiveHeight(9.16),marginBottom: responsiveHeight(10.7),marginRight: responsiveHeight(9.55),marginLeft: responsiveHeight(9.56),},
    QuestionContainer:{marginTop:responsiveHeight(3),flexDirection:'column'},
    QuestionText:{fontFamily:Font.bold,justifyContent:'center', alignSelf:'center',alignItems:'center'},
    Coine:{width: width >= TABLET_WIDTH ? responsiveWidth(4): responsiveWidth(2.5), height:width >= TABLET_WIDTH ? responsiveHeight(5.5) : responsiveHeight(6),position:'absolute',bottom:width >= TABLET_WIDTH ? responsiveWidth(0.2) : responsiveWidth(0) }
}
)
export default QuestionPageStyle