import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { color } from 'react-native-reanimated';
import PointComponent from '../../components/PointComponent';

import { GameContext } from '../../src/Notes';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../../styles/global';
/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to server
 */
export default function SeekerClueList({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState(false); // for help icon

  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const { 
    points,
    clueData,
    playerData,
    gameLog,
    selectedClue,
    setSelectedClue,
    findClue,
    setupGame,
   } = useContext(GameContext);

  const onPress = (key) => {
    setSelectedClue(key);
    navigation.navigate('TrackerScreen');
  };

  return (
    <View style={globalStyles.trackerListFlexContainer}>
      <Modal visible={modalOpen} animationType='slide'>
        <View>
          {/* <MaterialIcons
            name='close'
            size={24}
            onPress={() => setModalOpen(false)}
            style={styles.modalCloseIcon}
          /> */}
          <Text style={styles.modalContent}>
            On this page, simply scroll through the selection of clues to find
            one that looks appealing to you.
            {'\n\n'}
            Each clue is worth a certain amount of points. When you find a clue
            that you want, tap it and you will return to the tracker orb to
            continue your hunt.
            {'\n\n'}
          </Text>
          <View>
            <CustomButton title='close' onPress={() => setModalOpen(false)} color='gold' />
          </View>
        </View>
      </Modal>

      <MaterialIcons
        name='help-outline'
        size={24}
        onPress={() => setModalOpen(true)}
        style={styles.modalHelpIcon}
      />
      <FlatList
        data={clueData
          .map((item) => item.points)
          .filter(onlyUnique)
          .sort((a, b) => {
            return b - a;
          })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <PointComponent
            points={item}
            onPress={onPress}
            notes={clueData.filter((note) => {
              return note.points === item;
            })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // modal styles
  modalHelpIcon: {
    color: 'grey',
    zIndex: 1,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalCloseIcon: {
    margin: 15,
  },
  modalContent: {
    padding: 30,
    fontSize: 16,
  },
});
