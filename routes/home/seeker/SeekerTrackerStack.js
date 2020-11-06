import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TrackerScreen from '../../../../screens/seeker/Tracker';
import TrackerListScreen from '../../../../screens/seeker/TrackerList';

import { LOGIN_STATUS, AuthenticationContext } from '../../../../src/GoogleAuthentication';

const Stack = createStackNavigator();

/**
 * TrackerStack provides two pages for the seekers when tracking down a clue: 
 * 1. the first is the tracker which gives visual feedback on the location of the clue in relation to the user (TrackerScreen)
 * 2. the second is simply a list of clues available to choose from in case the user wants to try another clue
 */
export default function TrackerStack({ navigation }) {
    
    return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>

                <Stack.Screen name="Tracker" component={TrackerScreen} options={{ title: "Tracker" }}/>
                <Stack.Screen name="TrackerList" component={TrackerListScreen} options={{ title: 'TrackerList' }} />

            </Stack.Navigator>
    );
};