import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

import RouteCard from '../../components/RouteCard';
import KeeperNewHuntScreen from "./KeeperNewHuntScreen";

/**
 * KeeperListScreen shows list of all routes saved by a keeper. A keeper can publish and edit routes. Once published, the keeper will be given the KeeperGameScreen.
 * TODO: styling, connecting to server, way to delete routes
 */

export default function KeeperListScreen({ navigation }) {

  const [routes, setRoutes] = useState([
    { key: '1', title: 'Quest Group Hunt', notes: []},
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
        {/* This will bring Keepers to the NewHuntScreen where they can enter a title for the hunt, add minimum number
        of players, and set a time limit - Added by Ethan*/}
        <View>
            <Button title='New' onPress={() => {
                navigation.navigate(('KeeperNewHuntScreen'))
            }}/>
        </View>
      <View>
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




