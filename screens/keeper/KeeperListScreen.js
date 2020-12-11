import React, { useState } from "react";
import { View, FlatList, Alert, Text, Modal, StyleSheet } from "react-native";
import RouteCard from "../../components/RouteCard";
import AddNewRoute from "../../components/AddNewRoute";
import { globalStyles } from "../../styles/global";
import { MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';

/**
 * KeeperListScreen shows list of all routes saved by a keeper. A keeper can publish and edit routes. Once published, the keeper will be given the KeeperGameScreen.
 * TODO: styling, connecting to server, way to delete routes
 */

export default function KeeperListScreen({ navigation }) {
  const [routes, setRoutes] = useState([
    {
      key: "1",
      title: "Quest Group Hunt",
      notes: [
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
        {
          clue: "Go to big cheese! This one clue is on me! You're welcome!",
          location: "cheese",
        },
        { clue: "Go to CFAC. May the fastest one win", location: "cfac" },
      ],
    },
    { key: "2", title: "Test", notes: [] },
    { key: "3", title: "Cross Country Fun Run", notes: [] },
  ]);

  /*
   * submitHandler adds a new route to the FlatList
   * based on what the user specified in the required fields
   * (name, players, etc.)
   */
  const submitHandler = (title) => {
    if (!title.trim()) {
      Alert.alert("Name cannot be empty");
    } else {
      setRoutes((prevRoutes) => {
        return [{ title: title, key: Math.random().toString() }, ...prevRoutes];
      });
    }
  };

  const pressPublish = (hunt) => {
    navigation.navigate("KeeperWaitingScreen", { hunt });
  };

  const pressEdit = (hunt) => {
    navigation.navigate("KeeperEditorScreen", { hunt });
  };

  const [modalOpen, setModalOpen] = useState(false); // for help icon

  return (
    <View>
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
              Keepers will be able to view, edit, and publish their scavenger hunts here.
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

        {/* Pass the submitHandler as prop to the addNewRouteComponent */}
        <AddNewRoute submitHandler={submitHandler} />
        {/* This FlatList contains the list of routes created by the keeper */}
        <View>
          <FlatList
            data={routes}
            renderItem={({ item }) => (
              <RouteCard
                data={item}
                pressPublish={pressPublish}
                pressEdit={pressEdit}
              />
            )}
          />
        </View>
      </View>
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