import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Font } from '../../../../assets/fonts/Fonts';
import QuestionPageStyle from '../page/QuestionPageStyle';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import database from '@react-native-firebase/database';
import { storageHandler } from '../../utils/helpers/Helpers';

const Answers = ({ roomCode, gameRole, Choices, correctIrab }) => {
  const [id, setID] = useState(null);
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  useEffect(() => {
    const loadPlayerId = async () => {
      const playerId = await storageHandler('get', 'playerID');
      if (playerId) {
        setID(playerId);
      }
    };
    loadPlayerId();
  }, []);

  useEffect(()=>{
    setChoices(Choices)
  },[Choices])

  const { width } = Dimensions.get('window');
  const TABLET_WIDTH = 968;

  const handleChoiceSelection = async (choices, index) => {
    if (isAnswered) return; // Prevent multiple selections
    
    setSelectedChoice(index);
    setIsAnswered(true);

    const isCorrect = choices === correctIrab;
    
    try {
      const roomRef = database().ref(`/rooms/${roomCode}`);
      const snapshot = await roomRef.once('value');
      const roomData = snapshot.val();

      if (!roomData) return;

      // Prepare updates object
      const updates = {
        role: gameRole === "question" ? "selection" : "question",
        lastAnswer: {
          choices: choices,
          isCorrect: isCorrect,
          playerId: id,
         
        }
      };

      // Update score if correct
      if (isCorrect) {
        if (roomData.player1.uid === id) {
          updates['player1/score'] = (parseInt(roomData.player1.score) || 0) + 1;
        } else if (roomData.player2.uid === id) {
          updates['player2/score'] = (parseInt(roomData.player2.score) || 0) + 1;
        }
      }
      else{
        if (roomData.player1.uid === id) {
          updates['player1/score'] = (parseInt(roomData.player1.score) || 0) - 1;
        } else if (roomData.player2.uid === id) {
          updates['player2/score'] = (parseInt(roomData.player2.score) || 0) - 1;
        }
      }

      await roomRef.update(updates);
      // Show feedback to player
      Alert.alert(
        isCorrect ? "إجابة صحيحة! 🎉" : "إجابة خاطئة",
        isCorrect 
          ? "أحسنت! لقد اخترت الإجابة الصحيحة"
          : `للأسف إجابة غير صحيحة. الإجابة الصحيحة هي: ${correctIrab}`,
        [{ text: "حسناً", onPress: () =>  updateScoreAndSwitchTurnAnswere() }]
      );

    } catch (error) {
      console.error('Error handling choice selection:', error);
      Alert.alert("خطأ", "حدث خطأ أثناء معالجة إجابتك");
    }
  };

  const updateScoreAndSwitchTurnAnswere = async () => {
    try {
      const roomRef = database().ref(`/rooms/${roomCode}`);
      const snapshot = await roomRef.once('value');
      const roomData = snapshot.val();

      if (roomData) {
        const updates = {
          role: gameRole === "question" ? "selection" : "question",
          // Clear the previous game data
          choices: null,
          trimmedSentence: null,
          randomWord: null,
          correct_iraap: null
        };

        await roomRef.update(updates);
      }
    } catch (error) {
      console.error('Error updating game state:', error);
    }
  };

  // Helper function to get style based on selection state
  const getChoiceStyle = (index) => {
    if (!isAnswered) return QuestionPageStyle.scoreBox;
    
    const baseStyle = [
      QuestionPageStyle.scoreBox,
      {
        alignItems: 'center',
        borderRadius: responsiveWidth(1),
        width: width >= TABLET_WIDTH ? responsiveWidth(36) : responsiveWidth(30),
        height: width >= TABLET_WIDTH ? responsiveWidth(7) : responsiveWidth(6)
      }
    ];

    if (choices[index] === correctIrab) {
      baseStyle.push({ backgroundColor: '#4CAF50' }); // Green for correct answer
    } else if (selectedChoice === index) {
      baseStyle.push({ backgroundColor: '#F44336' }); // Red for wrong selection
    }

    return baseStyle;
  };

  return (
    <View style={{ gap: responsiveFontSize(1), marginTop: responsiveHeight(3) }}>
      <View style={{ flexDirection: 'row', gap: 20 }}>
        
        <TouchableOpacity 
          style={{ zIndex: 1000 }} 
          onPress={() => handleChoiceSelection(choices[0], 0)}
          disabled={isAnswered}>
          <View style={getChoiceStyle(0)}>
            <Text style={[
              QuestionPageStyle.pointsText,
              { 
                // padding: width >= TABLET_WIDTH ? 10 : 2,
                textAlign: 'center',
                color: isAnswered && (choices[0] === correctIrab || selectedChoice === 0) ? 'white' : 'black'
              }
            ]}>
              {choices[0]}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleChoiceSelection(choices[1], 1)}
          disabled={isAnswered}>
          <View style={getChoiceStyle(1)}>
            <Text style={[
              QuestionPageStyle.pointsText,
              {
                // padding: width >= TABLET_WIDTH ? 10 : 2,
                textAlign: 'center',
                color: isAnswered && (choices[1] === correctIrab || selectedChoice === 1) ? 'white' : 'black',
              }
            ]}>
              {choices[1]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 20 }}>
        <TouchableOpacity 
          onPress={() => handleChoiceSelection(choices[2], 2)}
          disabled={isAnswered}>
          <View style={getChoiceStyle(2)}>
            <Text style={[
              QuestionPageStyle.pointsText,
              {
                // padding: width >= TABLET_WIDTH ? 10 : 2,
                textAlign: 'center',
                color: isAnswered && (choices[2] === correctIrab || selectedChoice === 2) ? 'white' : 'black'
              }
            ]}>
              {choices[2]}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => handleChoiceSelection(choices[3], 3)}
          disabled={isAnswered}>
          <View style={getChoiceStyle(3)}>
            <Text style={[
              QuestionPageStyle.pointsText,
              {
                // padding: width >= TABLET_WIDTH ? 10 : 2,
                textAlign: 'center',
                color: isAnswered && (choices[3] === correctIrab || selectedChoice === 3) ? 'white' : 'black'
              }
            ]}>
              {choices[3]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Answers;