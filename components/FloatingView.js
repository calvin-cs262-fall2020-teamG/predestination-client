import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
/**
 * FloatingView is a component that encourages uniform styling with some pizazz
 */
export default function FloatingView(props) {

    return (

        <View style={{
            ...styles.mainView,
            ...props.style,
        }}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
            <View style={styles.content}>
                { props.children }
            </View>
        </View>

    );

}

const styles = StyleSheet.create({
    content: {
    },
    title: {
        paddingBottom: 20
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    mainView: {
        
        justifyContent: 'space-around',
        padding: 20,
        paddingBottom: 25,
        paddingTop: 15,

        borderRadius: 15,
        // borderBottomLeftRadius: 5,
        // borderTopRightRadius: 5,

        backgroundColor: 'white',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
});