import React, { useState } from "react";
import { Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, Dimensions, Modal, Alert } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Font } from "../../../assets/fonts/Fonts";
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageHandler } from "../utils/helpers/Helpers";

const EnterCode = () => {
  const { width } = Dimensions.get('window');
  const TABLET_WIDTH = 968;

  const [roomCode, setRoomCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState(''); // State to store generated code
  // const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const navigation = useNavigation();

  const createRoom = async () => {
    const id = await storageHandler("get", "playerID");
    const name = await storageHandler("get", "playerName");
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  
    try {
      await database()
        .ref(`rooms/${roomCode}`)
        .set({
          player1: {
            uid: id,
            name: name,
            score: 0,
          },
          turn: id,
          role: "question",
          


        });
      console.log("Room created successfully", roomCode);
      setGeneratedCode(roomCode); // Store the generated code in the state
      navigation.navigate("WaitingRoom", { roomCode });
      // setModalVisible(true); // Show the modal
      return roomCode;
    } catch (error) {
      console.error("Firebase set error:", error);
      throw error;
    }
  };

  const joinRoom = async (roomCode) => {
    const id = await storageHandler("get", "playerID");
    const name = await storageHandler("get", "playerName");
    const roomRef = database().ref(`/rooms/${roomCode}`);
  
    const snapshot = await roomRef.once('value');
    const roomData = snapshot.val();
  
    if (roomData) {
      console.log(roomData);
      if (!roomData.player2 || (roomData.player2.uid === id) || (roomData.player1.uid === id)) {
        if (!roomData.player2 && (roomData.player1.uid !== id)) {
          await roomRef.update({
            player2: {
              uid: id,
              name: name,
              score: 0,
            },
            inWaitngRoom:id
          });
        }
        return true; // Successfully joined
      } else {
        throw new Error('Room is full.');
      }
    } else {
      throw new Error('Room does not exist.');
    }
  };

  const handleJoinRoom = () => {
    joinRoom(roomCode)
      .then(success => {
        if (success) {
          console.log('Room joined successfully');
          navigation.navigate("QuestionPage", { roomCode }); // Navigate to QuestionPage on success
        }
      })
      .catch(error => console.error(error.message));
  };

  // const copyToClipboard = () => {
  //   Clipboard.setString(generatedCode);
  //   Alert.alert("Copied", "Room code copied to clipboard");
  // };

  return (
    <View>
      <Image source={require("../../../assets/images/inviteBg.png")} style={{ width: responsiveWidth(100), height: responsiveHeight(100), resizeMode: 'cover' }} />
      <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', flex: 1, position: 'absolute', width: responsiveWidth(100), height: responsiveHeight(100) }}>
        <Image source={require("../../../assets/images/inviteRec.png")} style={{ width: responsiveWidth(95), height: responsiveHeight(60), borderRadius: responsiveFontSize(1) }} />
        <View style={{ flexDirection: 'row', position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'column', alignSelf: 'center', flex: 1 }}>
            <View style={{
              backgroundColor: "#EEC06B",
              width: responsiveWidth(45),
              height: responsiveHeight(18),
              alignSelf: 'center',
              borderRadius: responsiveFontSize(1),
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
                onPress={handleJoinRoom}>
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
                  onChangeText={(val) => setRoomCode(val)}
                  maxLength={14}
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
                    fontFamily: Font.bold
                  }}
                />
              </View>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center', backgroundColor: "#6CBFF8", width: responsiveWidth(45), height: responsiveHeight(10), borderRadius: responsiveFontSize(1), marginTop: 1 }} onPress={() => createRoom()}>
              <Text style={{ textAlign: 'center', fontFamily: Font.bold, color: 'white', padding: responsiveFontSize(1.5), fontSize: responsiveFontSize(1.5) }}>دعوة صديق للانضمام باستخدام رمز</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for showing generated code
        <Modal
          supportedOrientations={['landscape']}

          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: responsiveWidth(70), backgroundColor: 'white', borderRadius: responsiveFontSize(1), padding: responsiveFontSize(2) }}>
              <Text style={{ fontSize: responsiveFontSize(2.5), fontFamily: Font.bold, textAlign: 'center' }}>
                كود الغرفه : {generatedCode}
              </Text>
              
              <TouchableOpacity
                onPress={copyToClipboard}
                style={{ backgroundColor: '#6CBFF8', padding: 10, borderRadius: 5, marginTop: 10 }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontFamily: Font.bold , fontSize: responsiveFontSize(1.5)}}>نسخ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ backgroundColor: '#EAA830', padding: 10, borderRadius: 5, marginTop: 10 }}
              >
                <Text style={{ color: 'white', textAlign: 'center', fontFamily: Font.bold , fontSize: responsiveFontSize(1.5)}}>اغلاق</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}

      </View>
    </View>
  );
};

export default EnterCode;
