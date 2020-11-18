import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  geoLocation,
} from "react-native";
import { globalStyles } from "../styles/global";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        this.setState({ error: error.message });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  findCurrentLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        errorMessage: "permission denied",
      });
    }

    let location = await Location.watchPositionAsync({});
    this.setState({ location });
  };

  render() {
    return (
      //=====Old code from before I pulled GPS code on Oct 22=====
      // <View style={globalStyles.container}>
      //   {/* <Button title="location" onPress={this.getLocation}></Button> */}
      //   <TouchableOpacity onPress={this.findCurrentLocationAsync}>
      //     <View style={globalStyles.createButton}>
      //       <Text style={globalStyles.buttonText}>FindMeNow!</Text>
      //     </View>
      //   </TouchableOpacity>

      //</View>
      //Code below added after Oct 22 Meeting
      <View style={styles.container}>
        <Text>
          Location: {this.state.latitude}, {this.state.longitude}{" "}
        </Text>{" "}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
