import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Styles from '../screens/auth/component/Style';

const MyTextinput = ({ 
  label, 
  placeholder, 
  isSecire, 
  styleTextInput, 
  labelSyle, 
  Value,
  onChangeText, // Add this prop
  keyboardType = 'default' // Add this prop with default value
}) => {
  return (
    <View style={Styles.containerTextinput}>
      <Text style={labelSyle}>{label}</Text>
      <View style={Styles.inputContainer}>
        <TextInput
          style={styleTextInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          secureTextEntry={isSecire}
          value={Value}
          onChangeText={onChangeText} // Add this handler
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default MyTextinput;