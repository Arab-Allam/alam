import React, { useState } from 'react';
import {Text, View, Dimensions, TouchableOpacity, Pressable, Alert} from 'react-native';
import Title from '../../component/Title';
import AuthBackground from '../../component/AuthBackground';
import MyTextinput from '../../../../component/MyTextinput';
import Styles from '../../component/Style';
import Mybutton from '../../../../component/MyButton';
import {responsiveFontSize,responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import { Font } from '../../../../../assets/fonts/Fonts';
import Images from '../../../../component/Images';
import { useNavigation } from '@react-navigation/native';
import Signup from '../../signup/Signup';
import axios from 'axios';

const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968; 

const signinUser = async (email, password) => {
  try {
    const response = await axios.post('https://your-api-url.com/signin', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};

const Signin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    try {
      const result = await signinUser(email, password);
      Alert.alert('Success', 'Signin successful!');
      navigation.navigate('TypeOfGame');
    } catch (error) {
      Alert.alert('Error', 'Signin failed. Please try again.');
    }
  };

  return (
    <View style={Styles.container}>
      <AuthBackground style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <View
            style={{alignItems: 'center', flex: 1, justifyContent: 'center',fontFamily:Font.bold,}}>
            <Title
              text="تسجيل دخول"
              textStyle={{fontSize: responsiveFontSize(3),color:"#8AC9FF"}}
            />
          </View>
          <View style={{ alignItems: 'center', flex: 1, justifyContent:'flex-start'}}>
            <MyTextinput
              label="الإيميل"
              placeholder="Email@gmail.com"
              keyboardType="email-address"
              labelSyle={{alignSelf: 'flex-start',fontSize: responsiveFontSize(1.7),color:'#F39E09'}}
              styleTextInput={{height:responsiveWidth(4),fontSize:responsiveFontSize(1.5)}}
              onChangeText={setEmail}
              value={email}
            />
            <MyTextinput
              label="كلمة المرور"
              placeholder="**********"
              keyboardType="default"
              isSecire
              labelSyle={{alignSelf: 'flex-start',fontSize: responsiveFontSize(1.7),color:'#F39E09',backgroundColor:"white",zIndex:10}}
              styleTextInput={{height:responsiveWidth(4),fontSize:responsiveFontSize(1.5)}}
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <View style={{ alignItems: 'center', flex: 1, justifyContent:'flex-end'}}>
          <Mybutton ButtonName="تسجيل الدخول" op={handleSignin}/>
        </View>
        <TouchableOpacity style={{alignSelf:'center',justifyContent:'center', zIndex:10}} onPress={()=> navigation.navigate('Signup')}>
              <Text style={{ color: '#8AC9FF', fontSize: responsiveFontSize(1.5), textDecorationLine: 'underline' }}>
                إنشاء حساب
              </Text>
            </TouchableOpacity>
        </View>
      </AuthBackground>
      <View>
      <Images imageURL={require('../../../../../assets/images/BigBoy.png')} imageStyle={{width: width >= TABLET_WIDTH ? responsiveWidth(60) : responsiveWidth(53) ,height: width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(42) ,marginTop: width >= TABLET_WIDTH ? responsiveWidth(20):responsiveWidth(8), alignSelf:'flex-end'}}/>
      </View>
    </View>
  );
};

export default Signin;