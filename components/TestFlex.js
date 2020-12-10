import React, { Component } from 'react';
import { View } from 'react-native';

export default class TestFlex extends Component {
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:2, backgroundColor: 'grey'}} />
        <View style={{flex:1, backgroundColor: 'blue'}} />
        <View style={{flex:1, backgroundColor: 'red'}} />
        <View style={{flex:2, backgroundColor: 'yellow'}} />
      </View>
    );
  }
};
