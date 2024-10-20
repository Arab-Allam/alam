import React, { useState } from 'react';
import {Text, View, Dimensions, TouchableOpacity, Alert} from 'react-native';
import Title from '../component/Title';
import AuthBackground from '../component/AuthBackground';
import MyTextinput from '../../../component/MyTextinput';
import Styles from '../component/Style';
import Mybutton from '../../../component/MyButton';
import {responsiveFontSize,responsiveHeight,responsiveWidth,} from 'react-native-responsive-dimensions';
import {Font} from '../../../../assets/fonts/Fonts';
import Images from '../../../component/Images';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const {width} = Dimensions.get('window');
const TABLET_WIDTH = 968;

const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post('https://your-api-url.com/signup', {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

const Signup = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
      try {
        const result = await signupUser(name, email, password);
        Alert.alert('Success', 'Signup successful!');
        navigation.navigate('TypeOfGame');

      } catch (error) {
        Alert.alert('Error', 'Signup failed. Please try again.');
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
            style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Title
              text="انشاء حساب"
              textStyle={{
                fontSize: responsiveFontSize(3),
                color: '#8AC9FF',
                fontFamily: Font.bold,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <MyTextinput
              label="الاسم "
              placeholder="الاسم"
              keyboardType="default"
              onChangeText={setName}
              value={name}
              labelSyle={{
                alignSelf: 'flex-start',
                fontSize: responsiveFontSize(1.2),
                color: '#F39E09',
                backgroundColor: 'white',
                zIndex: 10,
                fontFamily: Font.bold,
              }}
              styleTextInput={{
                height: responsiveWidth(4),
                fontSize: responsiveFontSize(1),
                fontFamily: Font.bold,
              }}
            />
            <MyTextinput
              label="الإيميل"
              placeholder="Email@gmail.com"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              labelSyle={{
                alignSelf: 'flex-start',
                fontSize: responsiveFontSize(1.2),
                color: '#F39E09',
                fontFamily: Font.bold,
              }}
              styleTextInput={{
                height: responsiveWidth(4),
                fontSize: responsiveFontSize(1),
                fontFamily: Font.bold,
              }}
            />
            <MyTextinput
              label="كلمة المرور"
              placeholder="**********"
              keyboardType="default"
              isSecire
              onChangeText={setPassword}
              value={password}
              labelSyle={{
                alignSelf: 'flex-start',
                fontSize: responsiveFontSize(1.2),
                color: '#F39E09',
                backgroundColor: 'white',
                zIndex: 10,
                fontFamily: Font.bold,
              }}
              styleTextInput={{
                height: responsiveWidth(4),
                fontSize: responsiveFontSize(1),
                fontFamily: Font.bold,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              flex: 2.5,
              justifyContent: 'center',
            }}>
            <View
              style={{
                marginTop:
                  width >= TABLET_WIDTH
                    ? responsiveWidth(14)
                    : responsiveWidth(14),
              }}>
              <Mybutton ButtonName="تسجيل الدخول" onPress={handleSignup} />


              <TouchableOpacity onPress={()=> navigation.navigate('Signin') } style={{flexDirection: 'column', alignSelf: 'center',}}>
                <Text
                  style={{
                    color: '#8AC9FF',
                    fontSize: responsiveFontSize(1),
                    textDecorationLine: 'underline',
                    fontFamily: Font.bold,
                    marginTop: 10,
                  }}>
                  ليس لديك حساب قم 
                  بتسجيل الدخول
                </Text>
                </TouchableOpacity>

            </View>
          </View>
        </View>
      </AuthBackground>
      <View>
        <Images
          imageURL={require('../../../../assets/images/BigGirl.png')}
          imageStyle={{
            width:
              width >= TABLET_WIDTH ? responsiveWidth(60) : responsiveWidth(53),
            height:
              width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(45),
            marginTop:
              width >= TABLET_WIDTH ? responsiveWidth(20) : responsiveWidth(4),
            alignSelf: '',
          }}
        />
      </View>
    </View>
  );
};

export default Signup;