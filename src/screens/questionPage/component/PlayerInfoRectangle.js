import React from "react";
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Images from "../../../component/Images";
import QuestionPageStyle from "../page/QuestionPageStyle";

const PlayerInfoRectangle = () => {
  const { width } = Dimensions.get('window');
  const TABLET_WIDTH = 968;

  return (
    
    <View style={QuestionPageStyle.PlayerInfoContainer}>
      {/* player1 */}
      <View style={QuestionPageStyle.playerSection}>
        <View style={QuestionPageStyle.scoreBox}>
          <Text style={QuestionPageStyle.nameText}>أميرة محمد</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between',gap:50}}>
          <Text style={[QuestionPageStyle.pointsText,]}>مجموع النقاط</Text>
          <Text style={[QuestionPageStyle.pointsText,{fontSize:responsiveFontSize(2),position:'absolute',left: width >= TABLET_WIDTH ? responsiveWidth(19) : responsiveWidth(17) ,bottom: width >= TABLET_WIDTH ? responsiveHeight(0.7) : responsiveHeight(1.5), color:"#5766CC",fontWeight:'800'}]}>10</Text>
          <Images localSource={require('../../../../assets/images/Coine.png')} imageStyle={[QuestionPageStyle.Coine,{left:width >= TABLET_WIDTH ? responsiveWidth(12):responsiveWidth(6.5)}]}/>

          </View>
        </View>
      </View>

      {/* player2 */}
      <View style={QuestionPageStyle.playerSection}>
        <View style={[QuestionPageStyle.scoreBox, QuestionPageStyle.rightAligned]}>
          <Text style={QuestionPageStyle.nameText}>أحمد محمد</Text>
          <Text style={QuestionPageStyle.pointsText}>مجموع النقاط</Text>
          <Text style={[QuestionPageStyle.pointsText,{fontSize:responsiveFontSize(2),position:'absolute',right: width >= TABLET_WIDTH ? responsiveWidth(20) : responsiveWidth(17.5) ,bottom: width >= TABLET_WIDTH ? responsiveHeight(1.9) : responsiveHeight(3.5),color:"#5766CC",fontWeight:'800' }]}>10</Text>
          <Images localSource={require('../../../../assets/images/Coine.png')} imageStyle={QuestionPageStyle.Coine}/>
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
