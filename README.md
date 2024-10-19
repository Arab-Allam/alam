This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
# alam



## Firebase
# Create Code
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate 6-character room code

# Create Room


import database from '@react-native-firebase/database';

const createRoom = async (playerName, playerUid,roomCode) => {
  
  await database()
    .ref(`/rooms/${roomCode}`)
    .set({
      player1: {
        uid: playerUid,
        name: playerName,
        score: 0,
      },
      turn: 'player1' // Set initial turn to player1
      mode: 'PVP' //"PVP" or "PVM", with player or with computer

    });

// you can not retyrn any thing
  return roomCode; 
};


# Join Room Function:
//this for other player to join room 


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


# Update Score and Switch Turn:
//this when you want to switch the turn to other player

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

# Listen to room changes

// this part to update the UI acording to change value in DB , its like listner , witch mean if player1 answer correct you can Know when update turn to "PLayer2" to navigate to second screen

const listenToRoomChanges = (roomCode, setGameState) => {
  const roomRef = database().ref(`/rooms/${roomCode}`);

  roomRef.on('value', (snapshot) => {
    const roomData = snapshot.val();
    setGameState(roomData); // Update the state with the room data
  });
};

// To stop listening (when leaving the game or component unmounting):
const stopListening = (roomCode) => {
  const roomRef = database().ref(`/rooms/${roomCode}`);
  roomRef.off(); // Detach the listener
};


# Example UI (this to know how use above two function):


import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';

const GameScreen = ({ roomCode, playerUid }) => {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    listenToRoomChanges(roomCode, setGameState);

    return () => stopListening(roomCode); // Cleanup listener on unmount
  }, [roomCode]);

  if (!gameState) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Player 1: {gameState.player1.name} (Score: {gameState.player1.score})</Text>
      <Text>Player 2: {gameState.player2 ? gameState.player2.name : 'Waiting for player 2'} (Score: {gameState.player2?.score || 0})</Text>
      <Text>It's {gameState.turn === 'player1' ? gameState.player1.name : gameState.player2?.name}'s turn</Text>

      {gameState.turn === 'player1' && gameState.player1.uid === playerUid && (
        <Button title="Increase Score" onPress={() => updateScoreAndSwitchTurn(roomCode, playerUid, gameState.player1.score + 1)} />
      )}
      {gameState.turn === 'player2' && gameState.player2?.uid === playerUid && (
        <Button title="Increase Score" onPress={() => updateScoreAndSwitchTurn(roomCode, playerUid, gameState.player2.score + 1)} />
      )}
    </View>
  );
};

export default GameScreen;
