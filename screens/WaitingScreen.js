import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function StartScreen({ route, navigation }) {

    return (
	<View>
	    <Text>Waiting for game to start... The more the merrier! Share the code { route.params.code }!</Text>
	</View>
    );
}



