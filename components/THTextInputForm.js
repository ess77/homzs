import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import THStyles from '../constants/THStyles';

export default class THTextInputForm extends Component {
    render() {
        const { label, keyboardType, meta: {touched, error, warning}, input: {onChange, ...restInput} } = this.props;
        return (
                <View style={THStyles.THIFmainContainer}>
                    <View style={THStyles.renderField}>
                        <Text style={THStyles.THIFlabelContainer}>{label}</Text>
                        <TextInput style={THStyles.THIFinputDefault} keyboardType={keyboardType} onChangeText={onChange} autoFocus={true} {...restInput} ></TextInput>
                    </View>
                    {touched && ((error && <Text style={{color: 'green'}}>{error}</Text> ) || warning && <Text style={{color: 'orange'}}>{warning}</Text>)}
                </View>
        )
    }
}
