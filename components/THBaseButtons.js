import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import THButton from './THButton';

export default class THBaseButtons extends Component {
    constructor(props) {
        super(props);
    }
    static  navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerTitle = 'Generic';
        let headerTitleStyle = {
          color: 'white',
        };
        let headerStyle = {
          backgroundColor: Colors.homeCorporate,
        };
        let headerRight = (<THButton 
                              text={ THConstants.notConnected }
                              theme="homeBottom" outline size="small"
                              onPress={ () => params.onConnection() } />);
  
        return ({ headerStyle, headerTitleStyle, headerTitle, headerRight });
      }
    render() {
        const fromTop = Math.round(this.props.fromTop);
        return(
            <View style={{marginTop: fromTop}}>
                <View style={this.props.style}>
                    <THButton text="Recherche" onPress={() => {this.props.navigation.navigate('LocateUser')}} theme="homeBottom" outline size="small"/>
                    <THButton text="Selection" onPress={() => {this.props.navigation.navigate('TinderHouses')}} theme="homeBottom" outline size="small"/>
                    <THButton text='Transactions' onPress={() => this.props.navigation.navigate('TestFlex')} theme="homeBottom" outline size="small"/>
                </View>
            </View>
        )
    }
}