import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import FetchLocation from './FetchLocation'

export default class UserLocation extends Component {
   
    state = {
        userLocation: null
    }
    getUserLocation = () => {
        console.log('UserLocation in progress...m');
        
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                userLocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0421
                }
            });
            // fetch('jdbc:mysql://localhost:3306/sakila', {
            fetch('jdbc:mysql://localhost:3306/sakila?user=martial&pass=jam176', {
                method: 'POST',
                body: JSON.stringify({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            })
                .then(res => console.log(res)
                )
                .catch(err => console.log(err)
                )
        }, err =>  console.log(err)
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <FetchLocation onGetLocation={this.getUserLocation} />
                <UsersMap userLocation={this.state.userLocation} ></UsersMap>
            </View>
        )
    }
}

export const UsersMap = props => {
    let userLocationMarker = null;

    if(props.userLocation) {
        userLocationMarker = <MapView.Marker coordinate={props.userLocation} />
    }
    return (
        <View style={styles.mapContainer}>
                <MapView style={styles.map} initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0421
                }} 
                region={props.userLocation}>
                   {userLocationMarker}
                </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapContainer: {
        width: '100%',
        height: 500,
    },
    map: {
        width: '100%',
        height: '100%',

    }
})
