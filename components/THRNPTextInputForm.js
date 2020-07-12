import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image  } from 'react-native';
import { TextInput  } from 'react-native-paper';

export default class THRNPTextInputForm extends Component {
  constructor() {
    super();
    this.state = { hidePassword: true };
    this.count = 0;

    this.onBlur = this.onBlur.bind(this);
  }

  setPasswordVisibility = () => {
    // console.log('setPasswordVisibility : ');
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  onBlur() {
    this.count++;
    console.log('blur', this.count)
  }
    render() {
        const { label, keyboardType, mode, componentStyle, value, placeholder,onChangeText, security, meta: {touched, error, warning}, input: {onChange, ...restInput} } = this.props;
        return (
          <View style={styles.containerStyle}>
          
          {!security && <View style={styles.inputStyle}> 
                          <TextInput
                            label={label}
                            style={componentStyle}
                            mode={mode}
                            placeholder={ placeholder }
                            value={value}
                            onChange={onChange}
                            onChangeText={onChangeText}
                            keyboardType={keyboardType} 
                            secureTextEntry={this.state.hidePassword} 
                            {...restInput} />
                        </View>}
          {security &&  <View style={styles.inputStyleSecurity}>
                          <TextInput
                            label={label}
                            style={ componentStyle }
                            mode={mode}
                            placeholder={ placeholder }
                            value={value}
                            onChange={onChange}
                            onChangeText={onChangeText}
                            keyboardType={keyboardType} 
                            secureTextEntry={this.state.hidePassword} 
                            {...restInput}
                            onMouseEnt={this.onBlur}
                            underlineColorAndroid="transparent" />
                          
                            <TouchableOpacity activeOpacity={0.1} onPress={this.setPasswordVisibility} style={styles.touchableButtonView} >
                              <Image source={ (this.state.hidePassword) ? require('../assets/images/eye_clear_green.png') : require('../assets/images/eye_hidden.png') } style={styles.buttonImage} />
                            </TouchableOpacity>
                        </View>}
            {touched && ((error && <Text style={{color: 'red'}}>{error}</Text> ) || warning && <Text style={{color: 'orange'}}>{warning}</Text>)}
            </View>
            )
          }
        }

const styles = StyleSheet.create({
  containerStyle: {
     flexDirection: 'column',
    margin: 0,
    width: 375,
    paddingLeft: 25,
  },
  inputStyle: {
    flexDirection: 'column',
    // backgroundColor: 'purple',
    width: 370,
  },
  inputStyleSecurity: {
    flexDirection: 'row',
    backgroundColor: 'purple',
    width: 370,
      // padding: 10,
  },
  touchableButtonView: {
    // backgroundColor: 'red',
    position: 'absolute',
    top: 37,
    right: 5,
    // marginTop: 30,
    // marginRight: 30,
    // justifyContent: 'center',
    // alignSelf: 'center',
    height: 25,
    width: 25,
  },
  buttonImage: {
    // resizeMode: 'contain',
    height: 25,
    width: 25,
  }

});