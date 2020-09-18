import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import splash from './assets/splash.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>PREDESTINATION: </Text>
      <Text>Where you control other's destiny.</Text>

      <View style={styles.button}>
        <Button title="Admin" />
      </View>

      <Text>Or where your journey begins.</Text>
      <View style={styles.button}>
        <Button title="Seeker" />
      </View>
      <StatusBar style="auto" />
    </View>
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
