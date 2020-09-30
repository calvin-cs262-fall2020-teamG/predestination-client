import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, FlatList } from 'react-native';

export default function WaitingScreen({ route, navigation }) {

    return (
	<View>
	    <Text>Waiting for game to start... The more the merrier! Share the code { route.params.code }!</Text>
	    <Button title='Start' onPress={ () => { navigation.navigate('seekerracescreen', { role: 'seeker'}); } }/>
	</View>
    );
}



