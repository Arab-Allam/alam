import React from "react";
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Images from "../../../component/Images";
import QuestionPageStyle from "../page/QuestionPageStyle";

const PlayerInfoRectangle = ({player1Name,player1Coine,player2Name,player2Coine}) => {
  const { width } = Dimensions.get('window');
  const TABLET_WIDTH = 968;

  return (
    
    <View style={QuestionPageStyle.PlayerInfoContainer}>
      {/* player1 */}
      <View style={QuestionPageStyle.playerSection}>
        <View style={QuestionPageStyle.scoreBox}>
          <Text style={QuestionPageStyle.nameText}>أميرة</Text>
          <View style={{flexDirection:'row',height:responsiveHeight(4.5)}}>
          <Text style={[QuestionPageStyle.pointsText,]}> مجموع النقاط :</Text>
          <View style={{flex:1,alignItems:'flex-end',flexDirection:'row',bottom:responsiveHeight(0.5)}}>
          <Text style={[QuestionPageStyle.pointsText,{fontSize:responsiveFontSize(2), color:"#5766CC",fontWeight:'800', bottom: width >= TABLET_WIDTH ? responsiveHeight(1): responsiveHeight(0.5),left:responsiveWidth(0.2)}]}> 10   </Text>
          <Images localSource={require('../../../../assets/images/Coine.png')} imageStyle={[QuestionPageStyle.Coine,{bottom: width >= TABLET_WIDTH ? responsiveHeight(0): responsiveHeight(0)}]}/>
          </View>
          </View>
        </View>
      </View>

      {/* player2 */}
      <View style={QuestionPageStyle.playerSection}>
        <View style={[QuestionPageStyle.scoreBox, QuestionPageStyle.rightAligned]}>
          <Text style={QuestionPageStyle.nameText}>أحمد</Text>
          <View style={{flexDirection:'row-reverse',height:responsiveHeight(4.5)}}>
          <Text style={[QuestionPageStyle.pointsText,]}>: مجموع النقاط </Text>
          <View style={{flex:1,alignItems:'flex-end',flexDirection:'row-reverse',bottom:responsiveHeight(0.5)}}>
          <Text style={[QuestionPageStyle.pointsText,{fontSize:responsiveFontSize(2), color:"#5766CC",fontWeight:'800', bottom: width >= TABLET_WIDTH ? responsiveHeight(1): responsiveHeight(0.5),left:responsiveWidth(0.2)}]}>  10</Text>
          <Images localSource={require('../../../../assets/images/Coine.png')} imageStyle={[QuestionPageStyle.Coine,{right: width >= TABLET_WIDTH ? responsiveWidth(0) : responsiveWidth(1),}]}/>
          </View>
          </View>
        </View>
      </View>

      
      </View>

  );
};


export default PlayerInfoRectangle;





// import React from "react";
// import { View, Text, StyleSheet } from 'react-native';
// import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
// import Images from "../../../component/Images";
// import QuestionPageStyle from "../page/QuestionPageStyle";

// const PlayerInfoRectangle = () => {
//   return (
//     <View style={styles.container}>
//       <Images 
//         imageStyle={[QuestionPageStyle.ss, styles.imageContainer]} 
//         localSource={require('../../../../assets/images/sss.png')}
//       >
//         <View style={[QuestionPageStyle.PlayerInfoContainer, styles.infoOverlay]}>
//           {/* player1 */}
//           <View style={QuestionPageStyle.playerSection}>
//             <View style={QuestionPageStyle.scoreBox}>
//               <Text style={QuestionPageStyle.nameText}>أميرة محمد</Text>
//               <Text style={QuestionPageStyle.pointsText}>مجموع النقاط</Text>
//             </View>
//           </View>

//           {/* player2 */}
//           <View style={QuestionPageStyle.playerSection}>
//             <View style={[QuestionPageStyle.scoreBox, QuestionPageStyle.rightAligned]}>
//               <Text style={QuestionPageStyle.nameText}>أحمد محمد</Text>
//               <Text style={QuestionPageStyle.pointsText}>مجموع النقاط</Text>
//             </View>
//           </View>
//         </View>
//       </Images>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//   },
//   imageContainer: {
//     width: '100%',
//     height: '100%',
//   },
//   infoOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });

// export default PlayerInfoRectangle;
