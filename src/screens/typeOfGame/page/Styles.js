import { ImageBackground, StyleSheet, Dimensions } from "react-native";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";
import { Platform } from "react-native";
import { Font } from "../../../../assets/fonts/Fonts";
const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968; 

const Styles = StyleSheet.create({
container: {flex: 1},
bgImage:{ width: width >= TABLET_WIDTH ? responsiveWidth(100) : responsiveWidth(100), height:width >= TABLET_WIDTH ? responsiveHeight(100) : responsiveHeight(100),zIndex:-2},
GirlStyle:{position:'absolute',width: width >= TABLET_WIDTH ? responsiveWidth(34) : responsiveWidth(29), height: width >= TABLET_WIDTH ? responsiveHeight(52.5) : responsiveHeight(62), marginTop: width >= TABLET_WIDTH ? responsiveHeight(45) : responsiveHeight(32),zIndex:99999, alignSelf:'flex-end'},
BoyStyle:{position:'absolute',width: width >= TABLET_WIDTH ? responsiveWidth(40) : responsiveWidth(29), height: width >= TABLET_WIDTH ? responsiveWidth(37) : responsiveHeight(63), marginTop: width >= TABLET_WIDTH ? responsiveHeight(45) : responsiveHeight(31),zIndex:9999, alignSelf:'flex-start', },
ChooseTypeOfGameContainer:{display:'flex',justifyContent:'space-between', flexDirection:'row', gap:50, marginTop:width >= TABLET_WIDTH ? responsiveHeight(9) : responsiveHeight(5)},
PlayWithAFriend:{width: width >= TABLET_WIDTH ? responsiveWidth(8) : responsiveWidth(6.3), height: width >= TABLET_WIDTH ? responsiveHeight(12.5) : responsiveHeight(13),alignSelf:'center', marginTop:responsiveHeight(3)},
rectangleContainer: {alignSelf: 'center', alignItems:'center'}, 
TextStyle:{fontSize:width >= TABLET_WIDTH ? responsiveFontSize(3.5) : responsiveFontSize(5),fontFamily:Font.bold ,color:'#1E093C',fontWeight: Platform.OS != 'ios' ? '' : '500'},
ss: {backgroundColor: 'rgba(211, 211, 211, 0.1)',backgroundImage: 'url("../../../../assets/images/sss.png")',backgroundSize: '100% 100%',width: width >= TABLET_WIDTH ? responsiveWidth(80) : responsiveWidth(72) ,height: width >= TABLET_WIDTH ? responsiveHeight(72) : responsiveHeight(77) ,marginTop: responsiveHeight(9.16),marginBottom: responsiveHeight(10.7),marginRight: responsiveHeight(9.55),marginLeft: responsiveHeight(9.56),},
rightImage:{backgroundColor:'white',width: width >= TABLET_WIDTH ? responsiveWidth(20):responsiveWidth(15),height:  width >= TABLET_WIDTH ?  responsiveHeight(26) : responsiveHeight(28),borderRadius: width >= TABLET_WIDTH ? 20 : 12, marginTop: width >= TABLET_WIDTH ? responsiveHeight(42) : responsiveHeight(50), alignItems:'center'},
});
export default Styles;