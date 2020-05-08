import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native';
import THStyles from '../constants/THStyles';

export default class THTextInputForm extends Component {
    render() {
        const { label, keyboardType, value, security, autofocus, meta: {touched, error, warning}, input: {onFocus, onChange, ...restInput} } = this.props;
        return (
                <View style={THStyles.THIFmainContainer}>
                    <View style={THStyles.renderField}>
                        <Text style={THStyles.THIFlabelContainer}>{label}</Text>
                        <TextInput style={THStyles.THIFinputDefault} keyboardType={keyboardType} secureTextEntry={security} onChangeText={onChange} onFocus={onFocus} value={value} autofocus={autofocus} ></TextInput>
                    </View>
                    {touched && ((error && <Text style={{color: 'red'}}>{error}</Text> ) || warning && <Text style={{color: 'orange'}}>{warning}</Text>)}
                </View>
        )
    }
}
