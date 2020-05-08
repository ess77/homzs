import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

export default class THRNPTextInputForm extends Component {
    render() {
        const { label, keyboardType, value, error, placeholder,onChangeText, security, helperTextMessage, input: {onChange, ...restInput} } = this.props;
        // const { label, keyboardType, value, security, autofocus, meta: {touched, error, warning}, input: {onFocus, onChange, ...restInput} } = this.props;
        return (
          <View style={styles.inputContainerStyle}>
            <TextInput
              label={label}
              style={{ backgroundColor: 'transparent', paddingLeft: 5, paddingBottom: 0 }}
              placeholder={ placeholder }
              value={value}
              error={error}
              onChange={onChange}
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
