import React, { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Button, geoLocation } from 'react-native';
import { globalStyles } from "../styles/global";
import Geolocation from '@react-native-community/geolocation';


const Tracking = props => {
    const [currentLatitude, setCurrentLatitude] = useState(0);
    const [currentLongitude, setCurrentLongitude] = useState(0);
    const [currentTimestamp, setCurrentTimestamp] = useState(0);
    
    const [isTracking, setIsTracking] = useState(false);
    
    useEffect(() => {
        if (!isTracking) return;
        function getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
            setCurrentLongitude(position.coords.longitude);
            setCurrentLatitude(position.coords.latitude);
            setCurrentTimestamp(position.timestamp);
            console.log(
                position.coords.longitude,
                position.coords.latitude,
                position.timestamp
            );
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        }
        let getLocationInterval = setInterval(getLocation, 500);
        return () => clearInterval(getLocationInterval);
    }, [isTracking]);
    
    return (
        <View style={{ width: '100%', height: '100%' }}>
        <MapView showsUserLocation style={{ flex: 1 }} />
        <MenuButton
            title={isTracking ? 'Stop' : 'Start'}
            onPress={() => {
            setIsTracking(!isTracking);
            }}
        />
        </View>
    );
    };
    


export default function getLocation () {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect (() => {
        watchId = navigator.geolocation.watchPosition(
            (position) => {
                setLatitude = position.coords.latitude;
                setLongitude = position.coords.longitude;

            }
        )
    })
    
    findCurrentLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            setErrorMessage('Permission Denied')
        }
    };

    return(
        <View style={styles.container}>
            <Text>Location: {latitude}, {longitude}</Text>
        </View>
    )
}
// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       latitude: 0,
//       longitude: 0
//     }
//   }

//   componentDidMount() {
//     this.watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         this.setState({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         });
//       },
//       (error) => {
//         this.setState({ error: error.message })
//       },
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     )

//   };

//   findCurrentLocationAsync = async () => {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);

//     if (status !== 'granted') {
//       this.setState({
//         errorMessage: 'permission denied'
//       });
//     }

//     let location = await Location.watchPositionAsync({});
//     this.setState({ location });
//   };

//   render() {
//     return (
//       //=====Old code from before I pulled GPS code on Oct 22=====
//       // <View style={globalStyles.container}>
//       //   {/* <Button title="location" onPress={this.getLocation}></Button> */}
//       //   <TouchableOpacity onPress={this.findCurrentLocationAsync}>
//       //     <View style={globalStyles.createButton}>
//       //       <Text style={globalStyles.buttonText}>FindMeNow!</Text>
//       //     </View>
//       //   </TouchableOpacity>

//       //</View>
//       //Code below added after Oct 22 Meeting
//       < View style={styles.container} >
//         <Text>Location: {this.state.latitude}, {this.state.longitude}</Text>
//       </View >
//     );
//   };
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});