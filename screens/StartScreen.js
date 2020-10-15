import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  TextInput,
  View,
  Text,
  Button,
  StatusBar,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function StartScreen({ navigation, route }) {
  const [code, setCode] = useState("");

  // ensure given code is valid
  const handleJoinPress = () => {
    code.length === 6
      ? navigation.navigate("SeekerWaitingScreen", { code })
      : handleError();
  };

  return (
    // <View style={globalStyles.container}>
    <View style={globalStyles.container}>
      <View style={globalStyles.titleSection}>
      <Text>PreDestination {route.params.fullName}</Text>
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
    {/* Options for seekers */}
    <Text style={globalStyles.keeperText}>CREATE THE DESTINIES FOR SEEKERS</Text>
      <View style={globalStyles.createButton}>
        <Button
          title="Create"
          onPress={() => navigation.navigate("KeeperListScreen")}
        />
      </View>

      <View style={globalStyles.createButton}>
        <Button
          title="TestGPS"
          onPress={() => navigation.navigate("TestScreen")}
        />
      </View>

    </View>
  );
}
