import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../shared/header';
import { globalStyles } from '../styles/global';

import StartScreen from '../screens/StartScreen';

const Stack = createStackNavigator();

/**
 * HomeStack is displayed only when a user is logged in
 */
export default function StartStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: () => <Header navigation={navigation} customStyle={globalStyles.startNavigationDrawer}/>,
                headerTitleStyle: globalStyles.startNavigationTitle,
                headerStyle: globalStyles.startNavigationHeader,
            }}
        >
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ title: 'Welcome' }} />
        </Stack.Navigator>
    );
};
