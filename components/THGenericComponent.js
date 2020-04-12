import React, { Component } from 'react';
import { Text, View, ImageBackground, Image } from 'react-native';

import Colors from '../constants/Colors';

import THButton from './THButton';

import THConstants from '../constants/THConstants';

import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';

export default class StandardGenericComponent extends Component {
    HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
    
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


    _onConnection() { 
      console.log('Connecté : ', this.props.navigation.state.params.connected);
     }
  

    componentDidMount() {
      this.props.navigation.setParams({  onConnection: this._onConnection.bind(this), connected: false });
    }

    connectionParams = {  onConnection: this._onConnection.bind(this), connected: false };

    render() {
      return (
          <View style={THStyles.screen}>
            <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
            <View style={THStyles.filterComponent}>
                //**insert custom items here */
                <THBaseButtons style={THStyles.buttonContainer} fromTop='35' />
                <Copyright />
            </View>
            </ImageBackground>
          </View>
        );
    }
}