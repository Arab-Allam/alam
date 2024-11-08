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


const Answers = ({roomCode, gameRole,Choices}) => {
  const [id, setID] = useState(null);
  const [choices, setChoices] = useState([]);
  useEffect(() => {
    (async () => {
      const id = await storageHandler('get', 'playerID');
      if (id) {
        setID(id);
      }
    })();
  }, []);


  useEffect(()=>{
    setChoices(Choices)
  },[Choices])


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

  return (
    <View style={{gap:responsiveFontSize(1), marginTop:responsiveHeight(3)}}>
  
      <View style={{flexDirection: 'row', gap:20}}>
      <TouchableOpacity style={{zIndex:1000}} onPress={()=>updateScoreAndSwitchTurnAnswere()}>
      <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1),width:width >= TABLET_WIDTH ? responsiveWidth(36) : responsiveWidth(30),height :width >= TABLET_WIDTH,height :width >= TABLET_WIDTH ? responsiveWidth(7):responsiveWidth(6)}]}>
          <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2,textAlign:'right'}]}>{choices[0]}</Text>
          </View>

        </TouchableOpacity> 

<TouchableOpacity>
        <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1),width:width >= TABLET_WIDTH ? responsiveWidth(36) : responsiveWidth(30),height :width >= TABLET_WIDTH,height :width >= TABLET_WIDTH ? responsiveWidth(7):responsiveWidth(6)}]}>
          <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2,textAlign:'right'}]}>{choices[1]}</Text>
        </View>
        </TouchableOpacity> 
      </View>



      <View style={{flexDirection: 'row',gap:20}}>
      <TouchableOpacity>
      <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1),width:width >= TABLET_WIDTH ? responsiveWidth(36) : responsiveWidth(30),height :width >= TABLET_WIDTH,height :width >= TABLET_WIDTH ? responsiveWidth(7):responsiveWidth(6)}]}>
      <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2,textAlign:'right'}]}>{choices[2]}</Text>
      </View>
      </TouchableOpacity> 

      <TouchableOpacity>

      <View style={[QuestionPageStyle.scoreBox,{alignItems:'center',borderRadius: responsiveWidth(1), width:width >= TABLET_WIDTH ? responsiveWidth(36) : responsiveWidth(30),height :width >= TABLET_WIDTH ? responsiveWidth(7):responsiveWidth(6) }]}>
      <Text style={[QuestionPageStyle.pointsText,{padding:width >= TABLET_WIDTH ? 10: 2,textAlign:'right'}]}>{choices[3]}</Text>
      </View>
      </TouchableOpacity> 
    </View>

    </View>
  );
};
export default Answers;
