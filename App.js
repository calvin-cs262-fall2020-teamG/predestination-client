import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import splash from './assets/splash.png';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// import seeker screens
import StartScreen from './screens/StartScreen';
import SeekerWaitingScreen from './screens/seeker/SeekerWaitingScreen';
import SeekerGameScreen from './screens/seeker/SeekerGameScreen';

// import keeper screens
import KeeperListScreen from './screens/keeper/KeeperListScreen';
import KeeperGameScreen from './screens/keeper/KeeperGameScreen';
import KeeperEditorScreen from './screens/keeper/KeeperEditorScreen';
import KeeperWaitingScreen from './screens/keeper/KeeperWaitingScreen';
import KeeperNewHuntScreen from "./components/AddNewRoute";

const Stack = createStackNavigator();

// for now, we are going to title each navigation screen with the function name for easier debugging
// simple navigation setup
export default function App() {
    return (
	<NavigationContainer>
          <Stack.Navigator>            
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ title: 'StartScreen' }}/>
            
	    <Stack.Screen name="SeekerWaitingScreen" component={SeekerWaitingScreen} options={{ title: 'SeekerWaitingScreen' }}/>
	    <Stack.Screen name="SeekerGameScreen" component={SeekerGameScreen} options={{ title: 'SeekerGameScreen' }}/>
	    
            <Stack.Screen name="KeeperListScreen" component={KeeperListScreen} options={{ title: 'KeeperListScreen' }}/>
            <Stack.Screen name="KeeperEditorScreen" component={KeeperEditorScreen} options={{ title: 'KeeperEditorScreen' }}/>
            <Stack.Screen name="KeeperWaitingScreen" component={KeeperWaitingScreen} options={{ title: 'KeeperWaitingScreen' }}/>
            <Stack.Screen name="KeeperGameScreen" component={KeeperGameScreen} options={{ title: 'KeeperGameScreen' }}/>
            <Stack.Screen name={"KeeperNewHuntScreen"} component={KeeperNewHuntScreen} options={{ title: 'KeeperNewHuntScreen'}}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}
