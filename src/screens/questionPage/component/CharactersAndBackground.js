import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, TextInput, Modal, Pressable} from 'react-native';
import Images from '../../../component/Images';
import QuestionPageStyle from '../page/QuestionPageStyle';
import PlayerInfoRectangle from './PlayerInfoRectangle';
import Question from './Question';
import Answers from './Answers';
import {responsiveScreenWidth,responsiveHeight,responsiveFontSize,responsiveWidth} from 'react-native-responsive-dimensions';
import {Font} from '../../../../assets/fonts/Fonts';
import Mybutton from '../../../component/MyButton';
import database from '@react-native-firebase/database';
import {storageHandler} from '../../utils/helpers/Helpers';

const CharactersAndBackground = ({roomCode}) => {
  const [result, setresult] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(null);
  const [gameRole, setGameRole] = useState(null);
  const [sentence, setSentence] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWordModalVisible, setIsWordModalVisible] = useState(false);
  const [randomWord, setRandomWord] = useState('');
  const [wordInput, setWordInput] = useState('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [wordModalTimeLeft, setWordModalTimeLeft] = useState(20);
  const [answer, setAnswer] = useState(null);
  const [correct_iraap, setCorrect_iraap] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [GameState, setGameState] = useState(null);
  const [id, setID] = useState(null);
  const [Choices, setChoices] = useState([]);
  const [trimmedSentence, setTrimmedSentence] = useState([]);
  const [Player1, setPlayer1] = useState("");
  const [Player2, setPlayer2] = useState("");
  const [Player1Coine, setPlayer1Coine] = useState("");
  const [Player2Coine, setPlayer2Coine] = useState("");
  const [dots, setDots] = useState('');
  const {width} = Dimensions.get('window');
  const TABLET_WIDTH = 968;

  // Load player ID on mount
  useEffect(() => {
    const loadPlayerId = async () => {
      const playerId = await storageHandler('get', 'playerID');
      if (playerId) {
        setID(playerId);
      }
    };
    loadPlayerId();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);
  
  // Handle Firebase room listener
  useEffect(() => {
    let roomRef;
    let unsubscribe;
  
    const setupRoomListener = () => {
      if (roomCode) {
        roomRef = database().ref(`/rooms/${roomCode}`);
        unsubscribe = roomRef.on('value', snapshot => {
          const roomData = snapshot.val();
          if (roomData) {
            setGameState(roomData);
            setIsMyTurn(roomData.turn === id);
            setGameRole(roomData.role);
            setPlayer1(roomData.player1.name)
            setPlayer2(roomData.player2.name)
            setPlayer1Coine(roomData.player1.score)
            setPlayer2Coine(roomData.player2.score)
            // Also set choices when in selection mode
            if (roomData.randomWord) {
              setRandomWord(roomData.randomWord);
            }
            if (roomData.correct_iraap) {
              setCorrect_iraap(roomData.correct_iraap);
              setresult(roomData.result)
            }
            if(roomData.role === "selection") {
              setTrimmedSentence(roomData.trimmedSentence);
              setChoices(roomData.choices || []); // Preserve choices
            }
          }
        });
      }
    };
  
    setupRoomListener();
  
    return () => {
      if (unsubscribe && roomRef) {
        roomRef.off('value', unsubscribe);
      }
    };
  }, [roomCode, id]);

  // Handle main timer
  // useEffect(() => {
  //   let timerId;
  //   if (timeLeft > 0) {
  //     timerId = setTimeout(() => {
  //       setTimeLeft(prev => prev - 1);
  //     }, 1000);
  //   } else if (timeLeft === 0) {
  //     setIsTimeUp(true);
  //     setTimeout(() => {
  //       setIsModalVisible(true);
  //     }, 1000);
  //   }
  //   return () => {
  //     if (timerId) clearTimeout(timerId);
  //   };
  // }, [timeLeft]);

  // // Handle word modal timer
  // useEffect(() => {
  //   let wordTimerId;

  //   if (isWordModalVisible && wordModalTimeLeft > 0) {
  //     wordTimerId = setTimeout(() => {
  //       setWordModalTimeLeft(prev => prev - 1);
  //     }, 1000);
  //   } else if (wordModalTimeLeft === 0) {
  //     setIsTimeUp(true);
  //     setTimeout(() => {
  //       setIsModalVisible(true);
  //     }, 1000);
  //   }

  //   return () => {
  //     if (wordTimerId) clearTimeout(wordTimerId);
  //   };
  // }, [isWordModalVisible, wordModalTimeLeft]);


  const updateScoreAndSwitchTurn = async () => {
    try {
      const roomRef = database().ref(`/rooms/${roomCode}`);
      const snapshot = await roomRef.once('value');
      const roomData = snapshot.val();
  
      if (!roomData) return;
  
      // Get current values from the database
      const currentChoices = roomData.choices || [];
      const currentTrimmedSentence = roomData.trimmedSentence || '';
      const currentCorrectIraap = roomData.correctIrab

      const updates = {
        turn: roomData.player1.uid === id ? roomData.player2.uid : roomData.player1.uid,
        inWaitngRoom: id,
        role: gameRole === "selection" ? "question" : "selection",
      };
  
      // Always preserve choices and trimmedSentence regardless of role
      updates.choices = Choices.length > 0 ? Choices : currentChoices;
      updates.trimmedSentence = currentTrimmedSentence;
      updates.correct_iraap = currentCorrectIraap ;
  
      // Update the score based on the player's ID
      if (result === "0" && answer === "خاطئ")
      if (roomData.player1.uid === id) {
        updates['player1/score'] = Player1Coine - 1;
      } else if (roomData.player2.uid === id) {
        updates['player2/score'] = Player2Coine -1;
      }
      
      console.log('Updating room with:', updates); // Debug log
      
      // Apply the updates to Firebase using set instead of update to ensure all fields are preserved
      await roomRef.update(updates);
      
      // Reset local state
      setIsModalVisible(false);
      setShowResultModal(false);
      // setIsWordModellVisible(false);
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const handleButtonPress = () => {
    if (!sentence.trim()) return;
    showRandomWord();
  };

  const showRandomWord = () => {
    const words = sentence.trim().split(' ');
    const randomIndex = Math.floor(Math.random() * words.length);
    setRandomWord(words[randomIndex]);
    setIsWordModalVisible(true);
    // setWordModalTimeLeft(20);
  };

  const handleWordSubmit = () => {
    console.log('User entered word:', wordInput);
    setIsWordModalVisible(false);
    handleSendSentence();
    // setWordInput('');

    // Check if time is up
    // if (isTimeUp) {
    //   // Show the result modal immediately if time is up
    //   setShowResultModal(true); // Or whatever you want to do
    // } else {
    //   // Otherwise, show the result modal after a delay
    //   setTimeout(() => {
    //     setShowResultModal(true);
    //   }, 500);
    // }
  }
  const clearResults = () => {
    // setAnswer(null);
    setCorrect_iraap(null);
    // setresult(false);
    setSentence('');
    setWordInput('');
    setIsTimeUp(false);
  };
  
  const handleSendSentence = async () => {
    if (gameRole === "question") {
      try {
        const trimmedSentenceValue = sentence.trim();
        
        // Immediately update Firebase with the trimmed sentence
        const roomRef = database().ref(`/rooms/${roomCode}`);
        await roomRef.update({
          trimmedSentence: trimmedSentenceValue,
          randomWord: randomWord 
        });
  
        setTrimmedSentence(trimmedSentenceValue);
  
        console.log('Sending data to API:');
        console.log('Sentence:', trimmedSentenceValue);
        console.log('Random Word:', randomWord);
        console.log("User's Irab:", wordInput);
  
        const response = await fetch('http://127.0.0.1:3000/run-model', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sentence: trimmedSentenceValue,
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
  
        const correctIrabMatch = analysis.match(/- الإعراب الصحيح:\s*.*?\(([^)]+)\)/);
        if (correctIrabMatch) {
          extractedCorrectIrab = correctIrabMatch[1].trim();
          setCorrect_iraap(extractedCorrectIrab);
     
          await roomRef.update({
            correct_iraap: extractedCorrectIrab
          });
          generateRandomIrab(extractedCorrectIrab);
        }
        
        // First update the room with analysis results
        await roomRef.update({
          correct_iraap: extractedCorrectIrab,
          analysisResult: data.result,
          result: data.result // Make sure the result is stored in Firebase
        });
        console.log(data.result,"ث")
        console.log(answer,"ث")
        // Handle score reduction for incorrect answers
        if (data.result === 0 || answer === "خاطئ") {
          const roomRef = database().ref(`/rooms/${roomCode}`);
          const snapshot = await roomRef.once('value');
          const roomData = snapshot.val();
          console.log(data.result, "jojojojoj");
          console.log(answer, "jojojojoj");
        
          // Create an updates object
          const updates = {};
          
          if (roomData.player1.uid === id) {
            updates['player1/score'] = (parseInt(roomData.player1.score) || 0) - 1;
          } else if (roomData.player2.uid === id) {
            updates['player2/score'] = (parseInt(roomData.player2.score) || 0) - 1;
          }
        
          // Apply the updates if there are any
          if (Object.keys(updates).length > 0) {
            await roomRef.update(updates);
          }
        }
        
        setShowResultModal(true);
        
        setTimeout(async () => {
          await updateScoreAndSwitchTurn();
          clearResults();
        }, 3000);
      } catch (error) {
        console.error('Error in handleSendSentence:', error);
        setIsModalVisible(true);
      }
    }
  };

  const handleModalClose = () => {
    setShowResultModal(false);
    clearResults();
  };

  const closeModal = () => {
    setIsModalVisible(false);
    // setIsTimeUp(false);
  };


  const generateRandomIrab = (correctIrab) => {
    const roles = [
        "اسم موصول", "مفعول فيه", "ظرف زمان", "مبتدأ", "خبر", "فاعل", "مفعول به",
        "حال", "تمييز", "مضاف إليه", "نعت", "عطف بيان", "توكيد", "بدل", "مفعول مطلق",
        "مفعول لأجله", "مفعول معه", "مستثنى", "منادى", "اسم إن", "خبر إن", "اسم كان",
        "خبر كان", "نائب فاعل", "حرف جر", "حرف توكيد ونصب", "حرف عطف", "اسم مجرور"
    ];
  
    const cases = ["مرفوع", "منصوب", "مجرور", "مجزوم", "مبني"];
    const caseMarkers = {
        "مرفوع": ["الضمة", "الواو", "الألف", "ثبوت النون"],
        "منصوب": ["الفتحة", "الألف", "الياء", "الكسرة", "حذف النون"],
        "مجرور": ["الكسرة", "الياء", "الفتحة"],
        "مجزوم": ["السكون", "حذف حرف العلة", "حذف النون"]
    };
  
    let randomChoices = [];
    while (randomChoices.length < 3) {
        const role = roles[Math.floor(Math.random() * roles.length)];
        const grammaticalCase = cases[Math.floor(Math.random() * cases.length)];
        let caseDescription;
        if (grammaticalCase === "مبني") {
            caseDescription = `مبني على ${["الضم", "الفتح", "الكسر", "السكون"][Math.floor(Math.random() * 4)]}`;
        } else {
            const marker = caseMarkers[grammaticalCase] ? 
                            caseMarkers[grammaticalCase][Math.floor(Math.random() * caseMarkers[grammaticalCase].length)] : 
                            "علامة غير محددة";
            const caseMarker = {
                "مرفوع": "رفعه",
                "منصوب": "نصبه",
                "مجرور": "جره",
                "مجزوم": "جزمه"
            }[grammaticalCase] || "إعرابه";
            caseDescription = `${grammaticalCase} وعلامة ${caseMarker} ${marker}`;
        }
        let irab = `${role} ${caseDescription}`;
        irab = [...new Set(irab.split(' '))].join(' ');
        if (!randomChoices.includes(irab)) {
            randomChoices.push(irab);
        }
    }
  
    randomChoices.push(correctIrab);
    randomChoices = randomChoices.sort(() => Math.random() - 0.5);
    
    // Update choices in state and Firebase
  setChoices(randomChoices);
  const roomRef = database().ref(`/rooms/${roomCode}`);
  roomRef.update({
    choices: randomChoices,
    // Also preserve the trimmedSentence when updating choices
    trimmedSentence: sentence.trim()
  });

    console.log(randomChoices);
  };


  return (
    <View >
      
      <Images
        imageStyle={QuestionPageStyle.bgImage}
        localSource={require('../../../../assets/images/QuestionBg.png')}
      />
      {isMyTurn ? (
        gameRole === "question" ? (
       
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
        {/* <Text
          style={{
            position: 'absolute',
            top: responsiveHeight(5.7),
            left: responsiveWidth(5),
            fontSize: responsiveFontSize(1.6),
            color: timeLeft <= 5 ? 'red' : 'black',
            fontFamily: Font.bold,
          }}>
          {timeLeft}s
        </Text> */}
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
            <View
              style={{
                paddingVertical: responsiveWidth(3),
                alignSelf: 'center',
              }}>
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
            {/* <Text
              style={{fontSize: responsiveFontSize(1), marginBottom: 10}}>
              {wordModalTimeLeft}s left
            </Text> */}
            <Pressable
              onPress={()=>handleWordSubmit()}
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
            <Text style={{fontSize: responsiveFontSize(1.5)}}>
              الإعراب الصحيح: {correct_iraap}
            </Text>
            <Text style={{fontSize: responsiveFontSize(1.5)}}>
              الإجابة النهائية: {answer}
            </Text>
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
        ) : (
          <View style={{alignItems: 'center'}}>
            <Images
              imageStyle={QuestionPageStyle.ss}
              localSource={require('../../../../assets/images/sss.png')}
            />
            <PlayerInfoRectangle player1Name={Player1} player1Coine={Player1Coine} player2Name={Player2} player2Coine={Player2Coine}/>
            <Question TheSentencse={trimmedSentence} TheQuestion={randomWord}/>
            <Answers roomCode={roomCode} gameRole={gameRole} Choices={Choices} correctIrab={correct_iraap}/>

          </View>
        )
      ) : (
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.95)',
          width: responsiveWidth(74),
          height: width >= TABLET_WIDTH ? responsiveHeight(30) : responsiveHeight(30),
          alignSelf: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: responsiveHeight(30),
          borderRadius: responsiveFontSize(1)
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              color: 'red',
              fontSize: responsiveFontSize(2),
            }}>
            </Text>
            <Text style={{fontSize: width >= TABLET_WIDTH ? responsiveHeight(4) :responsiveHeight(4.5),fontFamily:Font.bold}}> انتظر يقوم اللاعب بلعب دوره{dots}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CharactersAndBackground;

