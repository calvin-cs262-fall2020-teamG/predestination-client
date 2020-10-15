import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View, Text, Image, } from 'react-native';


import { SocialIcon } from 'react-native-elements';
import { getUserData, signOut } from '../src/GoogleAuthentication';
import { setStatusBarBackgroundColor, setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { LOGIN_STATUS } from '../src/GoogleAuthentication';

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

  const loadData = async () => {
    getUserData().then(({ name, photo }) => {
      setName(name);
      setPhoto(photo);
      console.log(name);
    })
    .then(() => {
      setStatus(STATUS.LOADED);
    })
    .catch(e => {
      console.error(e);
      setStatus(STATUS.ERROR);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  // https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
  return (
    <View>
      {
        (status === STATUS.LOADING || status === STATUS.ERROR) ? <ActivityIndicator/> :
        <View>
          <View>
            <Text>{name}</Text>
            <Image
              source={{
                uri: photo,
              }}
            />
          </View>

          <View>

          </View>
        </View>
      }
    </View>
  );
}

