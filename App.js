import React, { useState,useEffect, Suspense, startTransition } from "react";
import { SafeAreaView, Text, View, ActivityIndicator } from "react-native";
import TypeOfGame from "./src/screens/typeOfGame/page/TypeOfGame";
import MainStackes from "./src/screens/mainStack/page/MainStackes";
import firebase from '@react-native-firebase/app';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {I18nManager} from 'react-native';
import {
    getAllKeysAndValues,
    isAndroid,
    removeSpecificKeys,
    storageHandler,
    clearStorage,
  } from './src/screens/utils/helpers/Helpers';
  import auth from '@react-native-firebase/auth';


const App = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();


    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
      }

      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    
    

    const {i18n} = useTranslation();
    const language = i18n.language;
      clearStorage();
  removeSpecificKeys();
  getAllKeysAndValues();
  useEffect(() => {
    (async () => {
      const lang = await storageHandler('get', 'language');
      const appLanguage = lang || language;
      if (lang == null) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        startTransition(() => {
          i18n.changeLanguage('ar');
        });
        storageHandler('store', 'language', 'ar');
        if (isAndroid() && !I18nManager.isRTL) RNRestart.restart();
      } else {
        startTransition(() => {
          i18n.changeLanguage(appLanguage);
        });
      }
    })();
  }, []);
  useEffect(() => {
    I18nManager.allowRTL(language === 'ar');
    I18nManager.forceRTL(language === 'ar');
  }, [language]);


    useEffect(() => {
        console.log('Firebase config:', JSON.stringify(firebase.app().options));
      }, []);
      if (initializing) return null;
    //   if (!user) {
    //     return (
    //       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //         <Text>Loading...</Text> 
    //       </SafeAreaView>
    //     );
    //   }
    
      return (
        <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
          <MainStackes />
        </Suspense>
      );
    };
    
    export default App;