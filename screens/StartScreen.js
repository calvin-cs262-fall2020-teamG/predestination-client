import React, { useState, useEffect, useContext } from "react";
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
  ActivityIndicator,
} from "react-native";
import { getUserData } from "../src/GoogleAuthentication";
import {
  LOGIN_STATUS,
  AuthenticationContext,
} from "../src/GoogleAuthentication";
import { TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";

export default function StartScreen({ navigation, route }) {
  const [code, setCode] = useState("");

  const STATUS = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error",
  };

  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(STATUS.LOADING);

  const loadData = () => {
    getUserData()
      .then(({ name, photo }) => {
        setName(name)
        setPhoto(photo);
      })
      .then(() => {
        setStatus(STATUS.LOADED);
      })
      .catch((e) => {
        setStatus(STATUS.ERROR);
      });
  };

  useEffect(() => {
    loadData();
  }, []);


  const { loginStatus, setLoginStatus } = useContext(AuthenticationContext)

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={globalStyles.container}>
        <View style={globalStyles.titleSection}>
          {/* <Text>PreDestination</Text> */}
          <Text style={globalStyles.welcomeText}>Welcome, </Text>
          {status === STATUS.LOADING || status === STATUS.ERROR ? (
            <ActivityIndicator />
          ) : (
              <View>
                <View>
                  <Text style={globalStyles.welcomeText}>{name}</Text>
                </View>
              </View>
            )}
        </View>
        {/*=======================Options for seekers==============================*/}
        <View style={globalStyles.horizontalBar}></View>

        <Text style={globalStyles.seekerText}>FOLLOW YOUR DESTINY AS A SEEKER</Text>

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

        <View>
          <CustomButton title="join" onPress={handleJoinPress} color="gold" />
        </View>
        <View style={globalStyles.horizontalBar}></View>
        {/*========================Options for Keepers================================*/}
        <Text style={globalStyles.keeperText}>CREATE DESTINIES AS A KEEPER</Text>

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
    </TouchableWithoutFeedback>
  );
}
