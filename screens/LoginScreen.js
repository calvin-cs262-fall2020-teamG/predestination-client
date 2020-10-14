import React, { useState } from 'react';
import { Alert, View, Text, } from 'react-native';

// allows us to run the "is this person already logged in" check, every time this screen is focused by react navigation
import { useFocusEffect } from '@react-navigation/native';
import GoogleSignIn from '../components/GoogleSignIn';

// AsyncStorage to store access tokens and refresh tokens (which are basically how we remember what user was logged in to this app)
import AsyncStorage from '@react-native-community/async-storage';

// for getting the access token
import * as Google from 'expo-google-app-auth';

// probably should make this a secret huh, oh well
const CLIENT_API_KEY = 'AIzaSyBAaFc8y9xxx8xc8jimfCRPeu5H6ucP-0w';

/**
 * LoginScreen lets a user login via Google.
 * New users who haven't signed up yet can click the button and sign in.
 * Existing users who have already signed up will be automatically redirected to the start screen with their credentials
 * TODO: a profile component that lets people log out of their google account, probably in a different screen
 */
export default function LoginScreen({ navigation }) {
  
  const LOGIN_STATUS = {
    LOADING: 'loading',
    NEW_USER: 'new_user',
    RETURNING_USER: 'returning_user',
  }

  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.LOADING); 

  // handle errors from logging into google
  const handleError = (e) => {
    Alert.alert("An error occurred logging into google. Please try again. If problems persist, please contact our development team.");
    console.log(e);
  }

  // some think we should validate the token, others say no; in the case we need it, here it is
  const validateToken = async (token) => {
    try {
      const fetchResponse = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`, settings);
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
      return e;
    }
  }

  // https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/
  // in the case that the accessToken we have is expired, we use our refresh token and get a new one
  const getNewToken = async (refreshToken) => {
    try {
      const data = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: '825050207640-dl3lgst2p52hnorr4he6c6k125pn2n9f.apps.googleusercontent.com',
        client_secret: '5ZGcr4Hucthn36dNJbRcXrmC',
      };

      const fetchResponse = await fetch('https://accounts.google.com/o/oauth2/v2/auth', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const newAccessToken = await fetchResponse.json();
      //todo add return once we know what is returned
    } catch (e) {
      return null;
    }
  }

  // requestData returns either an object with user data or an error of invalid_token
  const requestData = async (accessToken) => {
    
    const fetchResponse = await fetch(`https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names%2Cperson.photos&key=${CLIENT_API_KEY}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    });

    const jsonResponse = await fetchResponse.json();

    if (jsonResponse.error !== undefined && jsonResponse.error == "invalid_token") {
      throw "invalid_token";
    } else {
      return {
        name: jsonResponse.names[0].displayName,
        photoUrl: jsonResponse.photos[0].url,
      };
    }

  }

   // store authentication stuff like access tokens and refresh tokens so we can remember user's logging in
   const storeAuthenticationTokens = async (accessToken, refreshToken) => {
    try {
      const jsonValue = JSON.stringify({ accessToken, refreshToken });
      await AsyncStorage.setItem('@google-authentication', jsonValue);
    } catch (e) {
      // saving error
      console.log("Couldn't save tokens...");
    }
  }

  // https://react-native-community.github.io/async-storage/docs/usage
  // return authentication tokens
  const getAuthenticationTokens = async () => {
    const jsonValue = await AsyncStorage.getItem('@google-authentication')
    if (jsonValue === null) {
      throw null;
    } 
    const json = JSON.parse(jsonValue);
    return json;
  }

  // getUserData attempts to get user data given access and refresh token
  // can throw errors, except an invalid token error which it will try to fix by requesting a new token
  const getUserData = async (accessToken, refreshToken) => {
    try {
      // try with original access token
      let data = await requestData(accessToken);
      return data;
    } catch (e) {
      // try getting a new access token with refreshToken
      if (e === 'invalid_token') {
          const newToken = await getNewToken(refreshToken);
          data = await requestData(newToken); 
          return data;
      } else {
        throw e;
      }      
    }
  }

  // called for new user when they press the login button
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
        storeAuthenticationTokens(accessToken, refreshToken);
        sendLoginInformation(user.name, user.photoUrl);
      }

    } catch (e) {
      handleError(e);
    }
  }

  const sendLoginInformation = (name, photo) => {

    navigation.navigate('Drawer', {
      screen: 'Home',
      params: {
        screen: 'StartScreen',
        params: { name, photo },
      },
    });
  }

  // initialize checks if user is already logged in or not
  const initialize = async () => {
    try {
      // if logged in, gets data and redirects to start screen
      // if you want to test out the login button which won't be displayed after your first login, uncomment the following line
      //throw null;
      const storedTokens = await getAuthenticationTokens();
      const userData = await getUserData(storedTokens.accessToken, storedTokens.refreshToken);
      sendLoginInformation(userData.name, userData.photo);
    } catch (e) { 
      // if not logged in, reveals google login button
      setLoginStatus(LOGIN_STATUS.NEW_USER);
    }
  };

  useFocusEffect(() => {initialize();});

  if (loginStatus == LOGIN_STATUS.NEW_USER) {
    return (
      <View>
        <GoogleSignIn onPress={signInWithGoogleAsync}/>
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

