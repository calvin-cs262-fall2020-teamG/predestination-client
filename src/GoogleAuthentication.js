import React from "react";

import * as Google from "expo-google-app-auth";

const { NativeModules } = require("react-native");

const CLIENT_API_KEY = "AIzaSyBAaFc8y9xxx8xc8jimfCRPeu5H6ucP-0w";

const config = {
  iosClientId: `825050207640-eabv7h5qctuv9csnhaio7s8pfnncg0ff.apps.googleusercontent.com`,
  androidClientId: `825050207640-q3qlm3h4i43vbcikfc3avv6av5g0us05.apps.googleusercontent.com`,
  iosStandaloneAppClientId: `825050207640-eabv7h5qctuv9csnhaio7s8pfnncg0ff.apps.googleusercontent.com`,
  androidStandaloneAppClientId: `825050207640-q3qlm3h4i43vbcikfc3avv6av5g0us05.apps.googleusercontent.com`,
};

// AsyncStorage to store access tokens and refresh tokens (which are basically how we remember what user was logged in to this app)
import AsyncStorage from "@react-native-community/async-storage";

// some think we should validate the token, others say no; in the case we need it, here it is
const validateToken = async (token) => {
  try {
    const fetchResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

// https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/
// in the case that the accessToken we have is expired, we use our refresh token and get a new one
const getNewToken = async (refreshToken) => {
  try {
    const data = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id:
        "825050207640-dl3lgst2p52hnorr4he6c6k125pn2n9f.apps.googleusercontent.com",
      client_secret: "5ZGcr4Hucthn36dNJbRcXrmC",
    };

    const fetchResponse = await fetch(
      "https://accounts.google.com/o/oauth2/v2/auth",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const newAccessToken = await fetchResponse.json();
    //todo add return once we know what is returned
  } catch (e) {
    return null;
  }
};

// requestData returns either an object with user data or an error of invalid_token
const requestData = async (accessToken) => {
  const fetchResponse = await fetch(
    `https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names%2Cperson.photos&key=${CLIENT_API_KEY}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const jsonResponse = await fetchResponse.json();

  let data = {
    id: jsonResponse.names[0].metadata.source.id,
    name: jsonResponse.names[0].displayName,
    photo: jsonResponse.photos[0].url
  }

  fetch("https://predestination-service.herokuapp.com/userdata", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! Response:", res);
  });



  // console.log(jsonResponse.names[0].metadata.source.id)
  // console.log(jsonResponse.names[0].displayName)
  // console.log(jsonResponse.photos[0].url)

  if (
    jsonResponse.error !== undefined &&
    jsonResponse.error == "invalid_token"
  ) {
    throw "invalid_token";
  } else {
    return {

      id: jsonResponse.names[0].metadata.source.id,
      name: jsonResponse.names[0].displayName,
      photo: jsonResponse.photos[0].url,

    };
  }
};

// fetch('predestination-service.herokuapp.com/login', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     firstParam: getUserData().,
//     secondParam: 'yourOtherValue'
//   })
// }).catch((error) => {
//   console.error(error);
// })

 // store authentication stuff like access tokens and refresh tokens so we can remember user's logging in
const storeAuthenticationTokens = async (accessToken, refreshToken) => {
  try {
    const jsonValue = JSON.stringify({ accessToken, refreshToken });
    await AsyncStorage.setItem("@google-authentication", jsonValue);
  } catch (e) {
    // saving error
    console.log("Couldn't save tokens...");
  }
};

// https://react-native-community.github.io/async-storage/docs/usage
// return authentication tokens
const getAuthenticationTokens = async () => {
  const jsonValue = await AsyncStorage.getItem("@google-authentication");
  if (jsonValue === null) {
    throw null;
  }
  const json = JSON.parse(jsonValue);
  return json;
};

/**
 * getUserData on success will return a user object
 * If accessToken is expired, the refreshToken will be tried once. If neither works, an error is thrown.
 *
 * @returns { id, name, photo }
 */
export async function getUserData() {
  const { accessToken, refreshToken } = await getAuthenticationTokens();
  try {
    // try with original access token
    let data = await requestData(accessToken);
    // JSON.stringify(data);
    // fetch('https://predestination-service.herokuapp.com/login', {
    //   method: 'POST',
    //   body: data
    // }).catch((error) => {
    //   console.log("An error sending login data occurred", error);
    // });
    console.log(data);
    return data;
  } catch (e) {
    // try getting a new access token with refreshToken (invalid_token means token is expired)
    if (e === "invalid_token") {
      const newToken = await getNewToken(refreshToken);
      data = await requestData(newToken);
      return data;
    } else {
      throw e;
    }
  }
}

/**
 * signOut signs user out of session by revoking accessToken
 */
export async function signOutOfGoogle() {
  const { accessToken } = await getAuthenticationTokens();
  await Google.logOutAsync({ accessToken, ...config });
  await storeAuthenticationTokens("", ""); //for some reason just logging out with Google.logOutAsync does not terminate the access token
}

/**
 * signInWithGoogle redirects to google's login page, where the application requests user consent
 * If consent is given and no errors occur, the authentication tokens are stored, which will represent the user being logged in.
 * This function should be called when the user clicks a "sign in" button on the main page.
 */
export async function signInWithGoogle() {
  // ask user for consent to gather public profile information
  const { type, accessToken, user, refreshToken } = await Google.logInAsync({
    androidClientId:
      "825050207640-q3qlm3h4i43vbcikfc3avv6av5g0us05.apps.googleusercontent.com",
    iosClientId:
      "825050207640-eabv7h5qctuv9csnhaio7s8pfnncg0ff.apps.googleusercontent.com",
    scopes: ["profile"],
  });

  // on success, return information along with accessToken to parent
  if (type == "success") {
    storeAuthenticationTokens(accessToken, refreshToken);
  } else {
    throw null;
  }
}

export const LOGIN_STATUS = {
  LOADING: "loading",
  NEW_USER: "new_user",
  GOOGLE_USER: "google_user",
};

export const AuthenticationContext = React.createContext({
  loginStatus: LOGIN_STATUS.LOADING,
  setLoginStatus: null,
});
