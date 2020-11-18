import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "../shared/header";
import { globalStyles } from "../styles/global";

import LoginStack from "../routes/login/loginStack";
import Drawer from "../routes/drawer/drawer";

import {
  LOGIN_STATUS,
  AuthenticationContext,
} from "../src/GoogleAuthentication";

const Stack = createStackNavigator();

/**
 * MainStack is the entire application, including both screens before and after a user logs in
 */
export default function MainStack({ navigation }) {
  const [loginStatus, setStatus] = useState(LOGIN_STATUS.LOADING);

  return (
    <AuthenticationContext.Provider
      value={{
        loginStatus: LOGIN_STATUS.LOADING,
        setLoginStatus: (newStatus) => {
          setStatus(newStatus);
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {((loginStatus === LOGIN_STATUS.NEW_USER ||
          loginStatus === LOGIN_STATUS.LOADING) && (
          <Stack.Screen
            name="Login"
            component={LoginStack}
            options={{ title: "Login" }}
          />
        )) ||
          (loginStatus === LOGIN_STATUS.GOOGLE_USER && (
            <Stack.Screen
              name="Drawer"
              component={Drawer}
              options={{ title: "Drawer" }}
            />
          ))}{" "}
      </Stack.Navigator>{" "}
    </AuthenticationContext.Provider>
  );
}
