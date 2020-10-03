import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, View, Text, Button, StatusBar, } from 'react-native';

import * as Google from 'expo-google-app-auth';

const settings = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
};

async function validateToken(token) {
  try {
    const fetchResponse = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`, settings);
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }    
}

async function getUserData(token) {
  try {
    const userDataFetch = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, settings);
  const userData = await userDataFetch.json();
  console.log(userData);
    return userData;
  } catch (e) {
    return e;
  }
}

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId: "825050207640-q3qlm3h4i43vbcikfc3avv6av5g0us05.apps.googleusercontent.com",
      iosClientId: "825050207640-eabv7h5qctuv9csnhaio7s8pfnncg0ff.apps.googleusercontent.com",
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      console.log(result.accessToken);
      const data = await validateToken(result.accessToken);
      console.log(data);
      const userData = await getUserData(result.accessToken);
      console.log("UserData");
      console.log(userData);
      
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}


export default function LoginScreen({ navigation }) {
  const signInWithGoogle = () => {
    signInWithGoogleAsync()
  }

  return (
    <View>
      <Button onPress={() => signInWithGoogle()} title="Sign in with Google" />
    </View>
  )
}

