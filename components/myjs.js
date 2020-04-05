import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
                                                                    
export default class MyJs extends Component {
    render() {
           return( <View>
                        <Text style={styles.monStyle}>My real test view</Text>
                    </View>
        )};
}

const styles = StyleSheet.create({
    monStyle: {
        color: Colors.textVal,
        fontSize: 25,
    }
});
