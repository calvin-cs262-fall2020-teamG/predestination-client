import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AboutScreen from "../../../screens/AboutScreen";
import Header from "../../../shared/header";

import { globalStyles } from "../../../styles/global";

const Stack = createStackNavigator();

export default function AccountStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => (
          <Header
            navigation={navigation}
            customStyle={globalStyles.aboutNavigationDrawer}
          />
        ),
        headerTitleStyle: globalStyles.aboutNavigationTitle,
        headerStyle: globalStyles.aboutNavigationHeader,
      }}
    >
      <Stack.Screen name="About Predestination" component={AboutScreen} /> 
    </Stack.Navigator>
  );
}
