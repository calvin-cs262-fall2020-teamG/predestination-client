import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import Header from '../shared/header';

import { globalStyles }  from '../styles/global';

const Stack = createStackNavigator();

export default function AccountStack( {navigation} ) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: () =>  <Header navigation={navigation} />,   
                headerTitleStyle: globalStyles.titleText,             
            }}
        >
            <Stack.Screen
                name="Your Account"
                component={AccountScreen}
            />
        </Stack.Navigator>
    );
};