import React from "react";
import { View } from "react-native";
import CharactersAndBackground from "../component/CharactersAndBackground";
import { useRoute } from '@react-navigation/native';

const QuestionPage = ()=>{
    const route = useRoute(); // Get the route object
    console.log(route);
    const { roomCode } = route.params; 
    return(
<View>
    <CharactersAndBackground roomCode={roomCode} />
</View>
    )
}
export default QuestionPage;