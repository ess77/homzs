import React, { Component } from 'react'
import { View, StyleSheet, Text  } from 'react-native';
import { TextInput  } from 'react-native-paper';

export default class THRNPTextInputForm extends Component {
    render() {
        const { label, keyboardType, value, placeholder,onChangeText, security, meta: {touched, error, warning}, input: {onChange, ...restInput} } = this.props;
        return (
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={label}
              style={{ backgroundColor: 'transparent', paddingLeft: 5, paddingBottom: 0 }}
              placeholder={ placeholder }
              value={value}
              onChange={onChange}
              onChangeText={onChangeText}
              keyboardType={keyboardType} 
              secureTextEntry={security} 
              {...restInput} />
            {touched && ((error && <Text style={{color: 'red'}}>{error}</Text> ) || warning && <Text style={{color: 'orange'}}>{warning}</Text>)}
            </View>
            )
          }
        }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  helper: {
    flexShrink: 1,
  },
  counterHelper: {
    textAlign: 'right',
  },
  inputContainerStyle: {
    margin: 0,
    width: 375,
    paddingLeft: 25
  },
  fontSize: {
    fontSize: 24,
  },
  textArea: {
    height: 80,
  },
});
