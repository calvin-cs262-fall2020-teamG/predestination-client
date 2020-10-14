import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

/**
 * LoginStack simply displays LoginScreen
 */
export default function LoginStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="LoginScreen"
                component={LoginScreen}
                options={{ title: 'LoginScreen' }}
                />
        </Stack.Navigator>
    );
};
