import React, { useState } from 'react';
import { StyleSheet, Animated, TouchableWithoutFeedback, Keyboard, Alert, KeyboardAvoidingView, TextInput, View, Text, Button, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { globalStyles } from '../../styles/global';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * KeeperEditorScreen will show running list of clues, give the ability to set down a new clue,
 * --------------------------  Updates   --------------------------
 * Advait Scaria
 *      - Added functionality to add clue cards (similar to ToDo list homework)
 *      - Added embedded map which ended up removing all the adding clue functionality
 *
 * TODO:
 *      - styling
 *      - limit map panning area/region so keepers are only able to pan around the area of Calvin's campus
 *      - add marker functionality on tapping of valid spot on map
 *      - add functionality to attach a clue to each marker on map
 *      - add functionality to edit marker's location (e.g. by long pressing it)
 *      - add functionality to edit clue details (e.g. tap on marker and have an edit option display or something)
 */

export default function KeeperEditorScreen({ navigation }) {

    const mapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#523735"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#c9b2a6"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#dcd2be"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ae9e90"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#93817c"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a5b076"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#447530"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f1e6"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fdfcf8"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f8c967"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e9bc62"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e98d58"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#db8555"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#806b63"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8f7d77"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ebe3cd"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#b9d3c2"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#92998d"
                }
            ]
        }
    ]

    const pressHandler = (key) => {
        setClues((prevClues) => {
            return prevClues.filter(todo => todo.key != key)
        })
    }

    const submitHandler = (text) => {
        if (text) {
            setClues((prevClues) => {
                return [
                    { text: text, key: Math.random().toString() },
                    ...prevClues
                ];
            })
        } else {
            Alert.alert('OOPS', 'Please enter a clue', [
                {
                    text: 'Ok', onPress: () => console.log('alert closed')
                }
            ])
        }
    }

    // return (
    //     <TouchableWithoutFeedback onPress={() => {
    //         Keyboard.dismiss();
    //         console.log('dismissed keyboard');
    //     }}>
    //         <View style={globalStyles.container}>
    //             <TextInput
    //                 style={globalStyles.clueInput}
    //                 placeholder='new clue...'
    //                 onChangeText={changeHandler}
    //                 value={text}
    //             />
    //             <Button onPress={() => submitHandler(text)} title='add clue' />
    //             <View style={globalStyles.content}>
    //                 {/* <AddTodo submitHandler={submitHandler} /> */}
    //                 <View style={globalStyles.list}>
    //                     <FlatList
    //                         data={clues}
    //                         renderItem={({ item }) => (
    //                             <View style={globalStyles.item}><Text>{item.text}</Text></View>
    //                         )}
    //                     />
    //                 </View>
    //             </View>
    //             <MapView
    //                 initialRegion={{
    //                     latitude: 37.78825,
    //                     longitude: -122.4324,
    //                     latitudeDelta: 0.0922,
    //                     longitudeDelta: 0.0421,
    //                 }}
    //             />
    //         </View>
    //     </TouchableWithoutFeedback >
    // );

    // return (
    //     <View>
    //         <TextInput
    //             style={styles.input}
    //             placeholder='new todo...'
    //             onChangeText={changeHandler}
    //             value={text}
    //         />
    //         <Button onPress={() => submitHandler(text)} title='add todo' color='coral' />
    //     </View>
    // );

    [text, setText] = useState('');

    const changeHandler = (val) => {
        setText(val);
    }

    const [clues, setClues] = useState([
        { location: "First Location", clue: "Some huge clue description over here" },
        { location: "Second Location", clue: "Some other huge clue description over here" },
        { location: "Third Location", clue: "Some clue description over here" },
        { location: "Fourth Location", clue: "Some clue description over here" },
        { location: "Fifth Location", clue: "Some clue description over here" }
    ]);

    const [region, setRegion] = useState({
        latitude: 42.9331,
        longitude: -85.5877,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    const [markers, setMarkers] = useState([{
        // marker: [{
        latlng: {
            latitude: 42.9331,
            longitude: -85.5877,
        }
        // }]
    }]);

    return (
        <React.Fragment>
            <MapView
                style={{ flex: 1 }}
                customMapStyle={mapStyle}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
                minZoomLevel={15.5}
                onPress={(e) => {
                    console.log(e.nativeEvent.coordinate)
                    // setMarkers({ ...markers, latlng: e.nativeEvent.coordinate })
                    // console.log(markers)
                }
                }
            >
                {
                    markers.map((first, index) => (
                        <MapView.Marker key={index} coordinate={first.latlng} />
                    ))
                }
                < Marker
                    coordinate={{ latitude: 42.9331, longitude: -85.5877 }}
                    title="Test Title"
                    description="Test description"
                >
                    <Callout tooltip>
                        <View>
                            <View style={styles.bubble}>
                                <Text style={styles.name}>First Location</Text>
                                {/* <TextInput placeholder="Enter a location" style={styles.name} /> */}
                                {/* <TextInput placeholder="Enter a clue" style={styles.name}></TextInput> */}
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Callout>
                </Marker >
            </MapView >
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.scrollView}
                contentContainerStyle={{
                    paddingRight: 20
                }}
            >
                {clues.map((first, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <Text>{first.location}</Text>
                        <Text>{first.clue}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </React.Fragment >
    );
}

const styles = StyleSheet.create({
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 150,
    },
    // Arrow below callout bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    name: {
        fontSize: 16,
        marginBottom: 5
    },
    scrollView: {
        position: 'absolute',
        top: 80,
        paddingHorizontal: 10
    },
    card: {
        // elevation: 2,
        // flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 8,
        marginHorizontal: 10,
        width: 200,
        height: 48,
        overflow: 'hidden'
    }
})