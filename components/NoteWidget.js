import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

/**
 * NoteWidget shows the clue along with the location hinted at by the clue
 * TODO: styling, add location indicator (maybe a link to a map?)
 */

export const NOTE_TYPE = {
  FIRST: 'first',
  LAST: 'last',
  MIDDLE: 'middle',
}

export default function NoteWidget({ content, focused, archived, points, first, last, onPress, id }) {

  return (

    <View style={{
      ...styles.mainContainer,
      ...(first ? styles.topNote : null),
      ...(last ? styles.bottomNote : null),
      ...(archived ? styles.archived : styles.normal),
      ...((last && archived) ? styles.lastArchivedNote : null),
    }}>
      <TouchableOpacity onPress={() => { onPress(id); }}>
        <View style={styles.contentContainer}>
          <View style={styles.contentSection}>
            <Text numberOfLines={1} style={styles.contentText}>{content}</Text>
          </View>

          <View style={styles.pointSection}>
            <Text style={styles.pointText}>{points}</Text>
          </View>
        </View>



      </TouchableOpacity>
    </View>

  );
}

const radius = 7;

const styles = StyleSheet.create({
  archived: {
    backgroundColor: '#E8E8E8',
  },
  lastArchivedNote: {
    marginBottom: 20,
  },
  topNote: {
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    marginTop: 20,
  },
  bottomNote: {
    borderBottomRightRadius: radius,
    borderBottomLeftRadius: radius,
    borderBottomWidth: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 15,
  },
  mainContainer: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderBottomWidth: 0,
    marginLeft: 20,
    marginRight: 20,
  },
  contentSection: {
    flex: 2,
    paddingRight: 10,
    justifyContent: 'center',
  },
  contentText: {

  },
  pointSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  pointText: {
    fontSize: 24,
    paddingRight: 2,
  },

});
