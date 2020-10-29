import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../shared/header';
import { globalStyles } from '../styles/global';

// import seeker screens
import SeekerWaitingScreen from '../screens/seeker/SeekerWaitingScreen';
import SeekerGameScreen from '../screens/seeker/SeekerGameScreen';
import SeekerClueListScreen from '../screens/seeker/SeekerClueList';
import SeekerFocusedScreen from '../screens/seeker/SeekerFocusedScreen';

import { NotesContext, NotePack } from '../src/Notes';


const Stack = createStackNavigator();

/**
 * HomeStack is displayed only when a user is logged in
 */
export default function SeekerStack({ navigation }) {

    const [notes, setNotes] = useState(new NotePack());

    return (

        <NotesContext.Provider
            value={{
                notePack: notes
            }}>

            <Stack.Navigator
                screenOptions={{
                    headerRight: () => <Header navigation={navigation} customStyle={globalStyles.seekerNavigationDrawer} />,
                    headerTitleStyle: globalStyles.seekerNavigationTitle,
                    headerStyle: globalStyles.seekerNavigationHeader,
                }}
            >

                <Stack.Screen name="SeekerWaitingScreen" component={SeekerWaitingScreen} options={{ title: 'SeekerWaitingScreen', headerShown: true }} />
                <Stack.Screen name="SeekerGameScreen" component={SeekerGameScreen} options={{ title: 'SeekerGameScreen', headerShown: true }} />
                <Stack.Screen name="SeekerClueListScreen" component={SeekerClueListScreen} options={{ title: 'SeekerClueListScreen', headerShown: false }} />
                <Stack.Screen name="SeekerFocusedScreen" component={SeekerFocusedScreen} options={{ title: 'SeekerFocusedScreen ', headerShown: false }} />
            </Stack.Navigator>

        </NotesContext.Provider>
    );
};
