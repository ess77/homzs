import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THTextInput from './THTextInput';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';


export default class SignUpBuyer extends Component {
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

  constructor() {
    super();
    console.log('SignUpBuyer : constructor');
    this.state = {
      currentIndex: 0
    }
  }

  createUserWithEmailAndPasswordHandler = (email, password) => {
    // event.preventDefault();
    console.log('test signup Buyer');
    try {
      const {user} =  auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
      this.props.navigation.navigate('SignIn', this.connectionParams);
    } catch(error) {
      setError('Erreur lors du sign up par email et password' + error, error);
    };

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  _onConnection() { 
    console.log('Connecté : ', this.props.navigation.state.params.connected);
   }

  componentDidMount() {
    // this.props.navigation.setParams({ onConnection: this._onConnection.bind(this) });
  }
  connectionParams = {  onConnection: this._onConnection.bind(this), connected: false };
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
                    <THButton text="Valider" onPress={() => this.createUserWithEmailAndPasswordHandler(email, password)} theme="validate" outline size="small"/>
                </View>
              </View>
              <THBaseButtons style={THStyles.buttonContainer} fromTop='170' />
          </View>
          <Copyright />
        </ImageBackground>
        </View>
        );
      }
    }

