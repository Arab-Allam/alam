import React, { useState ,useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Font} from '../../../../assets/fonts/Fonts';
import QuestionPageStyle from '../page/QuestionPageStyle';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import database from '@react-native-firebase/database';
import {storageHandler} from '../../utils/helpers/Helpers';


const Answers = ({Answers1,Answers2,Answers3,Answers4,roomCode, gameRole, GameState,setGameState,setIsMyTurn,op}) => {
  const [id, setID] = useState(null);
  
  useEffect(() => {
    (async () => {
      const id = await storageHandler('get', 'playerID');
      if (id) {
        setID(id);
      }
    })();
  }, []);





  const {width} = Dimensions.get('window');
  const TABLET_WIDTH = 968;
  const updateScoreAndSwitchTurnAnswere = async () => {
    console.log("clcikedddd")
    const roomRef = database().ref(`/rooms/${roomCode}`);
    const snapshot = await roomRef.once('value');
    const roomData = snapshot.val();

    if (roomData) {
      if (roomData.player1.uid === id) {
        // Update player1 score and switch turn to player2
        await roomRef.update({
          role:gameRole === "question" ? "selection" : "question",

        });
      } else if (roomData.player2.uid === id) {
        // Update player2 score and switch turn to player1
        await roomRef.update({
          role:gameRole === "question" ? "selection" : "question",

        });
      }
    
    }
  };



  // const listenToRoomChanges = async () => {

  //   const roomRef = database().ref(`/rooms/${roomCode}`);

  //   roomRef.on('value', snapshot => {
  //     const roomData = snapshot.val();


  //     if (roomData) {
  //       setGameState(roomData);

  //       // Update isMyTurn and writeQuestion based on turn
  //       if (roomData.turn === id) {
  //         setIsMyTurn(true);
  //       } else {
  //         setIsMyTurn(false);
  //       }
  //     }
  //   });
  
  // };

  // useEffect(() => {
  //   listenToRoomChanges();
  // }, [GameState]); 



  return (
    <View style={{gap:responsiveFontSize(1), marginTop:responsiveHeight(3)}}>
  
      <View style={{flexDirection: 'row', gap:20}}>
      <TouchableOpacity style={{backgroundColor:'pink',zIndex:1000}} onPress={()=>updateScoreAndSwitchTurnAnswere()}>
      <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1)}]}>

          <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2}]}> {Answers1} مجموع </Text>
          </View>

        </TouchableOpacity> 

<TouchableOpacity>
        <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1)}]}>
          <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2}]}>{Answers2}</Text>
        </View>
        </TouchableOpacity> 
      </View>



      <View style={{flexDirection: 'row',gap:20}}>
      <TouchableOpacity>
      <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1),}]}>
      <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2}]}>{Answers3}</Text>
      </View>
      </TouchableOpacity> 

      <TouchableOpacity>

      <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1)}]}>
      <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2}]}>{Answers4}</Text>
      </View>
      </TouchableOpacity> 
    </View>

    </View>
  );
};
export default Answers;
