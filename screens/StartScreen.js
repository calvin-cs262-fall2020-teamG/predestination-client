import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  TextInput,
  View,
  Text,
  Button,
  StatusBar,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function StartScreen({ navigation, route }) {
  const [code, setCode] = useState("");

  const handleError = () => {
    Alert.alert("Please enter 6 numerical digits for the game code.");
  };

  // ensure given code is valid
  const handleJoinPress = () => {
    code.length === 6
      ? navigation.navigate("SeekerStack", { screen: "SeekerWaitingScreen", params: { code } })
      : handleError();
  };

  return (
    // <View style={globalStyles.container}>
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed keyboard');
    }}>
      <View style={globalStyles.container}>
        <View style={globalStyles.titleSection}>
          <Text>PreDestination</Text>
          <Text style={globalStyles.welcomeText}>Welcome, PLACEHOLDER_NAME.
        {"\n"}Will you...</Text>
        </View>
        {/* Options for seekers */}
        <Text style={globalStyles.seekerText}>FOLLOW YOUR DESTINY</Text>
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter Code"
            keyboardType="numeric"
            value={code}
            onChangeText={(val) => setCode(val)}
          />
        </View>
        <View style={globalStyles.joinButton}>
          <Button title="Join" onPress={handleJoinPress} />
        </View>
        <Text style={globalStyles.orWillYouText}>-or will you-</Text>

        <Text style={globalStyles.keeperText}>CREATE THE DESTINIES FOR SEEKERS</Text>
        <View style={globalStyles.createButton}>
          <Button
            title="Create"
            onPress={() => navigation.navigate('KeeperStack', { screen: 'KeeperListScreen' })}
          />
        </View>

        <View style={globalStyles.createButton}>
          <Button
            title="TestGPS"
            onPress={() => navigation.navigate('KeeperStack', { screen: 'TestScreen' })}
          />
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}
