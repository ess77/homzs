import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { authLocal } from './sessionManagement/firebase';

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        authLocal.onAuthStateChanged(user => {
        // firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? "AppSwitch" : "AuthSwitch");
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading the App ...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }
})
