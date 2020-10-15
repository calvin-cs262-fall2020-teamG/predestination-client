import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Alert, View, Text, } from 'react-native';

import LoginStack from '../routes/loginStack';
import Drawer from '../routes/drawer';
import { ActivityIndicator } from 'react-native';
import { LOGIN_STATUS, AuthenticationContext } from '../src/GoogleAuthentication';
import { NavigationContainer } from '@react-navigation/native';
import { setStatusBarBackgroundColor } from 'expo-status-bar';


const Stack = createStackNavigator();

/**
 * MainStack is the entire application, including both screens before and after a user logs in
 */
export default function MainStack() {

    const [loginStatus, setStatus] = useState(LOGIN_STATUS.LOADING);

    return (
        <AuthenticationContext.Provider
            value={{
                loginStatus: LOGIN_STATUS.LOADING,
                setLoginStatus: (newStatus) => { setStatus(newStatus); }
            }}>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>

                {
                    ((loginStatus === LOGIN_STATUS.NEW_USER || loginStatus === LOGIN_STATUS.LOADING) && <Stack.Screen name="Login" component={LoginStack} options={{ title: 'Login' }} />) ||
                    (loginStatus === LOGIN_STATUS.GOOGLE_USER && <Stack.Screen name="Drawer" component={Drawer} options={{ title: 'Drawer' }} />)
                }

            </Stack.Navigator>

        </AuthenticationContext.Provider>
    );
};