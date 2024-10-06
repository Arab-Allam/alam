import React from "react";
import { SafeAreaView, View } from "react-native";
import Images from "../../../component/Images";
import Styles from "../../typeOfGame/page/Styles";
import RectangleContainer from "./RectangleContainer";
const CharactersAndBackground = ()=>{

    return(
        <View style={Styles.container}>

    <Images imageStyle={Styles.bgImage} localSource={require('../../../../assets/images/pikaso.png')}/>
    <RectangleContainer/>
    {/* <SafeAreaView style={{zIndex:100}}> */}
    <Images imageStyle={Styles.BoyStyle} localSource={require('../../../../assets/images/Boy.png')}/>
    <Images imageStyle={Styles.GirlStyle} localSource={require('../../../../assets/images/Girl.png')}/>
    {/* </SafeAreaView> */}

    </View>
    )
}
export default CharactersAndBackground;