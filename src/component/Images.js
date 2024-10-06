import React from "react";
import { View,Image, SafeAreaView } from "react-native";


const Images = ({ imageURL, imageStyle, localSource }) => {
    let imageSource;
    
    if (localSource) {
        imageSource = localSource;
    } else if (typeof imageURL === 'string') {
        imageSource = { uri: imageURL };
    } else {
        imageSource = imageURL;
    }

    return (
        <View style={{flex:1}}>
            <Image source={imageSource} style={imageStyle} />
        </View>
    );
};
export default Images;
