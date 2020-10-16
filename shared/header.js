import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation, customStyle }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View>
            <MaterialIcons style={customStyle} name='menu' size={28} onPress={openMenu} />
        </View>
    );
};