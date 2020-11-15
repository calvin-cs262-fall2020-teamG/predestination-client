import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Alert, View, Text, Image, Button, Linking, ImageBackground, StyleSheet} from 'react-native';

import Unorderedlist from 'react-native-unordered-list';
import { globalStyles } from "../styles/global";

/**
 * AboutScreen tells user about our app
 */
export default function AboutScreen({ navigation }) {
  return (
    <View>
      {
          <View style={globalStyles.aboutScreenContainer}>
            <View>
              <Text style={globalStyles.aboutTitleText}>Our Goal</Text>
              <Text style={globalStyles.aboutBodyText}>
                <Text style={{fontStyle: 'italic'}}>Predestination</Text> combines technological ingenuity with an age-old game to deliver
                a fun, modern spin in this time of need for environmental care and social bonding
                in a socially distanced world, leaving nothing behind except ephemeral footprints.
              </Text>
              <Text style={globalStyles.aboutTitleText}>Our Developers</Text>
              <Unorderedlist style={{marginLeft: 30,}}><Text>Hayworth A.</Text></Unorderedlist>
              <Unorderedlist style={{marginLeft: 30,}}><Text>Jacob B.</Text></Unorderedlist>
              <Unorderedlist style={{marginLeft: 30,}}><Text>Advait S.</Text></Unorderedlist>
              <Unorderedlist style={{marginLeft: 30,}}><Text>Ethan W.</Text></Unorderedlist>
              <Unorderedlist style={{marginLeft: 30,}}><Text>Nathan W.</Text></Unorderedlist>
              <Text style={globalStyles.aboutTitleText}>Resources</Text>
              <Text style={globalStyles.aboutBodyText}>
                If you'd like to follow us along on our journey, please checkout our{" "}
                <Text style={{color: "darkblue", textDecorationLine: "underline",}} onPress={() => Linking.openURL('https://github.com/calvin-cs262-fall2020-teamG')}>
                  GitHub
                </Text>.
              </Text>
              <Image source={require('../assets/cheese-icon.png')} style={styles.image}></Image>
            </View>
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 30,
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 200,
  },
});