import React, { useState } from 'react';
import { Alert, View, Text, } from 'react-native';

// allows us to run the "is this person already logged in" check, every time this screen is focused by react navigation
import { useFocusEffect } from '@react-navigation/native';
import GoogleSignIn from '../components/GoogleSignIn';

// AsyncStorage to store access tokens and refresh tokens (which are basically how we remember what user was logged in to this app)
import AsyncStorage from '@react-native-community/async-storage';

// for getting the access token
import * as Google from 'expo-google-app-auth';

/**
 * AccountScreen lets a user logout of Google.
 * Once logged out, the user will be directed to the login screen
 */
export default function AccountScreen({ navigation }) {  

    return (
      <View>
        <Text>Account stuff</Text>
      </View>
    );
  
}

