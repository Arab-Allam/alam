import React, {useState} from 'react';
import {Text, View, Dimensions, TouchableOpacity, Alert} from 'react-native';
import Title from '../component/Title';
import AuthBackground from '../component/AuthBackground';
import MyTextinput from '../../../component/MyTextinput';
import Styles from '../component/Style';
import Mybutton from '../../../component/MyButton';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Font} from '../../../../assets/fonts/Fonts';
import Images from '../../../component/Images';
import {useNavigation} from '@react-navigation/native';
import firestore from '../../../../firebase';
const {width} = Dimensions.get('window');
const TABLET_WIDTH = 968;

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    try {
      const userRef = firestore.collection('users').doc();
      await userRef.set({
        uid: userRef.id,
        name: name,
        email: email,
        password: password, // Never store plain passwords in a real app
      });
      console.log('User registered!');
    } catch (error) {
      console.error('Error registering user: ', error);
    }
  };

  return (
    <View style={Styles.container}>
      <AuthBackground style={{flex: 1}}>
        <View
          style={{alignItems: 'center', flex: 1, justifyContent: 'flex-start'}}>
          <View
            style={{
              justifyContent: 'flex-start',
              marginTop: responsiveHeight(3),
            }}>
            <Title
              text="انشاء حساب"
              textStyle={{
                fontSize: responsiveFontSize(3),
                color: '#8AC9FF',
                fontFamily: Font.bold,
              }}
            />
          </View>

          <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <View>
              <MyTextinput
                Value={name}
                onChangeText={setName}
                label="الاسم"
                placeholder="الاسم"
                keyboardType="default"
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
                Value={email}
                onChangeText={setEmail}
                label="الإيميل"
                placeholder="Email@gmail.com"
                keyboardType="email-address"
                labelSyle={{
                  alignSelf: 'flex-start',
                  fontSize: responsiveFontSize(1.2),
                  color: '#F39E09',
                  fontFamily: Font.bold,
                  zIndex: 10,
                }}
                styleTextInput={{
                  height: responsiveWidth(4),
                  fontSize: responsiveFontSize(1),
                  fontFamily: Font.bold,
                }}
              />

              <MyTextinput
                Value={password}
                onChangeText={setPassword}
                label="كلمة المرور"
                placeholder="**********"
                keyboardType="default"
                isSecure={true}
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
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                alignContent: 'flex-end',
                alignSelf: 'flex-end',
                marginTop: responsiveWidth(2),
              }}>
              <Mybutton ButtonName="تسجيل" op={() => registerUser()} />

              <TouchableOpacity
                onPress={() => navigation.navigate('Signin')}
                style={{flexDirection: 'column', alignSelf: 'center'}}>
                <Text
                  style={{
                    color: '#8AC9FF',
                    fontSize: responsiveFontSize(1),
                    textDecorationLine: 'underline',
                    fontFamily: Font.bold,
                    marginTop: 10,
                  }}>
                  لديك حساب؟ قم بتسجيل الدخول
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
              width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(53),
            height:
              width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(45),
            marginTop:
              width >= TABLET_WIDTH ? responsiveWidth(20) : responsiveWidth(4),
            alignSelf: 'flex-start',
          }}
        />
      </View>
    </View>
  );
};

export default Signup;
