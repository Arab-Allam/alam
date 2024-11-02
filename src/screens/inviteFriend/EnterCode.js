import React, { useState } from "react";
import { Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View,Dimensions } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Font } from "../../../assets/fonts/Fonts";
import database from '@react-native-firebase/database';
const EnterCode = () =>{
  const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968;

const [rommCode, setrommCode] = useState('');


const joinRoom = async (roomCode, playerName, playerUid) => {
  const roomRef = database().ref(`/rooms/${roomCode}`);
  
  const snapshot = await roomRef.once('value');
  const roomData = snapshot.val(); //return data
  
  if (roomData) {
    if (!roomData.player2) {
      // Add player2 to the room
      await roomRef.update({
        player2: {
          uid: playerUid,
          name: playerName,
          score: 0,
        }
      });
      return true; // Successfully joined
    } else {
      throw new Error('Room is full.');
    }
  } else {
    throw new Error('Room does not exist.');
  }
  };
  



    return(





    <View>
        <Image source={require("../../../assets/images/inviteBg.png")} style={{width:responsiveWidth(100), height:responsiveHeight(100), resizeMode:'cover'}} />
        <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',alignSelf:'center',flex:1,position:'absolute',width:responsiveWidth(100),height:responsiveHeight(100)}}>
        <Image source={require("../../../assets/images/inviteRec.png")} style={{width:responsiveWidth(95), height:responsiveHeight(60),borderRadius:responsiveFontSize(1)}}/>
        <View style={{flexDirection:'row',position:'absolute',alignItems:'flex-end',alignContent:"flex-end",justifyContent:'flex-end',alignSelf:'flex-end'}}>
          <View style={{backgroundColor:'white', width:responsiveWidth(45),height:width >= TABLET_WIDTH ? responsiveFontSize(14) : responsiveFontSize(14) ,flexDirection:'row', alignSelf:'flex-start',right: responsiveWidth(5),justifyContent:'space-between',  borderRadius: responsiveFontSize(1),
}}>

        <View style={{backgroundColor:'white', alignSelf: 'flex-start',}}>
<Text style={{alignSelf:'center'}}>15</Text>
</View>
          </View>
<View style={{flexDirection:'column'}}>
 <View style={{
      backgroundColor: "#EEC06B",
      width: responsiveWidth(45),
      height: responsiveHeight(18),
      alignSelf: 'flex-end',
      borderRadius: responsiveFontSize(1),
      right: responsiveWidth(5),
    }}>
      <TouchableOpacity style={{
        backgroundColor: '#EAA830',
        borderRadius: responsiveFontSize(1.8),
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(12),
        height: responsiveHeight(9),
        marginTop: responsiveHeight(4.8),
        marginRight: responsiveWidth(3.6),
        zIndex: 10
      }}
      onPress={()=> joinRoom(rommCode,"f","111")}>
        <Text style={{
          fontSize: responsiveFontSize(1.7),
          fontFamily: 'Your-Bold-Font',
          color: "white"
        }}>انضم</Text>

      </TouchableOpacity>
      
      <View style={{
        position: 'absolute',
        alignSelf: 'center',
        top: responsiveHeight(4.8),
      }}>
        <TextInput
        onChangeText={(val)=> setrommCode(val)}
          maxLength={14} // Adjust this number based on your needs
          style={{
            backgroundColor: '#F1D7A7',
            width: responsiveWidth(38),
            height: responsiveHeight(9),
            textAlign: 'right',
            borderRadius: responsiveFontSize(2),
            borderColor: '#F9F9F96E',
            borderWidth: 1,
            paddingHorizontal: responsiveWidth(2),
            fontSize: responsiveFontSize(1.7),
            fontFamily:Font.bold
          }}
        />
      </View>
      </View>

        <TouchableOpacity style={{backgroundColor:"#6CBFF8",width:responsiveWidth(45),right:responsiveWidth(5), height:responsiveHeight(10),alignSelf:'flex-end',borderRadius:responsiveFontSize(1),marginTop:1}}>
            <Text style={{textAlign:'center',fontFamily:Font.bold,color:'white',padding:responsiveFontSize(1.5),fontSize:responsiveFontSize(1.5)}}>دعوة  صديق للانضمام باستخدام رمز</Text>
        </TouchableOpacity>
        </View>
        </View>

<View style={{backgroundColor:'white'}}>

</View>
</View>
        
    </View>
    )
}
export default EnterCode