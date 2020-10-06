import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, View, Text, Button, StatusBar, } from 'react-native';

import GoogleSignIn from '../components/GoogleSignIn';
import FacebookSignIn from '../components/FacebookSignIn';

import AsyncStorage from '@react-native-community/async-storage';
import AppLoading from 'expo';

const settings = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
};

export default function LoginScreen({ navigation }) {
  
  // store authentication stuff like access tokens and refresh tokens so we can remember user's logging in
  const storeAuthenticationTokens = async (service, accessToken, refreshToken) => {
    try {
      const jsonValue = JSON.stringify({ service, accessToken, refreshToken });
      await AsyncStorage.setItem('@authentication', jsonValue);
    } catch (e) {
      // saving error
    }
  }

  // https://react-native-community.github.io/async-storage/docs/usage
  // check if authentication stuff exists; if it does, log in user silently
  const checkAuthenticationTokens = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@authentication')
      if (jsonValue != null) {
        const authData = JSON.parse(jsonValue);
        
        //setLoginStatus(LOGIN_STATUS.RETURNING_USER);
      } else {
        setLoginStatus(LOGIN_STATUS.NEW_USER);
      }
    } catch(e) {
      setLoginStatus(LOGIN_STATUS.NEW_USER);
    }
  }

  const handleGoogleLogin = (name, photoUrl, accessToken, refreshToken) => {
    Alert.alert("Google Login Data", `Name: ${name} \n Photo: ${photoUrl} \n Access Token: ${accessToken}`);
    storeAuthenticationTokens("google", accessToken, refreshToken);
  };

  const handleFacebookLogin = (data) => {
    Alert.alert('bruh', 'asdf', [ {text: 'face'}]);
  }

  const LOGIN_STATUS = {
    LOADING: 'loading',
    NEW_USER: 'new_user',
    RETURNING_USER: 'returning_user',
  }

  checkAuthenticationTokens();
  
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.LOADING);
  const [name, setName] = useState(null);

  if (loginStatus == LOGIN_STATUS.NEW_USER) {
    return (
      <View>
        <GoogleSignIn handleSignIn={handleGoogleLogin}/>
        <FacebookSignIn handleSignIn={handleFacebookLogin}/>
      </View>
    );
  } else if (loginStatus == LOGIN_STATUS.LOADING) {
    return (
      <View><Text>Loading credentials.</Text></View>
    )
  } else if (loginStatus == LOGIN_STATUS.RETURNING_USER) {
    return (
      <View><Text>You are returning to the app I see!</Text></View>
    )
  }
  
}

