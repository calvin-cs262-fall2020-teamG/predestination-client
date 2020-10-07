import React, { useState } from 'react';

import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';

export default function NativeGoogleLogin({ sendUserData, loginFailed }) {
    
    GoogleSignin.configure({
        //scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile TODO: change this
        webClientId: '825050207640-dl3lgst2p52hnorr4he6c6k125pn2n9f.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
    
    // SignIn PopUp
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            sendUserData(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
	        // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
	        // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
	        // play services not available or outdated
                loginFailed("playservices");
            } else {
	        // some other error happened
                loginFailed("unknown");
            }
        }
    };

    // Attempt to SignIn using past login, run signIn popup in case of failure
    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            sendUserData(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                // do nothing and display button
            } else {
                // some other error
            }
        }
    };

    getCurrentUserInfo();

    return (
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={false} />
    );
}

