import React from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Title from '../component/Title';
import AuthBackground from '../component/AuthBackground';
import MyTextinput from '../../../component/MyTextinput';
import Styles from '../component/Style';
import Mybutton from '../../../component/MyButton';
import {responsiveFontSize,responsiveHeight,responsiveWidth,} from 'react-native-responsive-dimensions';
import {Font} from '../../../../assets/fonts/Fonts';
import Images from '../../../component/Images';
import { useNavigation } from '@react-navigation/native';
const {width} = Dimensions.get('window');
const TABLET_WIDTH = 968;
const Signup = () => {
    const navigation = useNavigation();

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
              text="تسجيل دخول"
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
              labelSyle={{
                alignSelf: 'flex-end',
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
              labelSyle={{
                alignSelf: 'flex-end',
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
              labelSyle={{
                alignSelf: 'flex-end',
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
              gap: 10,
            }}>
            <View
              style={{
                alignContent: 'flex-end',
                alignSelf: 'flex-end',
                marginTop:
                  width >= TABLET_WIDTH
                    ? responsiveWidth(14)
                    : responsiveWidth(14),
                gap: 5,
              }}>
              <Mybutton ButtonName="تسجيل الدخول" />


              <TouchableOpacity onPress={()=> navigation.navigate('Signin') } style={{flexDirection: 'column', alignSelf: 'center'}}>
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
              width >= TABLET_WIDTH ? responsiveWidth(20) : responsiveWidth(8),
            alignSelf: 'flex-end',
          }}
        />
      </View>
    </View>
  );
};

export default Signup;
