import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../../styles/global';

import {GameContext } from '../../src/Notes';
import { PROXIMITY_MESSAGES, PROXIMITY } from '../../src/Proximity';
import Circle from '../../components/Circle';
import TrackerTargetVisualizer from '../../components/TrackerVisualizer';

const PROXIMITY_ARRAY = [
  "FAR",
  "CLOSE",
  "SUCCESS_START",
];

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: connecting tempCount and proximity to gps
 */
export default function SeekerFocusedScreen({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState(false); // for help icon
  
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

  const [proximity, setProximity] = useState(PROXIMITY.FAR);
  const [tempCount, setTempCount] = useState(0);

   useEffect(() => {
    if (proximity === "SUCCESS_START") {
      findClue();
    }
   }, [proximity]);

  useEffect(() => {
    setProximity(PROXIMITY_ARRAY[tempCount]);
    
  }, [tempCount]);

  // todo: for debugging purposes only to show all the levels of proximity to given location
  const nextProximity = () => {
    if (selectedClue !== null) {
      setTempCount((tempCount + 1) % 3);
    }
  };

  
  return (
    <Animated.View
      style={{
        ...styles.flexContainer,
      }}
    >
      <Modal visible={modalOpen} animationType='slide'>
          <View>
            {/* <MaterialIcons
              name='close'
              size={24}
              onPress={() => setModalOpen(false)}
              style={styles.modalCloseIcon}
            /> */}
            <Text style={styles.modalContent}>
              This page will show how close you are to the clue you are trying
              to find.{'\n\n'}
              The top of the page contains a visual indicator of three overlaid
              circles called a target. {'\n\n'}
              As you get closer to the clue, the target will “zoom” in. Once you
              are close enough to the clue, this animation will show a
              congratulations message. {'\n\n'}
              If you find the clue you picked is too difficult to find, you may
              use the green button labeled “NEW” to select another clue.{' '}
              {'\n\n'}
              When you first visit this page, you will find a button labeled
              “SELECT CLUE.” You must press this button and select a clue from
              the list provided before you can progress through the game.
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
        <TouchableOpacity 
          onPress={() => { nextProximity(); }}
          activeOpacity={0.5}
          style={{
                flex: 3,
                height: "100%",
                width: "100%",
                maxWidth: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}>
          <TrackerTargetVisualizer proximity={proximity} points={selectedClue === null ? 0 : selectedClue.points} />  
        </TouchableOpacity>
      

      <View style={styles.bottomContainer}>
        <View style={styles.bottomContainerHeader}>
          <View
            style={{
              ...styles.pointContainer,
              display: selectedClue === null ? 'none' : 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              {selectedClue === null
                ? ''
                : selectedClue.points}{' '}
              Points
            </Text>
          </View>
          <View style={styles.stuckButton}>
            <CustomButton
              color='orange'
              title={
                selectedClue === null
                  ? 'Select Clue'
                  : proximity === 'SUCCESS'
                    ? 'New'
                    : 'Stuck'
              }
              onPress={() => {
                navigation.navigate('TrackerListScreen');
              }}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
            width: '90%',
            alignSelf: 'center',
            display: selectedClue === null ? 'none' : 'flex',
          }}
        />
        <ScrollView
          style={{
            ...styles.noteContainer,
            display: selectedClue === null ? 'none' : 'flex',
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: 50 }}>
            {selectedClue === null
              ? 'This should not be shown'
              : selectedClue.description}
          </Text>
        </ScrollView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  farCircle: {
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeCircle: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  atCircle: {
    backgroundColor: 'yellow',
  },
  sillyText: {
    fontSize: 20,
  },
  officialText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  officialMessageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sillyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  stuckButton: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteContainer: {
    alignSelf: 'flex-start',
    minHeight: 100,
    padding: 20,
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    height: '30%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pointContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomContainerHeader: {
    marginBottom: 5,
    marginTop: 15,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  gameButton: {
    marginBottom: 20,
    marginTop: 20,
  },

  // modal styles
  modalHelpIcon: {
    color: '#5CDB95',
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
