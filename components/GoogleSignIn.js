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
import { SocialIcon } from "react-native-elements";

export default function GoogleLoginButton({ onPress }) {
  return (
    <View>
      <SocialIcon
        title="Sign In With Google"
        dark
        raised
        button
        type="google"
        onPress={onPress}
      /> 
    </View>
  );
}
