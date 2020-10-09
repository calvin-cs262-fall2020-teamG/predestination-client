import { StyleSheet, View } from "react-native";

export const globalStyles = StyleSheet.create({
  // start styles from StartScreen.js
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  titleSection: {
    flex: 1,
    width: "100%",
  },
  entrySection: {
    flex: 2,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    fontSize: 70,
    textAlign: "center",
  },
  joinButton: {
    paddingTop: 20,
    width: "50%",
  },
  createButton: {
    paddingTop: 15,
    width: "30%",
    textAlign: "center",
  },
  // end styles from StartScreen.js

  // start styles from SeekerGameScreen.js
  flexContainer: {
    flexDirection: "column",
    flex: 1,
  },
  header: {
    flex: 5,
    backgroundColor: "skyblue",
  },
  scrollable: {
    flex: 15,
  },
  scrollableNotes: {},
  progressSection: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "lightgray",
  },
  // end styles from SeekerGameScreen.js

  //added by Nathan Wang on Oct 5 11:50PM
  // start styles from KeeperGameScreen.js
  nextButton: {
    padding: 20,
    margin: 100,
    borderStyle: "dotted",
    borderWidth: 2,
    borderRadius: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "maroon",
    backgroundColor: "gold",
  },
  // end styles from KeeperGameScreen.

  // added by Advait Scaria on Oct 9
  // start styles from KeeperEditorScreen.js
  list: {
    flex: 1,
    marginTop: 20
  },
  clueInput: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    flexDirection: 'row',
  }
  // end styles from KeeperEditorScreen.js
});
