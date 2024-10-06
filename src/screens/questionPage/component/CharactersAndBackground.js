import React from 'react';
import {View,Text} from 'react-native';
import Images from '../../../component/Images';
import QuestionPageStyle from '../page/QuestionPageStyle';
import PlayerInfoRectangle from './PlayerInfoRectangle';
import Question from './Question';
const CharactersAndBackground = () => {
  return (
    <View>
      <Images imageStyle={QuestionPageStyle.bgImage} localSource={require('../../../../assets/images/QuestionBg.png')}/>
      <View style={{alignItems:'center'}}>
      <Images imageStyle={QuestionPageStyle.ss} localSource={require('../../../../assets/images/sss.png')}/>
        <PlayerInfoRectangle />
        <Question/>
      </View>
    </View>
  );
};
export default CharactersAndBackground;
