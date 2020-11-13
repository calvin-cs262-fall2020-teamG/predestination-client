import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  //==================navigation top bars========================
  navigationHeader: {
    backgroundColor: "#5CDB95",
  },
  titleText: {
    // fontFamily: "constan",
    color: "black",
  },
  keeperNavHeader: {
    // fontFamily: "constan",
    backgroundColor: "maroon",
  },
  keeperTitleText: {
    color: "white",
    // fontFamily: "constan",
  },
  // seekerNavHeader:{
  //   fontFamily: "constan",
  //   backgroundColor: "gold",
  // },
  // seekerTitleText:{
  //   fontFamily: "constan",
  //   color: "black",
  // },

  //shared:header.js
  topRightMenuIcon: {
    margin: 15, //shifts the icon to the left
    color: "white",
  },
  // start styles from StartScreen.js

  // ========================= navigation styles ==========================
  // start screen
  startNavigationTitle: {
    // fontFamily: 'constan-bold',
    color: 'white',
  },
  startNavigationHeader: {
    // fontFamily: "constan",
    backgroundColor: '#5CDB95',
    // opacity: 0.7,
  },
  startNavigationDrawer: {
    constan: 'constan',
    color: 'white',
  },

  // seeker screen navigation styles
  seekerNavigationTitle: {
    //fontFamily: 'constan-bold',
    //color: 'maroon',
  },
  seekerNavigationHeader: {
    // backgroundColor: '#71B1C8',
    //backgroundColor: 'gold',
  },
  startNavigationDrawer: {
    color: 'white',
  },

  // keeper screen navigation styles
  keeperNavigationTitle: {
    // fontFamily: 'constan-bold',
    color: 'white',
  },
  keeperNavigationHeader: {
    backgroundColor: '#8C2131',
  },
  keeperNavigationDrawer: {
    color: 'white',
  },

  // =========================Button Styles====================================
  buttonView: {
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 0,
    backgroundColor: '#A2D683',
    // backgroundColor: '#5CDB95',
    alignSelf: 'center',
    padding: 30,
    paddingTop: 10,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    // fontFamily: 'constan-bold',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 7,
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
    // fontFamily: "constan",
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
    // fontFamily: "constan",
    textAlign: "center",
  },
  seekerText: {
    margin: 5,
    marginBottom: 10,
    fontSize: 20,
    letterSpacing: 2,
    // fontFamily: "constan",
    color: "grey",
    textAlign: "center",
  },
  keeperText: {
    margin: 5,
    marginBottom: 10,
    fontSize: 20,
    letterSpacing: 2,
    // fontFamily: "Roboto",
    color: "grey",
    textAlign: "center",
  },
  // end styles from StartScreen.js

  //SEEKER SCREENS
  //seeker general design
  seekerBodyText: {
    textAlign: "center",
    // fontFamily: "constan",
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
  seekerCurrentStatus: {
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

  //========================KEEPER SCREENS================================

  //added by Nathan Wang on Oct 30
  // start styles from KeeperGameScreen.js
  headerText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "maroon",
    backgroundColor: "gold",
  },
  // end styles from KeeperGameScreen.


  // start styles from AddNewRoute.js for KeeperListScreen
  clearButton: {
    margin: 10,
  },
  huntBox: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: 'lightgray',

    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 0,
    backgroundColor: 'maroon',
    padding: 30,
    paddingTop: 10,
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  publishEditButton: {
    margin: 5,
  },
  keeperHuntName: {
    margin: 5,
    marginBottom: 10,
    fontSize: 20,
    letterSpacing: 2,
    // fontFamily: "constan-bold",
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
  },
  // end styles from AddNewRoute.js for KeeperListSCreen
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
});

