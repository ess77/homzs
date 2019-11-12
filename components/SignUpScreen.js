import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THTextInput from './THTextInput';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';


export default class SignUpScreen extends Component {
  HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
  CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');
  
  static  navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'Inscription';
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

    let headerBackTitle = 'Back';

    return ({ headerStyle, headerTitleStyle, headerTitle, headerRight, headerBackTitle });
  }


  _onConnection() { 
    console.log('Connecté : ', this.props.navigation.state.params.connected);
   }

  componentDidMount() {
    // this.props.navigation.setParams({ onConnection: this._onConnection.bind(this) });
  }

  render() {
    return (
      <View style={THStyles.screen}>
      <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
        <View style={THStyles.mainComponent}>
              <View style={THStyles.imageContainer} >
                <View style={THStyles.startActionUserSignIn}>
                  <THTextInput theme="homeBottom" onPress={(input) => {this.validate(input)}} text="Prenom : " />
                  <THTextInput theme="homeBottom" onPress={(input) => {this.validate(input)}} text="Nom : " />
                  <THTextInput theme="homeBottom" onPress={(input) => {this.validate(input)}} text="Pseudo : " />
                  <THTextInput theme="homeBottom" onPress={(input) => {this.validate(input)}} text="Mail : " />
                  <THTextInput theme="homeBottom" onPress={(input) => {this.validate(input)}} text="Tél. Port. : " />
                  <THTextInput theme="homeBottom" onPress={(input) => {this.validate(input)}} text="Tél. Fixe : " />
                </View>
                <View style={THStyles.buttonGroup2}>
                    <THButton text="Annuler" onPress={() => {this.props.navigation.goBack()}} theme="cancel" size="small"/>
                    <THButton text="PartTime" onPress={() => {this.props.navigation.navigate('SignUpPT')}} theme="validate" size="small"/>
                    <THButton text="Valider" onPress={() => {this.props.navigation.navigate('SignIn')}} theme="validate" outline size="small"/>
                </View>
              </View>
              <View style={THStyles.buttonContainerSignUp}>
                <THButton text="Recherche" onPress={() => {this.props.navigation.navigate('LocateUser')}} theme="homeBottom" outline size="small"/>
                <THButton text="Selection" onPress={() => {this.props.navigation.navigate('TinderHouses')}} theme="homeBottom" outline size="small"/>
                <THButton text='Transactions' onPress={() => this.props.navigation.navigate('TestFlex')} theme="homeBottom" outline size="small"/>
            </View>
          </View>
          <View style={THStyles.copyrightContainer}>
            <Text style={THStyles.copyrightText}>{THConstants.copyrightText}</Text>
          </View>
        </ImageBackground>
        </View>
        );
      }
    }

