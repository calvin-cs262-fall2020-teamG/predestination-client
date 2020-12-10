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
  Modal,
} from "react-native";
import { getUserData } from "../src/GoogleAuthentication";
import {
  LOGIN_STATUS,
  AuthenticationContext,
} from "../src/GoogleAuthentication";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import FloatingView from "../components/FloatingView";

export default function StartScreen({ navigation, route }) {
  const [code, setCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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
    <View style={globalStyles.container}>

      <Modal visible={modalOpen} animationType='slide'>
        <View>
          <MaterialIcons
            name='close'
            size={24}
            onPress={() => setModalOpen(false)}
            style={styles.modalCloseIcon}
          />
          <Text style={styles.modalContent}>
            To enter a Hunt in Predestination, a Keeper must give you a six-number code.
            You may tap on “Enter Code” to input the code. Hit “Join” when you are ready to
            begin your adventure. To view your profile or sign-out, please tap the horizontal
            lines (≡) on the top right corner. After that, you should select the “Account” option.
          </Text>
        </View>
      </Modal>

      <MaterialIcons
        name='help-outline'
        size={24}
        onPress={() => setModalOpen(true)}
        style={styles.modalHelpIcon}
      />

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
      {/* <View style={globalStyles.horizontalBar}></View> */}
      <FloatingView
        // title="FOLLOW YOUR DESTINY AS A KEEPER"
        style={globalStyles.SeekerWaitingScreenCard}
      >
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
        {/* <CustomButton
          style={{ marginTop: 20 }}
          title={disabled ? `${timeLeft}` : "Join"}
          disabled={disabled}
          onPress={
            disabled
              ? () => { }
              : () =>
                navigation.navigate("SeekerGameTabStack", {
                  screen: "SeekerGameScreen",
                })
          }
        /> */}
      </FloatingView>
      {/* <View style={styles.bottomContainer}>
        <Text style={globalStyles.seekerText}>FOLLOW YOUR DESTINY AS A SEEKER</Text>

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
      </View> */}
      {/* <View style={globalStyles.horizontalBar}></View> */}
      {/*========================Options for Keepers================================*/}
      {/* <Text style={globalStyles.keeperText}>CREATE DESTINIES AS A KEEPER</Text>

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
      </View> */}
    </View >
  );
}

const styles = StyleSheet.create({
  modalHelpIcon: {
    color: '#5CDB95',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalCloseIcon: {
    margin: 15,
  },
  modalContent: {
    padding: 30,
    fontSize: 16,
  },
  bottomContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})