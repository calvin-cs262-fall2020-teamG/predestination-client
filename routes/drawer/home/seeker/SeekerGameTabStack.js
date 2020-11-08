import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'react-native';

import SeekerGameScreen from '../../../../screens/seeker/SeekerGameScreen';
import SeekerTrackerStack from './SeekerTrackerStack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function SeekerGameTabStack() {
  return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
        }}
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused }) => {
            let icon = route.name === 'Tracker' ? 'target' : 'format-list-numbered';
            let fontColor = focused ? '#5CDB95' : 'gray';
            
            return (
              <Icon name={icon} size={30} color={fontColor}/>
            )
          }
        })}
      >
        <Tab.Screen name="Stats" component={SeekerGameScreen} />
        <Tab.Screen name="Tracker" component={SeekerTrackerStack} />
      </Tab.Navigator>
  );
}
