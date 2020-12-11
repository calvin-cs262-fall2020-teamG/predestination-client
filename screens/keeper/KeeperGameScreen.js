import React, { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import Leaderboard from "react-native-leaderboard";
import { globalStyles } from "../../styles/global";
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';


/**
 * KeeperGameScreen will show the current status of players similar to SeekerGameScreen, with the addition of a few features
 * 1. ability to broadcast hints for a specific clue
 * 2. some easy graph or visual of how much time people are spending per clue
 * TODO: styling, components, and everything actually
 */

export default function KeeperGameScreen({ navigation }) {
  const [keeperLeaderboard, setKeeperLeaderboard] = useState(
    //   data for the leaderboard
    [
      { userName: "JBrink", clueStatus: 2 },
      { userName: "NWang", clueStatus: 2 },
      { userName: "AScaria", clueStatus: 3 },
      { userName: "EWalters", clueStatus: 3 },
      { userName: "HAnderson", clueStatus: 2 },
    ]


  );

  const [modalOpen, setModalOpen] = useState(false); // for help icon

  return (
    <View>
      <Modal visible={modalOpen} animationType='slide'>
        <View>
          {/* <MaterialIcons
            name='close'
            size={24}
            onPress={() => setModalOpen(false)}
            style={styles.modalCloseIcon}
          /> */}
          <Text style={styles.modalContent}>
            Note that the Keeper’s side in the current version of our
            application is under development.
            {'\n\n'}
            Once we are able to fully complete development for this side,
            Keepers will be able to view live leaderboard updates here from the ongoing scavenger hunt.
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
      <Text style={globalStyles.leaderBoardHeader}> Leaderboard </Text>
      {/* display leaderboard */}
      <View>
        <Text>{'\n'}</Text>
      </View>
      <Leaderboard
        data={keeperLeaderboard}
        sortBy="clueStatus" //sorts the leaderboard by clueStatus
        labelBy="userName" //displays the userName for the rank
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // modal style below
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
})