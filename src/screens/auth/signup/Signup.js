<<<<<<< HEAD
// import React, { useState } from 'react';
// import { Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
// import Title from '../component/Title';
// import AuthBackground from '../component/AuthBackground';
// import MyTextinput from '../../../component/MyTextinput';
// import Styles from '../component/Style';
// import Mybutton from '../../../component/MyButton';
// import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
// import { Font } from '../../../../assets/fonts/Fonts';
// import Images from '../../../component/Images';
// import { useNavigation } from '@react-navigation/native';
// import Signin from '../signin/page/Signin';
// const {width} = Dimensions.get('window');
// const TABLET_WIDTH = 968;
// const Signup = () => {
//     const navigation = useNavigation();


//     const handleSignup = async () => {
//       if (!name || !email || !password) {
//         Alert.alert('Please fill out all fields');
//         return;
//       }
  
//       try {
//         // Create the user with Firebase Authentication
//         const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//         const userId = userCredential.user.uid;
  
//         // Save user data in Firebase Realtime Database
//         await database().ref(`/users/${userId}`).set({
//           name,
//           email,
//           createdAt: database.ServerValue.TIMESTAMP,
//         });
  
//         Alert.alert('User account created & data saved successfully!');
//       } catch (error) {
//         if (error.code === 'auth/email-already-in-use') {
//           Alert.alert('That email address is already in use!');
//         } else if (error.code === 'auth/invalid-email') {
//           Alert.alert('That email address is invalid!');
//         } else {
//           Alert.alert('Error:', error.message);
//         }
//       }
//     };




//   return (
//     <View style={Styles.container}>
//       <AuthBackground style={{flex: 1}}>
//         <View
//           style={{
//             alignItems: 'center',
//             flex: 1,
//             justifyContent: 'flex-start',
//           }}>
//           <View
//             style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
//             <Title
//               text="اهلاً، انشئ حسابك"
//               textStyle={{
//                 fontSize: responsiveFontSize(3),
//                 color: '#8AC9FF',
//                 fontFamily: Font.bold,
//               }}
//             />
//           </View>
//           <View
//             style={{
//               alignItems: 'center',
//               flex: 1,
//               justifyContent: 'flex-start',
//             }}>
//             <MyTextinput
//               label="الاسم "
//               placeholder="الاسم"
//               keyboardType="default"
//               labelSyle={{
//                 alignSelf: 'flex-start',
//                 fontSize: responsiveFontSize(1.2),
//                 color: '#F39E09',
//                 backgroundColor: 'white',
//                 zIndex: 10,
//                 fontFamily: Font.bold,
//               }}
//               styleTextInput={{
//                 height: responsiveWidth(4),
//                 fontSize: responsiveFontSize(1),
//                 fontFamily: Font.bold,
//               }}
//             />
//             <MyTextinput
//               label="الإيميل"
//               placeholder="Email@gmail.com"
//               keyboardType="email-address"
//               labelSyle={{
//                 alignSelf: 'flex-start',
//                 fontSize: responsiveFontSize(1.2),
//                 color: '#F39E09',
//                 fontFamily: Font.bold,
//               }}
//               styleTextInput={{
//                 height: responsiveWidth(4),
//                 fontSize: responsiveFontSize(1),
//                 fontFamily: Font.bold,
//               }}
//             />
//             <MyTextinput
//               label="كلمة المرور"
//               placeholder="**********"
//               keyboardType="default"
//               isSecire
//               labelSyle={{
//                 alignSelf: 'flex-start',
//                 fontSize: responsiveFontSize(1.2),
//                 color: '#F39E09',
//                 backgroundColor: 'white',
//                 zIndex: 10,
//                 fontFamily: Font.bold,
//               }}
//               styleTextInput={{
//                 height: responsiveWidth(4),
//                 fontSize: responsiveFontSize(1),
//                 fontFamily: Font.bold,
//               }}
//             />
//           </View>
//           <View
//             style={{
//               alignItems: 'center',
//               flex: 2.5,
//               justifyContent: 'center',
//               gap: 5,
//             }}>
//             <View
//               style={{
//                 alignContent: 'flex-end',
//                 alignSelf: 'flex-end',
//                 marginTop:
//                   width >= TABLET_WIDTH
//                     ? responsiveWidth(14)
//                     : responsiveWidth(14),
//                 gap: 5,
//               }}>
//               <Mybutton ButtonName="انشاء الحساب" />


//               <TouchableOpacity onPress={()=> navigation.navigate('Signin') } style={{flexDirection: 'column', alignSelf: 'center',}}>
//                 <Text
//                   style={{
//                     color: '#8AC9FF',
//                     fontSize: responsiveFontSize(1),
//                     textDecorationLine: 'underline',
//                     fontFamily: Font.bold,
//                     marginTop: 10,
//                   }}>
//                   لدي حساب بالفعل
//                 </Text>
//               </TouchableOpacity>

//             </View>
//           </View>
//         </View>
//       </AuthBackground>
//       <View>
//         <Images
//           imageURL={require('../../../../assets/images/BigGirl.png')}
//           imageStyle={{
//             width:
//               width >= TABLET_WIDTH ? responsiveWidth(60) : responsiveWidth(53),
//             height:
//               width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(45),
//             marginTop:
//               width >= TABLET_WIDTH ? responsiveWidth(20) : responsiveWidth(4),
//             alignSelf: '',
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default Signup;




import React, { useState } from 'react';
import { Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
=======
import React, { useState } from 'react';
import {Text, View, Dimensions, TouchableOpacity, Alert} from 'react-native';
>>>>>>> 3af2a1e (,)
import Title from '../component/Title';
import AuthBackground from '../component/AuthBackground';
import MyTextinput from '../../../component/MyTextinput';
import Styles from '../component/Style';
import Mybutton from '../../../component/MyButton';
<<<<<<< HEAD
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Font } from '../../../../assets/fonts/Fonts';
import Images from '../../../component/Images';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968;

const Signup = () => {
  const [name, setName] = useState('name');
  const [email, setEmail] = useState('email');
  const [password, setPassword] = useState('password');
  const navigation = useNavigation();

  const handleSignup = async () => {
    console.log('Signup button pressed'); // Debugging line
  
    // if (!name || !email || !password) {
    //   Alert.alert('Please fill out all fields');
    //   return;
    // }
    console.log(password)
  
    try {
      // Create the user with Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const userId = userCredential.user.uid;
  
      // Save user data in Firebase Realtime Database
      await database().ref(`/users/${userId}`).set({
        name,
        email,
        createdAt: database.ServerValue.TIMESTAMP,
      });
  
      Alert.alert('User account created & data saved successfully!');
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        Alert.alert('Password must be at least 6 characters.');
      } else if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        Alert.alert('Error:', error.message);
      }
    }
  };
  

  return (
    <View style={Styles.container}>
      <AuthBackground style={{ flex: 1 }}>
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-start' }}>
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Title
              text="اهلاً، انشئ حسابك"
              textStyle={{
                fontSize: responsiveFontSize(3),
                color: '#8AC9FF',
                fontFamily: Font.bold,
              }}
            />
          </View>
          <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-start' }}>
            <MyTextinput
              label="الاسم "
              placeholder="الاسم"
              keyboardType="default"
              value={name}
              onChangeText={setName}
              labelStyle={{
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
              value={email}
              onChangeText={setEmail}
              labelStyle={{
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
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              labelStyle={{
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
          <View style={{ alignItems: 'center', flex: 2.5, justifyContent: 'center', gap: 5 }}>
            <View style={{ alignContent: 'flex-end', alignSelf: 'flex-end', marginTop: responsiveWidth(14), gap: 5 }}>
              <Mybutton ButtonName="انشاء الحساب" op={handleSignup} />
              <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={{ flexDirection: 'column', alignSelf: 'center' }}>
                <Text style={{ color: '#8AC9FF', fontSize: responsiveFontSize(1), textDecorationLine: 'underline', fontFamily: Font.bold, marginTop: 10 }}>
                  لدي حساب بالفعل
                </Text>
              </TouchableOpacity>
=======
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {Font} from '../../../../assets/fonts/Fonts';
import Images from '../../../component/Images';
import { useNavigation } from '@react-navigation/native';
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
            // uid: userRef.id,
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
                            <Mybutton ButtonName="تسجيل" op={()=>registerUser()} />

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

            {/* <View>
                <Images
                    imageURL={require('../../../../assets/images/BigGirl.png')}
                    imageStyle={{
                        width: width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(53),
                        height: width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(45),
                        marginTop: width >= TABLET_WIDTH ? responsiveWidth(20) : responsiveWidth(4),
                        alignSelf: 'flex-start'
                    }}
                />
            </View> */}
        </View>
<<<<<<< HEAD
      </AuthBackground>
      <View>
        <Images
          imageURL={require('../../../../assets/images/BigGirl.png')}
          imageStyle={{
            width: width >= TABLET_WIDTH ? responsiveWidth(60) : responsiveWidth(53),
            height: width >= TABLET_WIDTH ? responsiveWidth(50) : responsiveWidth(45),
            marginTop: width >= TABLET_WIDTH ? responsiveWidth(20) : responsiveWidth(4),
            alignSelf: '',
          }}
        />
      </View>
    </View>
  );
=======
    );
>>>>>>> 3af2a1e (,)
};

export default Signup;