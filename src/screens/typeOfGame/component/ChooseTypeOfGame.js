import React from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import Images from "../../../component/Images";
import Styles from "../page/Styles";
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

const { width } = Dimensions.get('window');
const TABLET_WIDTH = 968; 

const createRoom = async (playerName, playerUid) => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    try {
      await database()
        .ref(`rooms/${roomCode}`)
        .set({
          player1: {
            uid: playerUid,
            name: playerName,
            score: 0,
          },
          turn: 'player1'
        });
      
      return roomCode;
    } catch (error) {
    //   console.error("Firebase set error:", error);
      throw error;
    }
  };

const ChooseTypeOfGame = () => {
    const navigation = useNavigation();

    const handleCreateRoom = async () => {
        try {
            const roomCode = await createRoom("fadia", "123456782");
            console.log("Room created with code:", roomCode);
            // Navigate to the next screen or do something with the roomCode
        } catch (error) {
            console.error("Error creating room:", error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    return (
        <View style={Styles.ChooseTypeOfGameContainer}>
            <TouchableOpacity style={Styles.rightImage} onPress={() => navigation.navigate('PlayWithFriend')}>
                <Images imageStyle={Styles.PlayWithAFriend} localSource={require('../../../../assets/images/p1.png')} />
                <Text style={[Styles.TextStyle, {fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(3), color: "#CBA6FF"}]}>
                    ألعب مع صديق
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={Styles.rightImage} onPress={handleCreateRoom}>
                <Images imageStyle={Styles.PlayWithAFriend} localSource={require('../../../../assets/images/p2.png')} />
                <Text style={[Styles.TextStyle, {fontSize: responsiveFontSize(2), marginBottom: responsiveHeight(3), color: "#8AC9FF"}]}>
                    أبدأ الأن
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChooseTypeOfGame;