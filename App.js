import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import MainStack from './routes/mainStack';

export default function App() {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}
