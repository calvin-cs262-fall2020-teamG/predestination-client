import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

export default function Header({ navigation }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View>
            <MaterialIcons style={globalStyles.topRightMenuIcon} name='menu' size={28} onPress={openMenu} />
        </View>
    );
};