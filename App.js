import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import splash from './assets/splash.png';

import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer } from '@react-navigation/native';
import StartScreen from './screens/StartScreen';
import WaitingScreen from './screens/WaitingScreen';
import EditorListScreen from './screens/EditorListScreen';
// import SeekerGameScreen from './screens/SeekerGameScreen';
// import EditorScreen from './screens/EditorScreen';
// import KeeperGameScreen from './screens/KeeperGameScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
	<NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="startscreen" component={StartScreen} options={{ title: 'Predestination' }}/>
            <Stack.Screen name="waitingscreen" component={WaitingScreen} options={{ title: 'Waiting Room' }}/>
            <Stack.Screen name="editorlistscreen" component={EditorListScreen} options={{ title: 'Your Routes' }}/>
            
          </Stack.Navigator>
        </NavigationContainer>
	
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    width: 200
  }

});
