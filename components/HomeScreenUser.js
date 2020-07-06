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
    console.log('HomeScreenUser : constructor :  this.props.userAuth email: ', this.props.userAuth.uid);
    const user = {
      displayName: this.props.userAuth.displayName,
      email: this.props.userAuth.email,
      photoURL: this.props.userAuth.photoURL,
      accessToken: {...this.props.userAuth.stsTokenManager},
    }
    this.state = {
      navigation: null,
      user: user,
    }
  }
  HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
  CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');
  
  
  static  navigationOptions = ({ navigation }) => {
    // console.log('HomeScreenUser : navigationOptions : ', navigation);
  
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
    console.log('HomeScreenUser : _onConnection : Connecté : ');
   }

  componentDidMount() {
    // this.props.navigation.setParams({ onConnection: this._onConnection.bind(this) });
    this.setState({navigation: HomeScreenUser.navigationOptions.navigation});
    console.log('HomeScreenUser : componentDidMount : Connecté : ');
  }

  render() {
    console.log('HomeScreenUser : render : this.state.user.accessToken : ', this.state.user.accessToken);
    return (
      <View style={THStyles.screen}>
            <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
            <View style={THStyles.filterComponent}>
                <View style={THStyles.imageContainerHomeScreen} >
                    <UserConnectedPad user={this.state.user} />
                    <Image  source={this.CentraleHomeScreenImageUri} style={THStyles.centralImage}></Image>
                    <Text style={THStyles.logoTitle}>TinderHouse</Text>
                    <Text style={THStyles.middleLeitmotive}>Vente Rapide  -  Achat Rapide</Text>
                </View>
                <THBaseButtons style={THStyles.buttonContainer} fromTop='275' navigation={this.state.navigation} />
              </View>
              <Copyright />
            </ImageBackground>
          </View>
    )
    };
  }
