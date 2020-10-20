import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../shared/header';
import { globalStyles } from '../styles/global';

// import seeker screens
import SeekerWaitingScreen from '../screens/seeker/SeekerWaitingScreen';
import SeekerGameScreen from '../screens/seeker/SeekerGameScreen';
import SeekerClueListScreen from '../screens/seeker/SeekerClueList';
import SeekerFocusedScreen from '../screens/seeker/SeekerFocusedScreen';


const Stack = createStackNavigator();

/**
 * HomeStack is displayed only when a user is logged in
 */
export default function SeekerStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: () => <Header navigation={navigation} customStyle={globalStyles.seekerNavigationDrawer}/>,
                headerTitleStyle: globalStyles.seekerNavigationTitle,
                headerStyle: globalStyles.seekerNavigationHeader,
            }}
        >
            
            <Stack.Screen name="SeekerWaitingScreen" component={SeekerWaitingScreen} options={{ title: 'SeekerWaitingScreen' }} />
            <Stack.Screen name="SeekerGameScreen" component={SeekerGameScreen} options={{ title: 'SeekerGameScreen' }} />
            <Stack.Screen name="SeekerClueListScreen" component={SeekerClueListScreen} options={{ title: 'SeekerClueListSCreen'}} />
            <Stack.Screen name="SeekerFocusedScreen" component={SeekerFocusedScreen} options={{ title: 'SeekerFocusedScreen '}}/>
        </Stack.Navigator>
    );
};
