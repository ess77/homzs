import React, { Component } from 'react';
import { View } from 'react-native';

export default class TestFlex extends Component {
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1, backgroundColor: '#8b6550'}} />
        <View style={{flex:1, backgroundColor: '#85573e'}} />
        <View style={{flex:1, backgroundColor: '#96512b'}} />
      </View>
    );
  }
};
