// import React from 'react';
// import {View,Text} from 'react-native';
// import Images from '../../../component/Images';
// import QuestionPageStyle from '../page/QuestionPageStyle';
// import PlayerInfoRectangle from './PlayerInfoRectangle';
// import Question from './Question';
// import Answers from "./Answers";
// import { useState } from 'react';

// const CharactersAndBackground = () => {
//   const[isMyTurn, setIsMyTurn]= useState("");
//   return (
//     <View>
//       <Images imageStyle={QuestionPageStyle.bgImage} localSource={require('../../../../assets/images/QuestionBg.png')}/>
//       <View style={{alignItems:'center'}}>
//       <Images imageStyle={QuestionPageStyle.ss} localSource={require('../../../../assets/images/sss.png')}/>
//         <PlayerInfoRectangle />
//         <Question/>
//         <Answers/>

//       </View>
//     </View>
//   );
// };
// export default CharactersAndBackground;

import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Images from '../../../component/Images';
import QuestionPageStyle from '../page/QuestionPageStyle';
import PlayerInfoRectangle from './PlayerInfoRectangle';
import Question from './Question';
import Answers from './Answers';
import {
  responsiveScreenWidth,
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions'; // Ensure responsive dimensions library is imported
import {TextInput, Modal, Pressable} from 'react-native';
import {Font} from '../../../../assets/fonts/Fonts';
import Mybutton from '../../../component/MyButton';
import database from '@react-native-firebase/database';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';


const CharactersAndBackground = () => {
  const [isMyTurn, setIsMyTurn] = useState(false); // Initialize with true or false
  const [sentence, setSentence] = useState('');
  const [wordArray, setWordArray] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWordModalVisible, setIsWordModalVisible] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [wordInput, setWordInput] = useState('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [wordModalTimeLeft, setWordModalTimeLeft] = useState(20);
  const [apiResult, setApiResult] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [correct_iraap, setCorrect_iraap] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [result, setresult] = useState(false);
  const [GameState,setGameState] = useState(null);

  let timerId;
  const {width} = Dimensions.get('window');
  const TABLET_WIDTH = 968;


  const updateScoreAndSwitchTurn = async (roomCode, currentPlayerUid, newScore) => {
    const roomRef = database().ref(`/rooms/${roomCode}`);
    
    const snapshot = await roomRef.once('value');
    const roomData = snapshot.val();
    
    if (roomData) {
      if (roomData.player1.uid === currentPlayerUid) {
        // Update player1 score and switch turn to player2
        await roomRef.update({
          'player1/score': newScore,
          turn: 'player2'
        });
      } else if (roomData.player2.uid === currentPlayerUid) {
        // Update player2 score and switch turn to player1
        await roomRef.update({
          'player2/score': newScore,
          turn: 'player1'
        });
      }
    }
    };


const listenToRoomChanges = (roomCode) => {
  const roomRef = database().ref(`/rooms/${roomCode}`);
  
  roomRef.on('value', (snapshot) => {
    const roomData = snapshot.val();
    setGameState(roomData); // Update the state with the room data
    //otherPlayerCanplay
    //role

    if (roomData.player1.uid === "123456782" && roomData.turn === "player1" ){ //change id from locaStorage
      setIsMyTurn(false)
    }
    else{
      setIsMyTurn(true)
    }
  });
  };
  
  // To stop listening (when leaving the game or component unmounting):
  const stopListening = (roomCode) => {
  const roomRef = database().ref(`/rooms/${roomCode}`);
  roomRef.off(); // Detach the listener
  };
  
  useEffect(() => {
  

    listenToRoomChanges("HZB2VF")
   
  }, [GameState]);


  useEffect(() => {
    if (timeLeft > 0 && !isInputDisabled) {
      timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsInputDisabled(true);
      setIsTimeUp(true);
      setTimeout(() => {
        setIsModalVisible(true);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [timeLeft, isInputDisabled]);

  useEffect(() => {
    if (isWordModalVisible && wordModalTimeLeft > 0) {
      const wordTimerId = setTimeout(() => {
        setWordModalTimeLeft(wordModalTimeLeft - 1);
      }, 1000);

      return () => clearTimeout(wordTimerId);
    } else if (wordModalTimeLeft === 0) {
      setIsInputDisabled(true);
      setIsTimeUp(true);
      setTimeout(() => {
        setIsModalVisible(true);
      }, 1000);
      // setIsWordModalVisible(false);
      // setWordModalTimeLeft(20);
    }
  }, [isWordModalVisible, wordModalTimeLeft]);

  const handleSendSentence = async () => {
    const trimmedSentence = sentence.trim();
    const words = trimmedSentence.split(' ');
    setWordArray(words);

    console.log('Sending data to API:');
    console.log('Sentence:', trimmedSentence);
    console.log('Random Word:', randomWord);
    console.log("User's Irab:", wordInput);

    try {
      const response = await fetch('http://127.0.0.1:3000/run-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sentence: trimmedSentence,
          word: randomWord,
          irab: wordInput,
        }),
      });
      const data = await response.json();
      console.log(data);
      const analysis = data.analysis;

      let extractedFinalAnswer = null;
      let extractedCorrectIrab = null;
      setresult(data.result);
      if (analysis.includes('الإجابة النهائية')) {
        extractedFinalAnswer = analysis
          .split('الإجابة النهائية:')[1]
          .split('\n')[0]
          .trim();
        setAnswer(extractedFinalAnswer);
      }

      const correctIrabMatch = analysis.match(/- الإعراب الصحيح:\s*(.+)/);
      if (correctIrabMatch) {
        extractedCorrectIrab = correctIrabMatch[1].trim();
        setCorrect_iraap(extractedCorrectIrab);
        updateScoreAndSwitchTurn("HZB2VF","123456782","5")
      }
    } catch (error) {
      console.error('Error in handleSendSentence:', error);
    }
  };

  const handleButtonPress = () => {
    if (!isInputDisabled) {
      setIsInputDisabled(true);
      clearTimeout(timerId);
      handleSendSentence();
      showRandomWord();
    }
  };

  const showRandomWord = () => {
    if (sentence.trim()) {
      const words = sentence.split(' ');
      const randomIndex = Math.floor(Math.random() * words.length);
      setRandomWord(words[randomIndex]);
      setIsWordModalVisible(true);
      setWordModalTimeLeft(20);
    }
  };

  const handleWordSubmit = () => {
    console.log('User entered word:', wordInput);
    setIsWordModalVisible(false);
    handleSendSentence();
    setWordInput('');

    // Check if time is up
    if (isTimeUp) {
      // Show the result modal immediately if time is up
      setShowResultModal(true); // Or whatever you want to do
    } else {
      // Otherwise, show the result modal after a delay
      setTimeout(() => {
        setShowResultModal(true);
      }, 500);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsTimeUp(false);
  };
  return (
    <View>
      <Images
        imageStyle={QuestionPageStyle.bgImage}
        localSource={require('../../../../assets/images/QuestionBg.png')}
      />
      {isMyTurn ? (
        <>
          <View style={{alignItems: 'center'}}>
            <Images
              imageStyle={QuestionPageStyle.ss}
              localSource={require('../../../../assets/images/sss.png')}
            />
            <PlayerInfoRectangle />
            <Question />
            <Answers />
          </View>
        </>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'column',
              alignContent: 'center',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Images
              imageURL={require('../../../../assets/images/Group2.png')}
              imageStyle={{
                width: responsiveScreenWidth(82),
                height: responsiveHeight(72),
                alignSelf: 'center',
                borderRadius: responsiveFontSize(1.4),
                marginTop: responsiveHeight(10),
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                width: responsiveScreenWidth(77),
                height: responsiveHeight(65),
                borderRadius: responsiveFontSize(1.4),
                top: responsiveHeight(14),
              }}>
              <Text
                style={{
                  position: 'absolute',
                  top: responsiveHeight(5.7),
                  left: responsiveWidth(5),
                  fontSize: responsiveFontSize(1.6),
                  color: timeLeft <= 5 ? 'red' : 'black',
                  fontFamily: Font.bold,
                }}>
                {timeLeft}s
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  alignContent: 'flex-start',
                  alignSelf: 'flex-start',
                  marginVertical: responsiveHeight(5),
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontFamily: Font.bold,
                  }}>
                  يلا نلعب
                </Text>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1),
                    fontFamily: Font.bold,
                    color: '#5766CC',
                  }}>
                  إدخــل جــمـلـة مــفــيـدة وتـحــدى فـيــها الخـــــصم🤩✨
                </Text>

                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top:
                        width >= TABLET_WIDTH
                          ? responsiveHeight(5)
                          : responsiveHeight(1),
                      left: responsiveScreenWidth(2),
                      zIndex: 1,
                      borderRadius: responsiveFontSize(1),
                      backgroundColor: '#FFFFFF',
                      width:
                        width >= TABLET_WIDTH
                          ? responsiveHeight(16)
                          : responsiveHeight(16),
                      height: responsiveHeight(4.5),
                    }}>
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        color: '#6CBFF8',
                        textAlign: 'center',
                        fontSize: responsiveFontSize(1.3),
                        borderRadius: responsiveFontSize(3),
                        paddingHorizontal: responsiveWidth(1),
                        fontFamily: Font.bold,
                      }}>
                      أدخل الجملة
                    </Text>
                  </View>
                  <TextInput
                    style={{
                      backgroundColor: '#E7E7E7E5',
                      width: responsiveHeight(75),
                      height: responsiveHeight(15),
                      borderRadius: 40,
                      fontSize: responsiveFontSize(2),
                      paddingHorizontal: responsiveWidth(2),
                      textAlign: 'right',
                    }}
                    value={sentence}
                    onChangeText={setSentence}
                    placeholder="أدخل الجملة هنا"
                    editable={!isInputDisabled}
                  />
                  <View style={{paddingVertical: responsiveWidth(3),alignSelf:'center'}}>
                    <Mybutton
                      ButtonName="ارسال"
                      op={handleButtonPress}
                      disabled={isInputDisabled}
                    />
                  </View>
                </View>
              </View>
            </View>
            <Modal
              visible={isModalVisible && isTimeUp}
              supportedOrientations={['landscape']}
              transparent={true}
              animationType="fade">
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <View
                  style={{
                    width: responsiveWidth(70),
                    padding: responsiveWidth(5),
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      fontFamily: Font.bold,
                      marginBottom: 20,
                    }}>
                    انتهى الوقت ⏰ لقد خسرت نقطة
                  </Text>
                  <Pressable
                    onPress={closeModal}
                    style={{
                      backgroundColor: '#6CBFF8',
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontFamily: Font.bold,
                        color: '#fff',
                      }}>
                      موافق
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Modal
              visible={isWordModalVisible}
              supportedOrientations={['landscape']}
              transparent={true}
              animationType="fade">
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <View
                  style={{
                    width: responsiveWidth(70),
                    padding: responsiveWidth(5),
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      fontFamily: Font.bold,
                      marginBottom: 20,
                    }}>
                    أعرب كلمة : {randomWord}
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#E7E7E7E5',
                      width: responsiveHeight(75),
                      height: responsiveHeight(10),
                      borderRadius: 40,
                      fontSize: responsiveFontSize(2),
                      paddingHorizontal: responsiveWidth(2),
                      textAlign: 'right',
                      marginBottom: 20,
                    }}
                    value={wordInput}
                    onChangeText={setWordInput}
                    placeholder="اعرب الكلمة هنا"
                  />
                  <Text
                    style={{fontSize: responsiveFontSize(1), marginBottom: 10}}>
                    {wordModalTimeLeft}s left
                  </Text>
                  <Pressable
                    onPress={handleWordSubmit}
                    style={{
                      backgroundColor: '#DB6704',
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: Font.bold,
                        color: '#fff',
                      }}>
                      ارسل الكلمة
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            {/* make this apper  */}
            <Modal
              visible={isModalVisible && isTimeUp}
              supportedOrientations={['landscape']}
              transparent={true}
              animationType="fade">
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <View
                  style={{
                    width: responsiveWidth(70),
                    padding: responsiveWidth(5),
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      fontFamily: Font.bold,
                      marginBottom: 20,
                    }}>
                    انتهى الوقت ⏰ لقد خسرت نقطة
                  </Text>
                  <Pressable
                    onPress={closeModal}
                    style={{
                      backgroundColor: '#6CBFF8',
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(2),
                        fontFamily: Font.bold,
                        color: '#fff',
                      }}>
                      موافق
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <Modal
              visible={showResultModal}
              supportedOrientations={['landscape']}
              transparent={true}
              animationType="fade">
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <View
                  style={{
                    width: responsiveWidth(80),
                    padding: responsiveWidth(5),
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      fontFamily: Font.bold,
                      marginBottom: 20,
                    }}>
                    نتيجة التحليل
                  </Text>
                  <Text style={{fontSize:responsiveFontSize(1.5)}}>الإعراب الصحيح: {correct_iraap}</Text>
                  <Text style={{fontSize:responsiveFontSize(1.5)}}>الإجابة النهائية: {answer}</Text>
                  {/* <Text>{result}</Text> */}
                  <Pressable
                    onPress={() => setShowResultModal(false)}
                    style={{
                      backgroundColor: '#6CBFF8',
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.2),
                        fontFamily: Font.bold,
                        color: '#fff',
                      }}>
                      إغلاق
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </View>
  );
};

export default CharactersAndBackground;
