import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../shared/header';
import { globalStyles } from '../styles/global';

import LoginStack from '../routes/loginStack';
import Drawer from '../routes/drawer';

const Stack = createStackNavigator();

/**
 * MainStack is the entire application, including both screens before and after a user logs in
 */
export default function MainStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="LoginStack"
                component={LoginStack}
                options={{ title: "LoginStack" }}
                />
            <Stack.Screen
                name="Drawer"
                component={Drawer}
                options={{ title: "Drawer"}}
            />
        </Stack.Navigator>
    );
};