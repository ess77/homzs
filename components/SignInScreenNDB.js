import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';
import { authLocal } from './sessionManagement/firebase';

export default class SignInScreenNDB extends Component {
    HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
    CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');
    state = {
      username: '',
      email: '',
      password: '',
      errorMsg: '',
      usernameMessage: 'TestError!',
      emailMessage: '',
      passwordMessage: '',
    } 
    
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
      console.log('SignInScreenNDB : componentDidMount : navigation = ', this.props.navigation);
    }

    async connDefaultUser() {
      await authLocal.signInWithEmailAndPassword('rete@gmail.com', 'jam176');
      console.log('SignInScreenNDB : connDefaultUser : Connecté : navigation = ', this.props.navigation);
      // this.props.navigation.navigate('HomeUser')
    }
  

    _isUsernameValid = (name) => /^[a-zA-Z]*$/.test(name);
    _isEmailValid = (name) => /^[a-zA-Z]*$/.test(name);
  
    render() {
      return (
        <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
            <View style={THStyles.filterComponent}>
                <View style={THStyles.userSignInForm}>
                    <View style={THStyles.userSignInField}>
                    <TextInput
                    ref="username"
                    label="Username"
                    keyboardType="default"
                    style={{ backgroundColor: 'transparent', paddingHorizontal: 0, margin: -10 }}
                    placeholder="Entrer Votre username" 
                    value={this.state.username}
                    error={!this._isUsernameValid(this.state.username)}
                    onChangeText={username => this.setState({ username })}
                    />
                  <HelperText type="error" padding="none" visible={!this._isUsernameValid(this.state.username)} >{this.state.usernameMessage}</HelperText>
                        <TextInput  style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}  label="Password" 
                                    placeholder="Entrer Votre password" secureTextEntry={true} 
                                    onPress={(input) => {this.validate(input)}} name="password" />
                    </View>
                    <View style={THStyles.buttonGroup2}>
                        <THButton text="Annuler" onPress={() => {this.props.navigation.goBack()}} theme="cancel" outline size="small"/>
                        <THButton text="Connexion" onPress={this.connDefaultUser} theme="validate" outline size="small"/>
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

