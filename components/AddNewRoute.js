import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Button, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import CustomButton from "../components/CustomButton";
/*
The AddNewRoute component takes input from the user
and adds it to the FlatList of routes.
TODO: add min players input, add timer input - maybe?
*/

export default function AddNewRoute({ submitHandler }) {
  const [name, setName] = useState("");

  const changeNameHandler = (val) => {
    setName(val);
  };

  return (
    <View>
      <View>
        
        {/* New scavenger hunt label and text input field */}
        <Text style={globalStyles.keeperText}>
          Enter a scavenger hunt name:
        </Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter name"
          value={name}
          // Fires changeNameHandler which in turn sets the name to whatever the user types in
          onChangeText={changeNameHandler}
        />
      </View>
      <View>
        <CustomButton title="Save Name" onPress={() => submitHandler(name)} />
      </View>
      <View style={globalStyles.clearButton}>
        <CustomButton title="Clear Name" onPress={() => setName("")} />
      </View>
      <View> {/* TODO: Add min players input */} </View>
      <View> {/* TODO: Add timer input */} </View>
    </View>
  );
}
