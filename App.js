import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

<<<<<<< HEAD
// import seeker screens

import StartScreen from './screens/StartScreen';
import SeekerWaitingScreen from './screens/seeker/SeekerWaitingScreen';
import SeekerGameScreen from './screens/seeker/SeekerGameScreen';

// import keeper screens
import KeeperListScreen from './screens/keeper/KeeperListScreen';
import KeeperGameScreen from './screens/keeper/KeeperGameScreen';
import KeeperEditorScreen from './screens/keeper/KeeperEditorScreen';
import KeeperWaitingScreen from './screens/keeper/KeeperWaitingScreen';
import testScreen from './screens/TestScreen';

const Stack = createStackNavigator();

// for now, we are going to title each navigation screen with the function name for easier debugging
// simple navigation setup
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ title: 'StartScreen' }} />
        <Stack.Screen name="TestScreen" component={testScreen} options={{ title: 'TestScreen ' }} />

        <Stack.Screen name="SeekerWaitingScreen" component={SeekerWaitingScreen} options={{ title: 'SeekerWaitingScreen' }} />
        <Stack.Screen name="SeekerGameScreen" component={SeekerGameScreen} options={{ title: 'SeekerGameScreen' }} />

        <Stack.Screen name="KeeperListScreen" component={KeeperListScreen} options={{ title: 'KeeperListScreen' }} />
        <Stack.Screen name="KeeperEditorScreen" component={KeeperEditorScreen} options={{ title: 'KeeperEditorScreen' }} />
        <Stack.Screen name="KeeperWaitingScreen" component={KeeperWaitingScreen} options={{ title: 'KeeperWaitingScreen' }} />
        <Stack.Screen name="KeeperGameScreen" component={KeeperGameScreen} options={{ title: 'KeeperGameScreen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
=======
import MainStack from './routes/mainStack';

export default function App() {
    return (
	      <NavigationContainer>
          <MainStack/>
        </NavigationContainer>
    );
>>>>>>> 1592dbeea1a6cb10d53471b1a5a231f314fb9a2b
}
