import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TypeOfGame from "../../typeOfGame/page/TypeOfGame";
import PlayWithFriend from "../../playWithFriend/page/Intro";
import QuestionPage from "../../questionPage/page/QuestionPage";
import Signin from "../../auth/signin/page/Signin";
import Signup from "../../auth/signup/Signup";
const Stack = createStackNavigator();
const MainStackes = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initalRouteName="Signup">
      {/* 
      <Stack.Screen name="QuestionPage" component={QuestionPage} options={{ headerShown: false }} /> */}
                  <Stack.Screen name="Intro" component={PlayWithFriend} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }}/>
      <Stack.Screen name="TypeOfGame" component={TypeOfGame} options={{ headerShown: false }} />


    </Stack.Navigator>
    </NavigationContainer>

  );
}
export default MainStackes;