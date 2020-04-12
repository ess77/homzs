import React, { Component } from 'react';
import { View, ImageBackground, Text, Image } from 'react-native';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import UserConnectedPad from './sessionManagement/UserConnectedPad';
import THBaseButtons from './THBaseButtons';


export default class HomeScreenUser extends Component {
  constructor(props) {
    super(props);
    console.log('this.props.userCredentials : ' + this.props.userCredentials);
    
  }
  HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
  CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');
  
  static  navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'TinderHouzze';
    let headerTitleStyle = {
      color: 'white',
      fontSize: 15,
    };
    let headerStyle = {
      backgroundColor: Colors.homeCorporate,
    };
    let headerRight = (<THButton 
                          text={ THConstants.connected }
                          theme="validate" outline size="small"
                          onPress={ () => params.onConnection() } />);

    let tabBarLabel = 'Back';

    return ({ headerStyle, headerTitleStyle, headerTitle, headerRight, tabBarLabel });
  }


  _onConnection() {
    console.log('Connecté : ', this.props.navigation.state.params.connected);
   }

  componentDidMount() {
    // this.props.navigation.setParams({ onConnection: this._onConnection.bind(this) });
    console.log('Connecté : ', this.props.navigation);
  }

  render() {
    return (
      <View style={THStyles.screen}>
            <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
            <View style={THStyles.filterComponent}>
                <View style={THStyles.imageContainer} >
                    <UserConnectedPad user={this.props.userCredentials} />
                    <Image  source={this.CentraleHomeScreenImageUri} style={THStyles.centralImage}></Image>
                    <Text style={THStyles.logoTitle}>TinderHouse</Text>
                    <Text style={THStyles.middleLeitmotive}>Vente Rapide  -  Achat Rapide</Text>
                </View>
                <THBaseButtons style={THStyles.buttonContainer} fromTop='235'  />
              </View>
              <Copyright />
            </ImageBackground>
          </View>
    )
    };
  }
