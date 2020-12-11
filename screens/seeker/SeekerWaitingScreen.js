import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { globalStyles } from "../../styles/global";
import CustomButton from "../../components/CustomButton";
import FloatingView from "../../components/FloatingView";
import { getUserData } from "../../src/GoogleAuthentication";
import { GameContext } from '../../src/GameLogic';

/**
 * SeekerWaitingScreen is shown to all seekers who joined a game that has not yet begun
 * TODO: styling, connecting to server, implement a countdown
 */
export default function SeekerWaitingScreen({ route, navigation }) {
  const [timeLeft, setTimeLeft] = useState(2);
  const [disabled, setDisabled] = useState(true);
  const { GamePack } = useContext(GameContext);
    
    const setupGame = async () => {
	try {
	    const { name, photo, id } = await getUserData();
	    GamePack.setup(route.params.code, id);
	} catch (e) {
	    console.log(e);
	}
    }
    
    useEffect(() => {
	setupGame();
    },[]);
    
  useEffect(() => {
    const timerId = setInterval(() => {
      if (timeLeft <= 0) {
        setDisabled(false);
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#5CDB95",
        height: "100%",
        flexDirection: "column-reverse",
        justifyContent: "space-around",
      }}
    >
      <FloatingView
        title="Game will begin shortly"
        style={globalStyles.SeekerWaitingScreenCard}
      >
        <Text>
          While you wait, share the game code with a friend! The
          more the merrier!
        </Text>
        <CustomButton
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
        />
      </FloatingView>
      <Text style={globalStyles.WaitingCode}> {route.params.code} </Text>
    </View>
  );
}
