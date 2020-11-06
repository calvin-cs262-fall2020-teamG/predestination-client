import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import SeekerGameScreen from '../../../../screens/seeker/SeekerGameScreen';
import SeekerTrackerStack from './SeekerTrackerStack';
import { globalStyles } from '../../../styles/global';

const Tab = createBottomTabNavigator();

export default function SeekerGameTabStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Stats') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Tracker') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Stats" component={SeekerGameScreen} />
        <Tab.Screen name="Tracker" component={SeekerTrackerStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
