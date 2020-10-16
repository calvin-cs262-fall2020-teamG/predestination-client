import React, { useContext } from 'react';
import { StyleSheet, Alert, View, Text, Image } from 'react-native';

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
    } catch (e) {
      handleError(e);
      setLoginStatus(LOGIN_STATUS.NEW_USER);
    }
  }

  useFocusEffect(() => { initialize(); }, []);

  return (
    <View style={styles.container}>

      <View style={styles.backgroundContainer}>
        <Image style={styles.backgroundImage} source={require('../assets/calvin_login_screen.jpg')}></Image>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>PREDESTINATION</Text>
      </View>

      <View style={styles.loginContainer}>
        <View style={styles.buttonContainer}>
          <GoogleSignIn onPress={loginPress} />
        </View>
        <Text style={styles.loginText}>Click above to start your adventure!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 3,
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 24,
    fontFamily: "constan",
    letterSpacing: 7,
    color: 'white',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  backgroundContainer: {
    flex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    height: null,
    width: null,
  },
  loginContainer: {
    flex: 2,
  },
  loginText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
});

