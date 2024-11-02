import React from 'react';
import {View,Dimensions} from 'react-native';
import Images from '../../../component/Images';
import Styles from './Style';
import { responsiveWidth } from 'react-native-responsive-dimensions';
const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968; 
const AuthBackground = ({children}) => {
  return (
    <View >
      <Images 
        imageStyle={Styles.bgImage} 
        localSource={require('../../../../assets/images/pikaso.png')}
      />
<View style={{ flex: 1, alignItems: 'center', paddingTop: width >= TABLET_WIDTH ? responsiveWidth(7) : responsiveWidth(2) }}>
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Images imageStyle={Styles.ss} localSource={require('../../../../assets/images/sss.png')}/>
  </View>
</View>
      <View style={Styles.authContainer}>
        {children}
      </View>
    </View>
  );
};

export default AuthBackground;