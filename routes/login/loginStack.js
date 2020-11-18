import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../../screens/LoginScreen";

const Stack = createStackNavigator();

/**
 * LoginStack simply displays LoginScreen
 */
export default function LoginStack({}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "LoginScreen" }}
      />
    </Stack.Navigator>
  );
}
