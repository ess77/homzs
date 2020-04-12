import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import THButton from './THButton';

export default class THBaseButtons extends Component {
    constry
    render() {
        return(
            <View style={this.props.style}>
                <THButton text="Recherche" onPress={() => {this.props.navigation.navigate('LocateUser')}} theme="homeBottom" outline size="small"/>
                <THButton text="Selection" onPress={() => {this.props.navigation.navigate('TinderHouses')}} theme="homeBottom" outline size="small"/>
                <THButton text='Transactions' onPress={() => this.props.navigation.navigate('TestFlex')} theme="homeBottom" outline size="small"/>
            </View>
        )
    }
}