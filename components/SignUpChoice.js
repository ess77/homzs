import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, ScrollView, StyleSheet, StatusBar } from 'react-native';
import Menu, { MenuProvider, MenuTrigger, MenuOptions, MenuOption, renderers } from 'react-native-popup-menu';
import Colors from '../constants/Colors';

import THButton from './THButton';

import THConstants from '../constants/THConstants';

import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';
import { Appbar, Chip, Button } from 'react-native-paper';

let unique = 0;
const { Popover } = renderers;
export default class SignUpChoice extends Component {
  service = true;
    constructor(props) {
      super(props);
      this.state = { log: [] };
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


    _onConnection() { 
      console.log('SignUpChoice : _onConnection : Connecté : ', this.props.navigation.state.params.connected);
     }
  

    componentDidMount() {
      this.props.navigation.setParams({  onConnection: this._onConnection.bind(this), connected: false });
    }

    addLog(value) {
      this.setState({
        log: [...this.state.log, {
          value,
          id: ++unique,
        }],
      });
      console.log('SignUpChoice : addLog : value added = ' + value);
    }
    selectProfiles(value) {
      this.addLog(`selecting number: ${value}`);
      switch(value) {
        case 1: {
          this.props.navigation.navigate('SignUpBuyer');
          break;
        }
        case 2: {
          this.props.navigation.navigate('SignUpSeller');
          break;
        }
        case 3: {
          this.props.navigation.navigate('SignUpMediator');
          break;
        }
        case 4: {
          this.props.navigation.navigate('SignUpPT')
          break;
        }
        default: {
          console.log('No defined choices.');
        }
      }
    }
    toggleHighlight(id) {
      const log = this.state.log.map(l => {
        if (l.id === id) {
          return Object.assign({}, l, {highlighted: !l.highlighted});
        }
        return l;
      })
      this.setState({ log });
    }
    selectOptionType(value) {
      const v = typeof value === 'object' ? JSON.stringify(value) : value;
      this.addLog(`selecting type: ${v}`);
      console.log('SignUpChoice : _onConnection : selectOptionType :' + v);
      return value !== 'Do not close';
    }
    deleteLogItem(id) {
      const log = this.state.log.filter(l => l.id !== id);
      this.setState({ log });
    }  
    connectionParams = {  onConnection: this._onConnection.bind(this), connected: false };

    render() {
      return (


        <View style={THStyles.filterComponentRNP}>
        <ImageBackground style={THStyles.imageBackground} source={THConstants.HomeScreenImageUri} >
            <StatusBar backgroundColor={ Colors.homeCorporate } barStyle={"default"} />
            <Appbar.Header dark={true} style={THStyles.appbarHeader}>
              <Appbar.Content title="TinderHouze" subtitle={'Déjà Chez-moi!'} onPress={() => {this.props.navigation.goBack()}}/>
              <Appbar.BackAction icon="step-back" onPress={() => {this.props.navigation.goBack()}} />
              <Appbar.Action icon="step-forward" onPress={() => {toggleHidePassword()}} />
            </Appbar.Header>
            <Chip icon="information" style={THStyles.textProfileBuyer} onPress={() => {this.props.navigation.navigate('SignUpBuyer')}} >Profile Acheteur : </Chip>
            <Chip icon="information" style={THStyles.textProfileSeller} onPress={() => {this.props.navigation.navigate('SignUpSeller')}} >Profile Vendeur : </Chip>
            <Chip icon="information" style={THStyles.textProfileAgent} onPress={() => {this.props.navigation.navigate('SignUpMediator')}} >Profile Commercial : </Chip>
            <Chip icon="information" style={THStyles.textProfilePartTime} onPress={() => {this.props.navigation.navigate('SignUpPT')}} >Profile Collaborateur : </Chip>
            <View style={THStyles.imageContainerProfileChoice} >
                <Image  source={THConstants.CentraleHomeScreenImageUri} style={THStyles.centralImage}></Image>
                <Text style={THStyles.logoTitle}>TinderHouse</Text>
                <Text style={THStyles.middleLeitmotive}>Vente Rapide  -  Achat Rapide</Text>
            </View>
            <View>
              <View>
                <View style={{ alignItems: 'center' }}>
                    <Button style={{ marginTop: 15, backgroundColor:  Colors.TH_HOME_COLOR, width: 200, borderRadius: 50 }} onPress={() => {this.props.navigation.navigate('Home', this.connectionParams)}}><Text style={{ color: 'white' }}>Retour</Text></Button>
                </View>
              </View>
            </View>
            </ImageBackground>
            <THBaseButtons style={THStyles.buttonContainer} fromTop='-70' navigation={this.props.navigation} disabled={true}/>
            <Copyright />
            </View>
        );
    }
}
const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    backgroundColor: Colors.homeCorporate,
    paddingTop: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.whitePurpled,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
  triggerText: {
    color: 'white',
  },
  disabled: {
    color: '#ccc',
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  logView: {
    flex: 1,
    flexDirection: 'row',
  },
  logItem: {
    flexDirection: 'row',
    padding: 8,
  },
  slideInOption: {
    padding: 5,
    backgroundColor: Colors.whitePurpled,
    borderRadius: 25
  },
  text: {
    fontSize: 18,
    // color: 'white'
  },
  textOptions: {
    fontSize: 18,
    // color: 'black'
  },
  userConnected: {
    backgroundColor: Colors.whitePurpled,
    // padding: 0,
    // marginTop: -75,
    // marginLeft: 215,
    // alignSelf: 'flex-end'
    borderRadius: 25,
},
});
