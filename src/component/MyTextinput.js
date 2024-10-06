import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Styles from '../screens/auth/component/Style';
const MyTextinput = ({ label, placeholder, isSecire , styleTextInput,labelSyle}) => {
  return (
    <View style={Styles.containerTextinput}>
      <Text style={labelSyle}>{label}</Text>
      <View style={Styles.inputContainer}>
        <TextInput
          style={styleTextInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={isSecire}
        />
      </View>
    </View>
  );
};


export default MyTextinput;