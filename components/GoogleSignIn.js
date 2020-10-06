import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, View, Text, Button, StatusBar, } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import * as Google from 'expo-google-app-auth';

export default function LoginScreen({ handleSignIn }) {

  // handle errors from logging into google
  const handleError = (e) => {
    Alert.alert("An error occurred logging into google. Please try again. If problems persist, please contact our development team.");
    console.log(e);
  }

  const signInWithGoogleAsync = async () => {
    try {
      // ask user for consent to gather public profile information
      const { type, accessToken, user, refreshToken } = await Google.logInAsync({
        androidClientId: "825050207640-q3qlm3h4i43vbcikfc3avv6av5g0us05.apps.googleusercontent.com",
        iosClientId: "825050207640-eabv7h5qctuv9csnhaio7s8pfnncg0ff.apps.googleusercontent.com",
        scopes: ['profile'],
      }).catch(handleError);

      // on success, return information along with accessToken to parent
      if (type == "success") {
        handleSignIn(user.name, user.photoUrl, accessToken, refreshToken);
      }
    } catch (e) {
      handleError(e);
    }
  }

  return (
    <View>
      <SocialIcon
        title='Sign In With Google'
        light
        raised
        button
        type='google'
        onPress={signInWithGoogleAsync}
      /> 
    </View>
  )
}

