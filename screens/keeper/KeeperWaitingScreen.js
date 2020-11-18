import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { globalStyles } from "../../styles/global";
/**
 * KeeperWaitingScreen is similar to the SeekerWaitingScreen, except the ability to start the game is added.
 * TODO: styling, maybe a countdown, list of people who joined
 */

export default function KeeperWaitingScreen({ navigation }) {
  const [players, setPlayers] = useState([]);

  const code = 624359;

  return (
    <View>
      <View>
        <Text style={globalStyles.keeperText}>
          Keeper Waiting Screen. 
          Code is {code} 
        </Text> 
      </View> 
      <View>
        <Text style={globalStyles.keeperText}> Launch game now! </Text> 
        <CustomButton
          title="Launch"
          onPress={() => navigation.navigate("KeeperGameScreen")}
        /> 
      </View> 
    </View>
  );
}
