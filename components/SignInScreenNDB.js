import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THTextInput from './THTextInput';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';

export default class SignInScreenNDB extends Component {
    HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
    CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');
    
    static  navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      let headerTitle = 'Connexion';
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
      let tabBarLabel = 'Back';

      return ({ headerStyle, headerTitleStyle, headerTitle, headerRight, tabBarLabel });
    }
    

    _onConnection() { 
      this.props.navigation.setParams({ connected: true });
      console.log('Connecté : ', this.props.navigation.state.params.connected);
     }


    componentDidMount() {
      // this.props.navigation.setParams({ onConnection: this._onConnection.bind(this) });
      console.log('Connecté : ', this.props.navigation);
    }
  

    render() {
      return (
        <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
            <View style={THStyles.filterComponent}>
                <View style={THStyles.userSignInForm}>
                    <View style={THStyles.userSignInField}>
                        <THTextInput theme="homeBottom" onPress={(input) => {this.validate(input)}} text="E-Mail : " />
                        <THTextInput theme="homeBottom" onPress={(input) => {this.validate(input)}} text="Password : " />
                    </View>
                    <View style={THStyles.buttonGroup2}>
                        <THButton text="Annuler" onPress={() => {this.props.navigation.goBack()}} theme="cancel" outline size="small"/>
                        <THButton text="Connexion" onPress={() => {this.props.navigation.navigate('HomeUser')}} theme="validate" outline size="small"/>
                    </View>
                </View>
                <THBaseButtons style={THStyles.buttonContainer} fromTop='210' />
            </View>
            <Copyright />
        </ImageBackground>
        );
    }

    validate(input) {
        console.log('validate process...');
    }
}

