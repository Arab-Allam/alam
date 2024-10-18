import React from "react";
import { View, Text } from "react-native";
const AnswerWord = ({ route })=>{
    const { words } = route.params;
   
  return (
    <View>
      <Text>Words Passed to this Page:</Text>
      {words.map((word, index) => (
        <Text key={index}>{word}</Text>
      ))}
    </View>
  );
};

export default AnswerWord;