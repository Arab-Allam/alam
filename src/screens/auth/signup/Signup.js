import React, { useState } from 'react';
import {Text, View, Dimensions, TouchableOpacity, Alert} from 'react-native';
import Title from '../component/Title';
import AuthBackground from '../component/AuthBackground';
import MyTextinput from '../../../component/MyTextinput';
import Styles from '../component/Style';
import Mybutton from '../../../component/MyButton';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Font} from '../../../../assets/fonts/Fonts';
import Images from '../../../component/Images';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const {width} = Dimensions.get('window');
const TABLET_WIDTH = 968;

const Signup = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        console.log('Signup button pressed');

        if (!name || !email || !password) {
            Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول');
            return;
        }
        try {
            // Create user with email and password (note: removed name from auth parameters)
            const userRe = await auth().createUserWithEmailAndPassword(email, password);
            const userId = userRe.user.uid;
         
            await firestore().collection('users').doc(userId).set({
              name: name,
              email: email,
              createdAt: firestore.FieldValue.serverTimestamp(),
            });

            Alert.alert('نجاح', 'تم إنشاء الحساب بنجاح!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Signin')
                }
            ]);
        } catch (error) {
            console.error('Signup error:', error);
            let errorMessage = 'حدث خطأ غير متوقع';

            switch (error.code) {
                case 'auth/weak-password':
                    errorMessage = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'البريد الإلكتروني مستخدم بالفعل';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'البريد الإلكتروني غير صالح';
                    break;
            }

            Alert.alert('خطأ', errorMessage);
        }
    };

    return (
        <View style={Styles.container}>
            <AuthBackground style={{flex: 1}}>
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-start' }}>
                    <View style={{ justifyContent: 'flex-start', marginTop: responsiveHeight(3) }}>
                        <Title 
                            text="انشاء حساب" 
                            textStyle={{
                                fontSize: responsiveFontSize(3),
                                color: '#8AC9FF',
                                fontFamily: Font.bold
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

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ alignContent: 'flex-end', alignSelf: 'flex-end', marginTop: responsiveWidth(2) }}>
                            <Mybutton ButtonName="تسجيل" op={()=>handleSignup()} />

                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Signin')}
                                style={{flexDirection: 'column', alignSelf: 'center'}}
                            >
                                <Text style={{
                                    color: '#8AC9FF',
                                    fontSize: responsiveFontSize(1),
                                    textDecorationLine: 'underline',
                                    fontFamily: Font.bold,
                                    marginTop: 10
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
                        width: width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(53),
                        height: width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(45),
                        marginTop: width >= TABLET_WIDTH ? responsiveWidth(20) : responsiveWidth(4),
                        alignSelf: 'flex-start'
                    }}
                />
            </View>
        </View>
    );
};

export default Signup;