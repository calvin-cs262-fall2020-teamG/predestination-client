import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeStack from "../drawer/home/homeStack";
import AccountStack from "./account/accountStack";
import AboutStack from "./about/aboutStack";
import SeekerStack from "./home/seeker/seekerStack";
import StartStack from "./home/start/StartStack";

const Drawer = createDrawerNavigator();

/**
 * DrawerScreen is the entirety of the application once the user has logged in.
 */
export default function DrawerScreen({ setLoginStatus, route }) {
    return (
        <Drawer.Navigator
          initialRouteName="Home"
          drawerPosition="right"
          drawerType="front"
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen
            options={{
                title: "Home",
                drawerIcon: () => <Icon name="home" size={25} color="black" />,
            }}
            name="Home"
            component={StartStack}
          />
	  <Drawer.Screen
	    options={{
                title: "Game",
                drawerIcon: () => <Icon name="home" size={25} color="black"/>,
            }}
            name="Game"
            component={SeekerStack}
          />
          <Drawer.Screen
            options={{
                title: "Account",
                drawerIcon: () => <Icon name="account" size={25} color="black" />,
            }}
            name="Account"
            component={AccountStack}
          />
          <Drawer.Screen
            options={{
                title: "About",
                drawerIcon: () => <Icon name="information-outline" size={25} color="black" />,
            }}
            name="About"
            component={AboutStack}
          />
          {/* <Drawer.Screen name="Home" component={HomeStack} />
             <Drawer.Screen name="Account" component={AccountStack} />
             <Drawer.Screen name="About" component={AboutStack} /> */}
        </Drawer.Navigator>
            );
            }
