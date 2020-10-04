import React, { useState } from 'react';
import { StyleSheet, Alert, TextInput, View, Text, Button, StatusBar, } from 'react-native';

import * as Google from 'expo-google-app-auth';

const CLIENT_API_KEY='AIzaSyBAaFc8y9xxx8xc8jimfCRPeu5H6ucP-0w';

const settings = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
};

export default function LoginScreen({ navigation }) {

  const validateToken = async (token) => {
    try {
      const fetchResponse = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`, settings);
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
      return e;
    }    
  }

  const getUserData = async (token) => {
    try {
      const userDataFetch = await fetch(`https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names%2Cperson.photos&key=${CLIENT_API_KEY}`, {
	headers: {
	  Accept: 'application/json',
	  Authorization: `Bearer ${token}`,
	}
      });
      const userData = await userDataFetch.json();
      return {
	fullName: userData.names[0].displayName,
	photoUrl: userData.photos[0].url,
      };
    } catch (e) {
      return e;
    }
  }

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
	androidClientId: "825050207640-q3qlm3h4i43vbcikfc3avv6av5g0us05.apps.googleusercontent.com",
	iosClientId: "825050207640-eabv7h5qctuv9csnhaio7s8pfnncg0ff.apps.googleusercontent.com",
	scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
	const validToken = await validateToken(result.accessToken);
	const userData = await getUserData(result.accessToken);
	navigation.navigate('StartScreen', userData);
      } else {
	return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return (
    <View>
      <Button onPress={() => signInWithGoogleAsync()} title="Sign in with Google" />
    </View>
  )
}

