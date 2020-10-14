import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View>
            <MaterialIcons name='menu' size={28} onPress={openMenu} />
        </View>
    );
};