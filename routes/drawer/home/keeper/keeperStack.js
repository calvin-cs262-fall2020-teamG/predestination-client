import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../../../../shared/header";
import { globalStyles } from "../../../../styles/global";

// import gps test screen
import TestScreen from "../../../../screens/TestScreen";

// import keeper screens
import KeeperListScreen from "../../../../screens/keeper/KeeperListScreen";
import KeeperGameScreen from "../../../../screens/keeper/KeeperGameScreen";
import KeeperEditorScreen from "../../../../screens/keeper/KeeperEditorScreen";
import KeeperWaitingScreen from "../../../../screens/keeper/KeeperWaitingScreen";

const Stack = createStackNavigator();

/**
 * HomeStack is displayed only when a user is logged in
 */
export default function KeeperStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Header
            navigation={navigation}
            customStyle={globalStyles.keeperNavigationDrawer}
          />
        ),
        headerTitleStyle: globalStyles.keeperNavigationTitle,
        headerTintColor: 'white',
        headerStyle: globalStyles.keeperNavigationHeader,
      }}
    >
      <Stack.Screen
        name="KeeperListScreen"
        component={KeeperListScreen}
        options={{ title: "Hunts" }}
      />
      <Stack.Screen
        name="KeeperEditorScreen"
        component={KeeperEditorScreen}
        options={{ title: "Edit Your Hunt", headerTitleStyle: { alignSelf: 'center' } }}
      />
      <Stack.Screen
        name="KeeperWaitingScreen"
        component={KeeperWaitingScreen}
        options={{ title: "Start The Game", headerTitleStyle: { alignSelf: 'center' } }}
      />
      <Stack.Screen
        name="KeeperGameScreen"
        component={KeeperGameScreen}
        options={{ title: "Game Progress", headerTitleStyle: { alignSelf: 'center' } }}
      />
      <Stack.Screen name="TestScreen" component={TestScreen} />
    </Stack.Navigator>
  );
}
