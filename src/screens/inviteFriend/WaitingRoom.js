import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import Clipboard from '@react-native-clipboard/clipboard';

const WaitingRoom = ({route, navigation}) => {
  const {roomCode} = route.params;
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    const roomRef = database().ref(`rooms/${roomCode}`);

    // Set up a listener to check when player2 joins
    roomRef.on('value', snapshot => {
      const roomData = snapshot.val();
      if (roomData?.player2) {
        setIsWaiting(false); // player2 has joined, stop waiting
        navigation.navigate('QuestionPage', {roomCode}); // Navigate to game
      }
    });

    // Clean up the listener on component unmount
    return () => roomRef.off();
  }, [roomCode, navigation]);

  // Copy room code to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(roomCode);
    alert('Room code copied!');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
      }}>
      <View
        style={{
          width: '70%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
          كود الغرفه : {roomCode}
        </Text>

        <TouchableOpacity
          onPress={copyToClipboard}
          style={{
            backgroundColor: '#6CBFF8',
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            نسخ
          </Text>
        </TouchableOpacity>
      </View>

      {isWaiting ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Waiting for Player 2 to join...</Text>
        </>
      ) : (
        <Text>Player 2 has joined! Starting game...</Text>
      )}
    </View>
  );
};

export default WaitingRoom;
