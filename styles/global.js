import { StyleSheet, View } from "react-native";

export const globalStyles = StyleSheet.create({
  //navigation bars
  navigationHeader:{
    // color: "white",
    backgroundColor: "#A2D683",
  },
  titleText:{
    fontFamily: "raleway",
    color: "black",
  },
  keeperNavHeader:{
    backgroundColor: "maroon",
  },
  keeperTitleText:{
    color: "white",
  },
    //shared:header.js
  topRightMenuIcon:{
  margin: 15, //shifts the icon to the left
  color: "white",
  },
  // start styles from StartScreen.js
  container: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleSection: {
    // flex: 1,
    width: "100%",
    padding: 20,
    alignItems: "center"
  },
  welcomeText:
  {
    // flex: 2,
    fontFamily: "constan",
    fontSize: 30,
    textAlign: "center",
    color: "#71B1C8",
  },
  entrySection: {
    // flex: 2,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    // flex: 2,
    fontSize: 40,
    fontFamily: "constan",
    textAlign: "center",
  },
  joinButton: {
    // flex: 1,
    padding: 20,
    margin: 25,

    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "maroon",

    width: "50%",
    alignItems: "center",
    backgroundColor: "gold",
  },
  createButton: {
    // flex: 1,
    padding: 20,
    margin: 25,
    marginBottom: 25,

    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "gold",

    width: "50%",
    alignItems: "center",
    backgroundColor: "maroon",
  },

  seekerText: {
    margin: 5,
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "constan",
    color: "grey",
  },
  keeperText: {
    fontSize: 20,
    fontFamily: "constan",
    color: "grey",
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
  },
  // end styles from KeeperEditorScreen.js
  buttonText: {
    color: "white",
    fontFamily: "constan",
    fontSize: 20,
    letterSpacing: 2,
  },
  buttonTextSeeker: {
    color: "black",
    fontFamily: "constan",
    fontSize: 20,
    letterSpacing: 2,
  }
});

