import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SeekerGameScreen from '../../../../screens/seeker/SeekerGameScreen';
import SeekerTrackerStack from './SeekerTrackerStack';

const Tab = createBottomTabNavigator();

export default function SeekerGameTabStack() {
  return (
    <NavigationContainer

    >
      <Tab.Navigator>
        <Tab.Screen name="Stats" component={SeekerGameScreen} />
        <Tab.Screen name="Tracker" component={SeekerTrackerStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
