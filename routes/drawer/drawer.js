import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStack from '../drawer/home/homeStack';
import AccountStack from '../drawer/account/accountStack';
import AboutStack from '../drawer/about/aboutStack';
import KeeperStack from './home/keeper/keeperStack';

const Drawer = createDrawerNavigator();

/**
 * DrawerScreen is the entirety of the application once the user has logged in.
 */
export default function DrawerScreen({ setLoginStatus, route }) {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerPosition='right'
      drawerType='front'
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        options={{
          title: 'Home',
          drawerIcon: () => <Icon name='home' size={25} color='black' />,
        }}
        name='Home'
        component={HomeStack}
      />
      <Drawer.Screen
        options={{
          title: 'Account',
          drawerIcon: () => <Icon name='account' size={25} color='black' />,
        }}
        name='Account'
        component={AccountStack}
      />
      <Drawer.Screen
        options={{
          title: 'Keeper',
          drawerIcon: () => <Icon name='key' size={25} color='black' />,
        }}
        name='Keeper'
        component={KeeperStack}
      />
      <Drawer.Screen
        options={{
          title: 'About',
          drawerIcon: () => (
            <Icon name='information-outline' size={25} color='black' />
          ),
        }}
        name='About'
        component={AboutStack}
      />
      {/* <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="About" component={AboutStack} /> */}
    </Drawer.Navigator>
  );
}
