import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import THStyles from '../constants/THStyles';
export default class THTextInput extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        outline: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        theme: PropTypes.oneOf(['primary', 'secondary', 'homeStart', 'homeBottom']),
        disabled: PropTypes.bool,
    };
    static defaultProps = {
        size: 'small',
        theme: 'primary',
        outline: false,
        disabled: false,
    }

    render() {
        const { text, name, onPress, disabled } = this.props;
        return (
            <View style={THStyles.THImainContainer}>
                <View onPress={onPress}>
                    <TextInput type="text" className="my-1 p-1 w-full" name={name} value={text} placeholder="Ex. : martin123@gmail.com" id="userEmail" />
                </View>
            </View>
        )
    }
}
