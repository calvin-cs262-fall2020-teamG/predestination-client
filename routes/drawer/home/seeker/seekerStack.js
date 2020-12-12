import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../../../../shared/header";
import { globalStyles } from "../../../../styles/global";

// import seeker screens
import SeekerWaitingScreen from "../../../../screens/seeker/SeekerWaitingScreen";
import SeekerGameTabStack from "./SeekerGameTabStack";

import { getUserData } from '../../../../src/GoogleAuthentication';
import { GameContext, NotePack } from "../../../../src/Notes";
import io from 'socket.io-client';

const SOCKET_SERVER_ADDR = 'https://predestination-service.herokuapp.com/';

const Stack = createStackNavigator();

/**
 * HomeStack is displayed only when a user is logged in
 */
export default function SeekerStack({ navigation }) {
  const [notes, setNotes] = useState(new NotePack());
  const [points, setPoints] = useState(0);
  const [clueData, setClueData] = useState([]);
  const [playerData, setPlayerData] = useState([]);
  const [gameLog, setGameLog] = useState([]);
  const [ioClient, setIoClient] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);
  const [gameCode, setGameCode] = useState(null);
  const [newGameLog, setNewGameLog] = useState(null);
  const [newPlayer, setNewPlayer] = useState(null);

  useEffect(() => {
    setIoClient(io(SOCKET_SERVER_ADDR));
  }, []);

  useEffect(() => {
    if (ioClient !== null && gameCode !== null) {
      initialize();
    }
  }, [ioClient, gameCode]);

  /* initialize()
   * @params: none
   * @precondition: io has been established
   * @postcondition: 
   * - joins game session 
   * - creates listener for receiving player snapshot
   * - creates listener for receiving updates
   */
  const initialize = async () => {
    
    const { id } = await getUserData();
    let playerID = id;

    ioClient.emit('join-session', gameCode, playerID);

    ioClient.on('players-snapshot', (gameLog, playerData, clueData) => {
        console.log('Received game snapshot...');
        setGameLog(gameLog);
        setClueData(clueData ? clueData.map(clue => { return { ...clue, points: parseInt(clue.points) }; }) : []);
        setPlayerData(playerData ? playerData : []);
    });

    ioClient.on('update', (playerid, clueid, time) => {
        console.log('Someone else found a clue!');
        setNewGameLog({playerid, time, clueid});
    });

    ioClient.on('new-player', (newPlayerID, profilePictureURL, displayName) => {
        console.log("new-player");
        console.log(newPlayerID);
        setNewPlayer({
          id: newPlayerID,
          name: displayName,
          image: profilePictureURL,
        });
    });    

    return function cleanup() {
      io.Socket.removeAllListeners();
    }

  };

  useEffect(() => {
      setGameLog([...gameLog, newGameLog]);
  }, [newGameLog]);

  useEffect(() => {
    setPlayerData([...playerData, newPlayer]);
  }, [newPlayer]);

  /* findClue()
     * @params: none
     * @precondition: assumes io is not null
     * @postcondition: if selectedClue is non null, send update to other clients
     */
    const findClue = () => {
      if (selectedClue !== null) {
        ioClient.emit('update', selectedClue.id, 100);
      }
  }

  return (
    <GameContext.Provider
      value={{
        points,
        clueData,
        playerData,
        gameLog,
        selectedClue,
        setSelectedClue: (key) => { setSelectedClue(clueData.filter(clue => { return clue.id === key})[0]); },
        findClue,
        setGameCode,
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerRight: () => (
            <Header
              navigation={navigation}
              customStyle={globalStyles.seekerNavigationDrawer}
            />
          ),
          headerTitleStyle: globalStyles.seekerNavigationTitle,
          headerTintColor: 'white',
          headerStyle: globalStyles.seekerNavigationHeader,
        }}
      >
        <Stack.Screen
          name="SeekerWaitingScreen"
          component={SeekerWaitingScreen}
          options={{ title: "", headerShown: true }}
        />
        <Stack.Screen
          name="SeekerGameTabStack"
          component={SeekerGameTabStack}
          options={{ title: "Dashboard", headerTitleStyle: { alignSelf: 'center' }, headerShown: true }}
        />
        {/*
                                        <Stack.Screen name="SeekerGameScreen" component={SeekerGameScreen} options={{ title: 'SeekerGameScreen', headerShown: true }} />
                                        <Stack.Screen name="SeekerClueListScreen" component={SeekerClueListScreen} options={{ title: 'SeekerClueListScreen', headerShown: false }} />
                                        <Stack.Screen name="SeekerFocusedScreen" component={SeekerFocusedScreen} options={{ title: 'SeekerFocusedScreen ', headerShown: false }} /> */}
      </Stack.Navigator>
    </GameContext.Provider>
  );
}
