import React from 'react';
import {View,Text} from 'react-native';
import Images from './Images';
import QuestionPageStyle from '../screens/questionPage/page/QuestionPageStyle';

const QuestionBackground = ([children]) => {
  return (
    <View>
      <Images imageStyle={QuestionPageStyle.bgImage} localSource={require('../../assets/images/QuestionBg.png')}/>
      <View style={{alignItems:'center'}}>
      <Images imageStyle={QuestionPageStyle.ss} localSource={require('../../assets/images/sss.png')}/>
      {children}
      </View>
    </View>
  );
};
export default QuestionBackground;
