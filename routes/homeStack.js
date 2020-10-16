import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartStack from '../routes/StartStack';
import SeekerStack from '../routes/seekerStack';
import KeeperStack from '../routes/keeperStack';

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
