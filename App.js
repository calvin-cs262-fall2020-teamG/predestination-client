import 'react-native-gesture-handler';
import { AppLoading } from "expo";
import React, {useState} from 'react';

import MainStack from './routes/mainStack';
import { NavigationContainer } from '@react-navigation/native';

import * as Font from "expo-font"; //code added by NW

export default function App() {
    const getFonts = () =>
    Font.loadAsync({
        "constan": require("./assets/fonts/constantia/constan.ttf"),
        "constan-bold": require("./assets/fonts/constantia/constan-bold.ttf"),
        "raleway": require("./assets/fonts/Raleway/Raleway_Var_wght.ttf"),
        "raleway-light": require("./assets/fonts/Raleway/Raleway-Light.ttf"),
    });

    const [fontsLoaded, setsFontsLoaded] = useState(false);
    if (fontsLoaded) {
        return (
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        );
      } else {
        return (
          <AppLoading
            startAsync={getFonts}
            onFinish={() => setsFontsLoaded(true)}
          /> //changes the state to true
        );
      }
}
