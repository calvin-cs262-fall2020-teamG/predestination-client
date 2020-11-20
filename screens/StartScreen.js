import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Button,
  StatusBar,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";

const handleError = () => {
  Alert.alert("Oops!", "Code must be 6 digits", [{ text: "Understood" }]);
};

export default function StartScreen({ navigation, route }) {
  const [code, setCode] = useState("");

  const handleError = () => {
    Alert.alert("Please enter 6 numerical digits for the game code.");
  };

  // ensure given code is valid
  const handleJoinPress = () => {
    code.length === 6
      ? navigation.navigate("SeekerStack", {
          screen: "SeekerWaitingScreen",
          params: { code },
        })
      : handleError();
  };

  return (
    // <View style={globalStyles.container}>
    <View style={globalStyles.container}>
      <View style={globalStyles.titleSection}>
        
        {/* <Text>PreDestination</Text> */}
        <Text style={globalStyles.welcomeText}>
          WELCOME, 
          YOUNG CALVINIST.
        </Text>
      </View>
      {/*=======================Options for seekers==============================*/}
      <View style={globalStyles.horizontalBar}></View>
      <Text style={globalStyles.seekerText}>
        FOLLOW YOUR DESTINY 
        AS A SEEKER
      </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter Code"
            keyboardType="number-pad"
            onChangeText={(text) => this.onChanged(text)} //ensures that the user only inputs numeric values
            value={code}
            onChangeText={(val) => setCode(val)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View>
        <CustomButton title="join" onPress={handleJoinPress} color="gold" />
      </View>
      <View style={globalStyles.horizontalBar}></View>
      {/*========================Options for Keepers================================*/}
      <Text style={globalStyles.keeperText}>
        CREATE DESTINIES 
        AS A KEEPER
      </Text>
      <View>
        <CustomButton
          title="CREATE"
          onPress={() =>
            navigation.navigate("KeeperStack", { screen: "keeperListScreen" })
          }
        />
      </View>
      <View>
        <CustomButton
          title="Test GPS"
          onPress={() =>
            navigation.navigate("KeeperStack", { screen: "TestScreen" })
          }
        />
      </View>
    </View>
  );
}
