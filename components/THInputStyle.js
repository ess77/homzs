import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import THStyles from '../constants/THStyles';

const getStyle = ({size, theme, outline, disabled}) => {
    const inputStyles = [THStyles.THInputDefault];
    const labelStyles = [THStyles.THIlabelContainer];
    const textStyles = [THStyles.THItextDefault];

    if(theme === 'secondary') {
         inputStyles.push(THStyle.containerSecondary);
         labelStyles.push(THStyles.containerSecondary);
         textStyles.push(THStyles.textSecondary);
    } else if(theme === 'primary') {
        inputStyles.push(THStyles.containerPrimary);
        labelStyles.push(THStyles.containerPrimary);
         textStyles.push(THStyles.textPrimary);
    } else if(theme === 'homeStart') {
        inputStyles.push(THStyles.containerHomeStart);
        labelStyles.push(THStyles.containerHomeStart);
        textStyles.push(THStyles.textPrimary);
    } else {
        inputStyles.push(THStyles.containerHomeBottom);
        labelStyles.push(THStyles.containerHomeBottom);
        textStyles.push(THStyles.textPrimary);
    }
    if(size === 'large') {
        inputStyles.push(THStyles.containerLarge);
        labelStyles.push(THStyles.containerLarge);
        textStyles.push(THStyles.textLarge);
   } else if(size === 'small') {
       inputStyles.push(THStyles.containerSmall);
       labelStyles.push(THStyles.containerSmall);
        textStyles.push(THStyles.textSmall);
   } else {
    inputStyles.push(THStyles.inputDefault);
    labelStyles.push(THStyles.labelContainer);
    textStyles.push(THStyles.textDefault);
   }

    return { inputStyles, textStyles, labelStyles };
};

export default class THTextInputStyle extends Component {
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
        const { textStyles, inputStyles, labelStyles  } = getStyle({ disabled, ...rest });
        return (
            <View style={THStyles.THImainContainer}>
                <View onPress={onPress} disabled={disabled} style={labelStyles} >
                    <Text style={textStyles}>{text}</Text>
                </View>
                <View onPress={onPress} disabled={disabled} style={inputStyles} >
                    <TextInput placeholder={text} />
                </View>
            </View>
        )
    }
}
