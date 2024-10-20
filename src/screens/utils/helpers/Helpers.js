import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import RNRestart from 'react-native-restart';
import i18n from '../../../../i18n'
/**
 *
 * @param {"store" | "get"} operation
 * @param {string} key
 * @param {string} val
 */
const storageHandler = async (operation, key, val = '') => {
  switch (operation) {
    case 'store':
      await AsyncStorage.setItem(key, val);
      return;
    case 'get':
      return await AsyncStorage.getItem(key);
  }
};

const changeLanguage = async () => {
  try {
    const newLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    await storageHandler('store', 'language', newLanguage);
    i18n.changeLanguage(newLanguage);
    if (isAndroid()) RNRestart.restart();
  } catch (error) {
    console.log('🚀 ~ changeLanguage ~ error:', error);
  }
};

const isAndroid = () => {
  return Platform.OS === 'android';
};

const clearStorage = () => {
  AsyncStorage.clear();
};

const getAllKeysAndValues = async () => {
  try {
    // Get all keys
    const keys = await AsyncStorage.getAllKeys();
    console.log('All keys:', keys);

    // Get all key-value pairs
    const result = await AsyncStorage.multiGet(keys);
    console.log('All key-value pairs:', result);
  } catch (error) {
    console.error('Error fetching data from AsyncStorage', error);
  }
};

const removeSpecificKeys = async () => {
  try {
    await AsyncStorage.removeItem('type');
    await AsyncStorage.removeItem('token');
    console.log('Keys "type" and "token" removed');

    // Update state to reflect the changes
    getAllKeysAndValues();
  } catch (error) {
    console.error('Error removing keys from AsyncStorage', error);
  }
};


const detectTextDirection = text => {
  if (text == undefined) return;
  const ltrRegex = /[\u0041-\u007A\u0020-\u0040\u007B-\u00FF]/; // LTR characters range
  if (ltrRegex.test(text.replaceAll(' ', ''))) {
    return 'ltr';
  }
  return 'rtl';
};

export {storageHandler,changeLanguage,isAndroid,getAllKeysAndValues,clearStorage,removeSpecificKeys,detectTextDirection};


