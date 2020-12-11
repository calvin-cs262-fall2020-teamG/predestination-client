import React, { useEffect, useState, useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';

import { getUserData } from '../../src/GoogleAuthentication';
import {
  LOGIN_STATUS,
  AuthenticationContext,
} from '../../src/GoogleAuthentication';

import CustomButton from '../../components/CustomButton';
import Leaderboard from 'react-native-leaderboard';

import { NotesContext, NotePack } from '../../src/Notes';
import { globalStyles } from '../../styles/global';
import { MaterialIcons } from '@expo/vector-icons';

/**
 * SeekerGameScreen shows all past clues and current clue to all seekers. The screen is personalized for each seeker, showing their placement and relative rank to other players.
 * TODO: styling, connecting to server
 */
export default function SeekerGameScreen({ route, navigation }) {
  const { notePack } = useContext(NotesContext);
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState('Calculating...'); // need to get live rank
  const [time, setTime] = useState('-');
  const [modalOpen, setModalOpen] = useState(false);

  const STATUS = {
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error',
  };

  const [googleUserName, setUserName] = useState(null);
  const [googleUserPhoto, setUserPhoto] = useState(null);
  const [status, setStatus] = useState(STATUS.LOADING);

  const { loginStatus, setLoginStatus } = useContext(AuthenticationContext);
  //leaderboard added by NW on Oct 30 at 2AM. Will need to match with KeeperGameScreen.js in the future (connect to database)
  const [keeperLeaderboard, setKeeperLeaderboard] = useState(
    //   data for the leaderboard
    [
      { userName: 'JBrink', clueStatus: 2 },
      { userName: 'NWang', clueStatus: 2 },
      { userName: 'AScaria', clueStatus: 3 },
      { userName: 'EWalters', clueStatus: 3 },
      { userName: 'HAnderson', clueStatus: 2 },
    ]
  );

  // When seekers click the "hunt" button, they will be redirected to the last clue selected if they selected a clue, else they will go to a clue list screen
  const pressHunt = () => {
    if (notePack.getFocused() === null) {
      navigation.navigate('SeekerClueListScreen');
    } else {
      navigation.navigate('SeekerFocusedScreen');
    }
  };

  const loadData = async () => {
    try {
      const { name, photo } = await getUserData();
      setUserName(name);
      setUserPhoto(googleUserPhoto);
      setKeeperLeaderboard([
        ...keeperLeaderboard,
        { userName: name, clueStatus: notePack.getPoints() },
      ]);
      setStatus(STATUS.LOADED);
    } catch (err) {
      console.log(err);
      setStatus(STATUS.ERROR);
    }

    // getUserData()
    //     .then(({ googleUserName, googleUserPhoto }) => {
    // 	setUserName(googleUserName);
    // 	setUserPhoto(googleUserPhoto);
    //     })
    //     .then(() => {
    // 	setStatus(STATUS.LOADED);
    //     })
    //     .catch((e) => {
    // 	setStatus(STATUS.ERROR);
    //     });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setKeeperLeaderboard([
      ...keeperLeaderboard.filter((elem) => {
        return elem.userName !== googleUserName;
      }),
      { userName: googleUserName, clueStatus: notePack.getPoints() },
    ]);
  }, [notePack.getPoints()]);

  // let imagePath = require("../../assets/list.png");

  return (
    <View style={styles.flexContainer}>
      <Modal visible={modalOpen} animationType='slide'>
        <View>
          {/* <MaterialIcons
            name='close'
            size={24}
            onPress={() => setModalOpen(false)}
            style={globalStyles.modalCloseIcon}
          /> */}
          <Text style={globalStyles.modalContent}>
            This page shows the current stats for the game.
            {'\n\n'}
            It shows the seekers’ number of points, the time remaining, and
            their rank.
            {'\n\n'}
            It also has a dynamically updating leaderboard that shows the seeker
            by order of rank.
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

      <ImageBackground
        source={require('../../assets/background_tres.png')}
        blurRadius={5}
        style={styles.image}
      >
        <View style={styles.header}>
          <View style={styles.pointsSection}>
            <Text style={styles.pointText}> {notePack.getPoints()} </Text>
            <Text> Points </Text>
          </View>
          <View style={styles.statusSection}>
            <View style={styles.timeSection}>
              <Text style={styles.timeText}> {time} </Text>
              <Text> Time Left </Text>
            </View>
            <View style={styles.rankSection}>
              <Text style={styles.rankText}> {rank} </Text>
              <Text> Rank </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomSection}>
        <View>
          <Text style={globalStyles.leaderBoardHeader}> Leaderboard </Text>
          <Leaderboard
            data={keeperLeaderboard}
            sortBy='clueStatus' //sorts the leaderboard by clueStatus
            labelBy='userName' //displays the userName for the rank
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pointText: {
    textAlign: 'center',
    fontSize: 64,
  },
  timeText: {
    textAlign: 'center',
    fontSize: 24,
  },
  rankText: {
    textAlign: 'center',
    fontSize: 24,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 5,
  },
  pointsSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 50,
    marginTop: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  // for modal styling
  modalHelpIcon: {
    color: 'grey',
    position: 'absolute',
    zIndex: 1,
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
