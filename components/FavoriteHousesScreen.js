import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
                                                                    
export default class FavoriteHousesScreen extends Component {
    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.mainText}>FavoriteHousesScreen!</Text>
            </View>
        );
    }
}
                                                                     
const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    mainText: {
        textAlign: 'center'
    }
});