import React, { Component } from 'react'
import { View, Text, Field } from 'react-native'
import THStyles from '../constants/THStyles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// const  { DOM: { input, select, textarea } } = React;

export default class THInputForm extends Component {
    onPress() {
        console.log('SearchCriteria : onPress');
      }
    render() {
        // <TouchableWithoutFeedback onPress={this.onPress} accessibilityRole="checkbox">
        const { label, meta: {touched, error, warning}, input: {onChange, ...restInput} } = this.props;
        return (
                <View style={THStyles.THIFmainContainer}>
                    <View style={THStyles.renderField}>
                        <Text style={THStyles.THIFlabelContainer}>{label}</Text>
                        <TouchableWithoutFeedback onPress={this.onPress}>
                        <View style={THStyles.button}>
                          <Text>Touch Here</Text>
                          {touched && ((error && <Text style={{color: 'red'}}>{error}</Text> ) || warning && <Text style={{color: 'orange'}}>{warning}</Text>)}
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                </View>
        )
    }
}
