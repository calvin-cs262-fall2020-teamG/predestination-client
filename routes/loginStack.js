import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

/**
 * LoginStack simply displays LoginScreen
 */
export default function LoginStack({ navigation, route }) {
    return (
           <Stack.Navigator>
             <Stack.Screen 
                name="LoginScreen"
                component={ LoginScreen }
                options={{ title: 'LoginScreen' }}
                initialParams={{ setLoginStatus: route.params.setLoginStatus }}
                />
            </Stack.Navigator>
    );
};
