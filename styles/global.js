import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  
  // ========================= navigation styles ==========================
  // start screen
  startNavigationTitle: {
    color: 'white',
  },
  startNavigationHeader: {
    backgroundColor: '#A2D683',
    opacity: 0.7,
  },
  startNavigationDrawer: {
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
    fontSize: 30,
    textAlign: "center",
    color: "maroon",

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
    textAlign: "center",
  },
  joinButton: {
    // flex: 1,
    padding: 20,
    margin: 25,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    width: "50%",
    backgroundColor: "gold",
    borderColor: "maroon",
  },
  createButton: {
    // flex: 1,
    padding: 20,
    margin: 25,
    marginBottom: 50,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    width: "50%",
    textAlign: "center",
    backgroundColor: "maroon",
    borderColor: "gold",
  },

  seekerText: {
    // flex: 1,
    margin: 5,
    marginBottom: 10,
    fontSize: 15,
  },
  orWillYouText: {
    // flex: 1,
    padding: 10,
    margin: 10,
    marginBottom: 25,
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
  //shared:header.js

topRightMenuIcon:{
  // justifyContent: "space-around",
  // flexDirection: "column",
  // alignItems: "center",
  // flex: 1,
  margin: 15, //shifts the icon to the left
}
});

