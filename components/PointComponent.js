import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Card from '../components/Card';

import { GameContext } from '../src/Notes';

/**
 * CustomButton uses touchable opacity and styling to provide a better looking button than the provided Button class in react native
 */
export default function PointComponent({ points, notes, onPress }) {
  
  const { 
    gameLog,
    playerID,
   } = useContext(GameContext);
  
  return (
    <View>
      <View style={styles.pointTextContainer}>
        <Text style={styles.pointText}> - {points} Points - </Text>
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card 
            content={item.description}
            id={item.id}
            onPress={onPress} 
            completed={
              gameLog.filter(log => {
                return log.clueid === item.id && log.playerid === playerID;
              }).length > 0
            }
          />
        )}
      />
    </View>
  );
}

const radius = 7;

const styles = StyleSheet.create({
  pointTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  pointText: {
    fontSize: 24,
    color: 'gray',
  },
});
