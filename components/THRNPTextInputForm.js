import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import THStyles from '../constants/THStyles';

export default class THRNPTextInputForm extends Component {
    constructor(props) {
      super(props);
      this.state = { value: '' };
    }
    render() {
        const { label, keyboardType, value, onChangeText, error, placeholder, security, helperTextMessage } = this.props;
        return (
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={label}
              style={{ backgroundColor: 'transparent', paddingLeft: 5, paddingBottom: 0 }}
              placeholder={ placeholder }
              value={value}
              error={error}
              onChangeText={onChangeText}
              keyboardType={keyboardType} 
              secureTextEntry={security} />
            <HelperText type="error" padding="none" visible={error}>{helperTextMessage}</HelperText>
          </View>
        )
    }
}
// {touched && ((error && <Text style={{color: 'red'}}>{error}</Text> ) || warning && <Text style={{color: 'orange'}}>{warning}</Text>)}
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
