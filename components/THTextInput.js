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
        const { text, onPress, disabled, ...rest } = this.props;
        return (
            <View style={THStyles.THImainContainer}>
                <View onPress={onPress} disabled={disabled}>
                    <label htmlFor="userEmail" className="block">Email:</label>
                    <input type="email" className="my-1 p-1 w-full" name="userEmail" value={email} placeholder="Ex. : martin123@gmail.com" id="userEmail" onChange={event => onChangeHandler(event)}/>
                </View>
            </View>
        )
    }
}
