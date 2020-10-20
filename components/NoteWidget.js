import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

/**
 * NoteWidget shows the clue along with the location hinted at by the clue
 * TODO: styling, add location indicator (maybe a link to a map?)
 */

export const NOTE_TYPE = {
  FIRST: 'first',
  LAST: 'last',
  MIDDLE: 'middle',
}

const profilePictureListExample = [
  'https://lh3.googleusercontent.com/-C1t5NSkvNfE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclIEh48lSLxJGxP02RUHwmiMBJ1GA/photo.jpg',
  'https://secure.gravatar.com/avatar/0b1c2362e0657d5fdbed5aaea05c0a2a?d=https://content.invisioncic.com/s281895/monthly_2017_11/G_member_26973.png',
  'https://lh3.googleusercontent.com/-Nj31lomoF8c/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucknJjEhOP4abqDxBYePvQ5GpkDbQw/photo.jpg',
];

export default function NoteWidget({ content, points, onPress, id }) {

  return (

    <View style={{
      ...styles.mainContainer, 
    }}>
      <TouchableOpacity activeOpacity={1} onPress={() => { onPress(id); }}>
        <View style={styles.contentContainer}>
          <View style={{
            ...styles.contentSection,
            }}>
            <Text style={styles.contentText}>{content}</Text>
          </View>

          <View style={styles.bannerSection}>
            <View style={styles.bannerSubSection}><Text>Checkmark here</Text></View>
            <View style={styles.bannerSubSection}>
            <FlatList
                    horizontal={true}
                    data={profilePictureListExample}
                    renderItem={({ item, index }) => (
                      <Image
                      style={{ width: 20, height: 20, marginLeft: 5 }}
                      source={{
                        uri: item,
                      }}
                    />
                    )}
                />
            </View>
            <View style={styles.bannerSubSection}><Text style={styles.pointText}>{points}</Text></View>
          </View>
        </View>



      </TouchableOpacity>
    </View>

  );
}

const radius = 7;

const styles = StyleSheet.create({
  contentText: {
    fontSize: 15,
  },  
  archived: {
    backgroundColor: '#E8E8E8',
  },
  bannerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',

  },
  mainContainer: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    marginTop: 10,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
    flex: 1,
    borderRadius: 7,
  },
  contentSection: {
    flex: 2,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  bannerSubSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  pointText: {
    fontSize: 24,
    paddingRight: 5,
  },

});
