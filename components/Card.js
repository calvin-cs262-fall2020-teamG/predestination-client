import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';

/**
 * NoteWidget shows the clue along with the location hinted at by the clue
 * TODO: styling, add location indicator (maybe a link to a map?)
 */

export const NOTE_TYPE = {
  FIRST: 'first',
  LAST: 'last',
  MIDDLE: 'middle',
};

const profilePictureListExample = [
  'https://lh3.googleusercontent.com/-C1t5NSkvNfE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclIEh48lSLxJGxP02RUHwmiMBJ1GA/photo.jpg',
  'https://secure.gravatar.com/avatar/0b1c2362e0657d5fdbed5aaea05c0a2a?d=https://content.invisioncic.com/s281895/monthly_2017_11/G_member_26973.png',
  'https://lh3.googleusercontent.com/-Nj31lomoF8c/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucknJjEhOP4abqDxBYePvQ5GpkDbQw/photo.jpg',
];

export default function Card({ content, onPress, id, completed }) {
  return (
    <View style={{
      ...styles.mainContainer,
      backgroundColor: completed ? 'lightgray' : 'white',
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (completed) {
            Alert.alert('This clue has already been completed!');
          } else {
            onPress(id);
          }
        }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>{content} </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const radius = 7;

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: 7,
    backgroundColor: 'white',
  },
  contentSection: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentText: {
    fontSize: 15,
  },
});
