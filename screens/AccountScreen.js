import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View, Text, } from 'react-native';
// for getting the access token
import * as Google from 'expo-google-app-auth';

// AsyncStorage to store access tokens and refresh tokens (which are basically how we remember what user was logged in to this app)
import AsyncStorage from '@react-native-community/async-storage';

import { SocialIcon } from 'react-native-elements';
import { getUserData, signOut } from '../src/GoogleAuthentication';
import { setStatusBarBackgroundColor, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

/**
 * AccountScreen lets a user logout of Google.
 * Once logged out, the user will be directed to the login screen
 */
export default function AccountScreen({ navigation }) {

  const STATUS = {
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error',
  }

  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(async () => {
    getUserData().then(({ name, photo }) => {
      setName(name);
      setPhoto(photo);
    })
      .then(() => {
        setStatus(STATUS.LOADED);
      })
      .catch(e => console.error(e))
      .finally(() => setStatus(STATUS.ERROR));
  }
    , []);

  // https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component

  {
    (status === STATUS.LOADING && <ActivityIndicator/>) ||
    (status === STATUS.LOADED && <View><Text>Loaded</Text></View>) ||
    (status === STATUS.ERROR && <View><Text>Error</Text></View>)
  }

}

