import { StyleSheet } from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";

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

  //commenting out Seeker things for now,
  //will explore design later

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
    margin: 10, //shifts the icon to the left
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
    color: "white",
    //fontFamily: 'constan-bold',
    //color: 'maroon',
  },
  seekerNavigationHeader: {
    backgroundColor: "#05386B",
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
    backgroundColor: '#05386B',
  },
  keeperNavigationDrawer: {
    color: 'white',
  },

  // account screen navigation styles
  accountNavigationTitle: {
    // fontFamily: 'constan-bold',
    color: 'white',
  },
  accountNavigationHeader: {
    backgroundColor: '#05386B',
  },
  accountNavigationDrawer: {
    color: '#05386B',
  },

  //about screen navigation styles
  aboutNavigationTitle: {
    // fontFamily: 'constan-bold',
    color: 'white',
  },
  aboutNavigationHeader: {
    backgroundColor: '#05386B',
  },
  aboutNavigationDrawer: {
    color: '#05386B',
  },
  // =========================Button Styles====================================
  buttonView: {
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 30,
    borderWidth: 0,
    backgroundColor: '#5CDB95',
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
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 7,
  },

  //=========================Leaderboard Styles===============================
  leaderBoardHeader: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#5CDB95",
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
    width: "100%",
    padding: 20,
    alignItems: "center"
  },
  welcomeText:
  {
    fontFamily: "constan",
    marginTop: 25,
    fontSize: 30,
    textAlign: "center",
    // color: "#05386B"
    color: "#71B1C8",
  },
  horizontalBar: {
    padding: 0.5,
    borderEndWidth: 350,
    borderBottomColor: "gray",
  },
  entrySection: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    fontSize: 40,
    textAlign: "center",
  },
  seekerText: {
    margin: 5,
    marginBottom: 10,
    fontSize: 20,
    letterSpacing: 2,
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

  //=================start styles from AccountScreen.js==================
  accountScreenContainer:{
    justifyContent: "center",
    alignContent: "center",
  },
  accountNameText:{
    margin: 15,
    fontSize: 25,
    color: "#05386B",
    textAlign: "center",
  },
  accountImage:{
    alignSelf: "center",
    borderColor: "#05386B",
    borderWidth: 5,
    borderRadius: 75,
    width: 150,
    height: 150,
    margin: 25,
  },
  //=================start style from AboutScreen.js======================
  aboutTitleText:{
    margin: 10,
    marginLeft: 20,
    textAlign: "left",
    fontSize: 25,
    color: "grey",
  },
  aboutBodyText: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 15,
    textAlign: "left",
    fontSize: 15,
    lineHeight: 25,
  },
  //=================start styles from SeekerWaitingScreen.js=============
  WaitingCode: {
    fontWeight: 'bold',
    fontSize: 64,
    color: 'white'
  },
  SeekerWaitingScreenCard:{
    width: '90%',
    marginBottom: '10%'
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
  proximityOfficialText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  proximityOfficalTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  trackerListFlexContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#5CDB95"
},
  // end styles from SeekerGameScreen.js

  //========================KEEPER SCREENS================================

  //added by Nathan Wang on Oct 30
  // start styles from KeeperGameScreen.js

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
    backgroundColor: '#05386B',
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

