import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';


export default class SignInHidePassword extends Component {

  constructor() {
    super();

    this.state = { hidePassword: true }
  }

  setPasswordVisibility = () => {
      console.log('setPasswordVisibility : ');
    this.setState({ hidePassword: !this.state.hidePassword });
  }


  render() {
    return (
        <View style={{marginTop: 100, backgroundColor: 'purple'}}>
          <TextInput secureTextEntry={this.state.hidePassword} style={styles.textBox} 
          label="Password" 
          placeholder="Entrer votre password*" />
          <TouchableOpacity activeOpacity={0.1} style={styles.touchableButton} onPress={this.setPasswordVisibility}>
            <Image source={(this.state.hidePassword) ? require('../assets/images/eye_clear_red.png') : require('../assets/images/eye_hidden.png')} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    textBox: {
      backgroundColor: 'green',
      // fontSize: 20,
      // alignSelf: 'stretch',
      // height: 45,
      // paddingRight: 5,
      // paddingLeft: 8,
     
      // borderRadius: 5,
    },
    touchableButton: {
      position: 'absolute',
      // backgroundColor: 'red',
      right: 3,
      borderWidth: 1,
      // paddingVertical: 0,
      borderColor: 'red',
      // height: 40,
      // width: 35,
      // padding: 2
    },
    buttonImage: {
      // resizeMode: 'contain',
      // backgroundColor: 'blue',
      height: 40,
      width: 40,
    }

  });