import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Font} from '../../../../assets/fonts/Fonts';
import QuestionPageStyle from '../page/QuestionPageStyle';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const Answers = () => {
  const {width} = Dimensions.get('window');
  const TABLET_WIDTH = 968;

  return (
    <View style={[QuestionPageStyle.PlayerInfoContainer,{flexDirection:'column',alignItems:'center',gap:width >= TABLET_WIDTH ? 20 : 10}]}>
  
      <View style={{flexDirection: 'row',gap:20}}>
      <TouchableOpacity>
        <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1)}]}>
          <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2}]}>مجموع النقاط</Text>
        </View>
        </TouchableOpacity> 

<TouchableOpacity>
        <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1)}]}>
          <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2}]}>مجموع النقاط</Text>
        </View>
        </TouchableOpacity> 
      </View>



      <View style={{flexDirection: 'row',gap:20}}>
      <TouchableOpacity>
      <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1),}]}>
      <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2}]}>مجموع النقاط</Text>
      </View>
      </TouchableOpacity> 

      <TouchableOpacity>

      <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1)}]}>
      <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2}]}>مجموع النقاط</Text>
      </View>
      </TouchableOpacity> 
    </View>

    </View>
  );
};
export default Answers;
