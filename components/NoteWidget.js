import React, { useState } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

export default function NoteWidget({ content, focused }) {
    
    return (
        <View style={focused ? styles.focusedSection : styles.flexSection}>

          <View style={styles.headerSection}>
            <Text numberOfLines={focused ? 2 : 1} style={styles.headerText}>{content.title}</Text>
            <Text style={styles.timeText}>{content.timeFound}</Text>
	  </View>

          <View style={styles.bodySection}>
            <Text numberOfLines={focused ? 99 : 1}>{content.clue}</Text>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flexSection: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 80,
        marginRight: 20,
        padding: 10,
        height: 110,
    },
    headerSection: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
    },
    headerText: {
        flex: 4,
        fontSize: 16,
        textAlign: 'left',
    },
    timeText: {
        flex: 1,
        color: 'gray',
        textAlign: 'right',
    },
    bodySection: {
        padding: 10,
    },
    bodyText: {
        fontSize: 16,
    }
});
