import React, { useContext } from 'react';
import { Alert, View, Text, } from 'react-native';

// allows us to run the "is this person already logged in" check, every time this screen is focused by react navigation
import { useFocusEffect } from '@react-navigation/native';
import GoogleSignIn from '../components/GoogleSignIn';

import { getUserData, signInWithGoogle } from '../src/GoogleAuthentication';
import { LOGIN_STATUS, AuthenticationContext } from '../src/GoogleAuthentication';

/**
 * LoginScreen lets a user login via Google.
 * New users who haven't signed up yet can click the button and sign in.
 * Existing users who have already signed up will be automatically redirected to the start screen with their credentials
 * TODO: a profile component that lets people log out of their google account, probably in a different screen
 */
export default function LoginScreen() {

  // handle errors from logging into google
  const handleError = (e) => {
    Alert.alert("An error occurred logging into google. Please try again. If problems persist, please contact our development team.");
    console.log(e);
  }

  const { loginStatus, setLoginStatus } = useContext(AuthenticationContext);

  // initialize checks if user is already logged in or not
  const initialize = async () => {
    try {
      // if logged in, gets data and redirects to start screen
      // if you want to test out the login button which won't be displayed after your first login, uncomment the following line
      //throw null;
      await getUserData();
      setLoginStatus(LOGIN_STATUS.GOOGLE_USER);
    } catch (e) { 
      // if not logged in, reveals google login button
      setLoginStatus(LOGIN_STATUS.NEW_USER);
    }
  };

  const loginPress = async () => {
    try {
      await signInWithGoogle();
      setLoginStatus(LOGIN_STATUS.GOOGLE_USER);
    } catch (e)
    {
      handleError(e);
      setLoginStatus(LOGIN_STATUS.NEW_USER);
    }
  }

  useFocusEffect(() => {initialize();}, []);

    return (
      <View>
        <GoogleSignIn onPress={loginPress}/>
      </View>
    );
}

