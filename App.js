import 'react-native-gesture-handler';
import React from 'react';

import MainStack from './routes/mainStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
    return (
        <NavigationContainer>
            <MainStack />
        </NavigationContainer>
    );
}
