import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Alert, View, Text, Image, Button, } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import { getUserData, signOutOfGoogle } from '../src/GoogleAuthentication';
import { LOGIN_STATUS, AuthenticationContext } from '../src/GoogleAuthentication';

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

  const loadData = () => {
    getUserData().then(({ name, photo }) => {
      setName(name);
      setPhoto(photo);
    })
      .then(() => {
        setStatus(STATUS.LOADED);
      })
      .catch(e => {
        setStatus(STATUS.ERROR);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  const { loginStatus, setLoginStatus } = useContext(AuthenticationContext);

  const handleSignOut = async () => {
    await signOutOfGoogle();
    setLoginStatus(LOGIN_STATUS.NEW_USER);
  }

  // https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component
  return (
    <View>
      {
        (status === STATUS.LOADING || status === STATUS.ERROR) ? <ActivityIndicator /> :
          <View>
            <View>
              <Text>{name}</Text>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: photo,
                }}
              />
              <SocialIcon
                title='Sign Out of Google'
                light
                raised
                button
                type='google'
                onPress={handleSignOut}
              />
            </View>

            <View>

            </View>
          </View>
      }
    </View>
  );
}

