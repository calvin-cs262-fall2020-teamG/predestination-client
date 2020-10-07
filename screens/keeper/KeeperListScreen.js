import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

import RouteCard from '../../components/RouteCard';
import AddNewRoute from "../../components/AddNewRoute";

/**
 * KeeperListScreen shows list of all routes saved by a keeper. A keeper can publish and edit routes. Once published, the keeper will be given the KeeperGameScreen.
 * TODO: styling, connecting to server, way to delete routes
 */

export default function KeeperListScreen({ navigation }) {

  const [routes, setRoutes] = useState([
    { key: '1', title: 'Quest Group Hunt', notes: [
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
        ]},
    { key: '2', title: 'Test', notes: [] },
    { key: '3', title: 'Cross Country Fun Run', notes: [] },
  ]);

  /*
  * submitHandler adds a new route to the FlatList
  * based on what the user specified in the required fields
  * (name, players, etc.)
  */
  const submitHandler = (title) => {
      setRoutes((prevRoutes) => {
          return [
              { title: title, key: Math.random().toString() },
              ...prevRoutes
          ]
      })
  }

  const pressPublish = (hunt) => {
    navigation.navigate('KeeperWaitingScreen', { hunt });
  };

  const pressEdit = (hunt) => {
    navigation.navigate('KeeperEditorScreen', { hunt });
  };
  
  return (
    <View>
      <View>
          {/* Pass the submitHandler as prop to the addNewRouteComponent */}
          <AddNewRoute submitHandler={submitHandler} />
          {/* This FlatList contains the list of routes created by the keeper */}
        <FlatList
          data={routes}
          renderItem={({ item }) => (
            <RouteCard data={item} pressPublish={pressPublish} pressEdit={pressEdit} />
          )}
        />
      </View>
    </View>
  );
}