import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartStack from './start/StartStack';
import SeekerStack from './seeker/seekerStack';
import KeeperStack from './keeper/keeperStack';

const Stack = createStackNavigator();

/**
 * HomeStack is displayed only when a user is logged in
 */
export default function HomeStack({ navigation }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="StartStack" component={StartStack} />

            <Stack.Screen name="SeekerStack" component={SeekerStack} />

            <Stack.Screen name="KeeperStack" component={KeeperStack} />

        </Stack.Navigator>
    );
};
