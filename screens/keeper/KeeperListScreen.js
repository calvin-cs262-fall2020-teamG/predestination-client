import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

import RouteCard from '../../components/RouteCard';

/**
 * KeeperListScreen shows list of all routes saved by a keeper. A keeper can publish and edit routes. Once published, the keeper will be given the KeeperGameScreen.
 * TODO: styling, connecting to server, way to delete routes
 */

export default function KeeperListScreen({ navigation }) {

  const [routeList, setRoutes] = useState([
    { key: '1', title: 'Quest Group Hunt', notes:
          [
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
            { clue: 'Go to big cheese! This one clue is on me! You\'re welcome!', location: 'cheese' },
            { clue: 'Go to CFAC. May the fastest one win', location: 'cfac' },
          ]
    },
    { key: '2', title: 'Test', notes: [] },
    { key: '3', title: 'Cross Country Fun Run', notes: [] },
  ]);

  const pressPublish = (hunt) => {
    navigation.navigate('KeeperWaitingScreen', { hunt });
  };

  const pressEdit = (hunt) => {
    navigation.navigate('KeeperEditorScreen', { hunt });
  };
  
  return (
    <View>
      <View>
        <FlatList
          data={routeList}
          renderItem={({ item }) => (
            <RouteCard data={item} pressPublish={pressPublish} pressEdit={pressEdit} />
          )}
        />
      </View>
      
      <View>
        <Button title='New' onPress={() => {}}/>
        
      </View>
    </View>
  );
}




