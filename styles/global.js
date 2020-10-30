import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  //==================navigation top bars========================
  navigationHeader:{
    backgroundColor: "#A2D683",
  },
  titleText:{
    fontFamily: "constan",
    color: "black",
  },
  keeperNavHeader:{
    fontFamily: "constan",
    backgroundColor: "maroon",
  },
  keeperTitleText:{
    color: "white",
    fontFamily: "constan",
  },
  seekerNavHeader:{
    fontFamily: "constan",
    backgroundColor: "gold",
  },
  seekerTitleText:{
    fontFamily: "constan",
    color: "black",
  },

  //shared:header.js
  topRightMenuIcon:{
  margin: 15, //shifts the icon to the left
  color: "white",
  },
  // start styles from StartScreen.js

  // ========================= navigation styles ==========================
  // start screen
  startNavigationTitle: {
    fontFamily: "constan",
    color: 'white',
  },
  startNavigationHeader: {
    fontFamily: "constan",
    backgroundColor: '#A2D683',
    opacity: 0.7,
  },
  startNavigationDrawer: {
    constan: "constan",
    color: 'white',
  },

  // seeker screen navigation styles
  seekerNavigationTitle: {
    color: 'black',
  },
  seekerNavigationHeader: {
    backgroundColor: '#71B1C8',
  },
  startNavigationDrawer: {
    color: 'white',
  },

  // keeper screen navigation styles
  keeperNavigationTitle: {
    color: 'white',
  },
  keeperNavigationHeader: {
    backgroundColor: '#8C2131',
  },
  keeperNavigationDrawer: {
    color: 'white',
  },
  // ========================= Welcome Screen Styles ==========================
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
  horizontalBar: {
    padding: 0.5,
    borderEndWidth: 350,
    borderBottomColor: "gray",
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
    padding: 15,
    margin: 25,

    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "maroon",

    width: "50%",
    alignItems: "center",
    backgroundColor: "gold",
  },
  createButton: {
    // flex: 1,
    padding: 15,
    margin: 20,
    marginBottom: 25,

    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "gold",

    height: 50,
    width: 150,
    alignItems: "center",
    backgroundColor: "maroon",
  },

  seekerText: {
    margin: 5,
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "constan",
    color: "grey",
    textAlign: "center",
  },
  keeperText: {
    margin: 5,
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "constan",
    color: "grey",
    textAlign: "center",
  },
  // end styles from StartScreen.js

  //SEEKER SCREENS
  //seeker general design
  seekerBodyText:{
    textAlign: "center",
    fontFamily: "constan",
    fontSize: 20,

  },
  seekerStartButton: {
    // flex: 1,
    padding: 20,
    margin: 25,

    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "maroon",

    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gold",
  },

  //=================start styles from SeekerGameScreen.js================


  // flexContainer: {
  //   flexDirection: "column",
  //   flex: 1,
  // },
  // header: {
  //   flex: 5,
  //   backgroundColor: "skyblue",
  // },
  seekerCurrentStatus:{
    fontSize: 40,
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

  //KEEPER SCREENS

  //added by Nathan Wang on Oct 5 11:50PM
  // start styles from KeeperGameScreen.js
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
    color: "gold",
    fontFamily: "constan",
    fontSize: 20,
    letterSpacing: 2,
  },
  buttonTextSeeker: {
    color: "maroon",
    fontFamily: "constan", //
    fontSize: 20,
    letterSpacing: 2,
  }
});

