import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, ScrollView, StyleSheet } from 'react-native';
import Menu, { 
    MenuProvider,
    MenuTrigger,
    MenuOptions,
    MenuOption,
    renderers
 } from 'react-native-popup-menu';
import Colors from '../constants/Colors';

import THButton from './THButton';

import THConstants from '../constants/THConstants';

import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';

let unique = 0;
const { Popover } = renderers;
export default class SignUpChoice extends Component {
  service = true;
    constructor(props) {
      super(props);
      this.state = { log: [] };
    }
    HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
    CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');

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

    addLog(value) {
      this.setState({
        log: [...this.state.log, {
          value,
          id: ++unique,
        }],
      });
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
      return value !== 'Do not close';
    }
    deleteLogItem(id) {
      const log = this.state.log.filter(l => l.id !== id);
      this.setState({ log });
    }  
    connectionParams = {  onConnection: this._onConnection.bind(this), connected: false };

    render() {
      return (
        <MenuProvider>
          <View style={THStyles.screen}>
            <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
            <View style={THStyles.filterComponent}>
            <View style={styles.topbar}>
            <Menu name="profiles" renderer={Popover}  onSelect={value => this.selectProfiles(value)} >
              <MenuTrigger style={styles.trigger}>
                <Text style={[styles.text, styles.triggerText]}>Inscription</Text>
              </MenuTrigger>
              <MenuOptions customStyles={{ optionText: [styles.text, styles.slideInOption],  }}  rendererProps={{placement: "bottom"}} style={{backgroundColor: Colors.whiteMarooned, borderRadius: 25}}>
                <MenuOption value={1} text='Acheteur'  />
                <MenuOption value={2} text='Vendeur' />
                <MenuOption value={3} text='Intermediaire' />
                  {this.service?<MenuOption value={4} text='Service' />: null}
              </MenuOptions>
            </Menu>
            <View style={{flex:1}}></View>
            <Menu name="types" onSelect={value => this.selectOptionType(value)} onBackdropPress={() => this.addLog('menu will be closed by backdrop')} onOpen={() => this.addLog('menu is opening')} onClose={() => this.addLog('menu is closing')}>
              <MenuTrigger onAlternativeAction={() => this.addLog('trigger longpressed')} style={styles.trigger}>
                <Text style={[styles.text, styles.triggerText]}>Profiles</Text>
              </MenuTrigger>
              <MenuOptions customStyles={{ optionText: styles.text, backgroundColor: Colors.homeCorporate }} style={{backgroundColor: Colors.TH_POPUP, borderRadius: 25}}>
                <MenuOption value="profile" text='Profile' />
                <MenuOption value="paramètres" disabled={true} text='Paramètres' />
                <MenuOption value="payment" disableTouchable={true} text='Paiement' />
                <MenuOption value="network" text='Notre Réseau' />
                <View style={styles.divider}/>
                <MenuOption value={{ help_chapter: 'profile' }} text='Aides/Profile' />
              </MenuOptions>
            </Menu>
          </View>

          <ScrollView style={styles.logView}>
            {this.state.log.map((l, i) => {
              const wrapperStyle = {backgroundColor: i % 2 ? '#fd654241' : '#fd654265'};
              const textStyle = {color: l.highlighted ? 'red' : 'black'};
              return (
                <View style={[styles.logItem, wrapperStyle]} key={l.id}>
                  <Text style={[styles.text, textStyle]}>{l.value}</Text>
                  <View style={{flex:1}}></View>
                  <Menu>
                    <MenuTrigger text='edit' customStyles={{ triggerText: styles.text }} />
                    <MenuOptions customStyles={{ optionText: styles.text }}>
                      <MenuOption onSelect={() => this.toggleHighlight(l.id)} text={l.highlighted ? 'Unhighlight' : 'Highlight'} />
                      <MenuOption onSelect={() => this.deleteLogItem(l.id)} text='Delete' />
                    </MenuOptions>
                  </Menu>
                </View>
              );
              })}
            </ScrollView>
            <View style={THStyles.imageContainer} >
                <Image  source={this.CentraleHomeScreenImageUri} style={THStyles.centralImage}></Image>
                <Text style={THStyles.logoTitle}>TinderHouse</Text>
                <Text style={THStyles.middleLeitmotive}>Vente Rapide  -  Achat Rapide</Text>
            </View>
            <View style={THStyles.middleScreen}>
              <View style={THStyles.startActionUserButtonContainer}>
                <View style={THStyles.startActionUserSignIn}>
                    <THButton text="Retour" onPress={() => {this.props.navigation.navigate('Home', this.connectionParams)}} theme="homeStart" outline size="small"/>
                </View>
              </View>
            </View>
            <THBaseButtons style={THStyles.buttonContainer} fromTop='35' navigation={this.props.navigation} />
            <Copyright />
            </View>
            </ImageBackground>
          </View>
          </MenuProvider>
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
    color: 'white'
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
