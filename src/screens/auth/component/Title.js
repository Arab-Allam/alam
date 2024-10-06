import React from "react";
import { Text, View } from "react-native";
const Title = ({text,textStyle})=>{

    return(
<View>
    <Text style={textStyle}>{text}</Text>
</View>
    )
}
export default Title;