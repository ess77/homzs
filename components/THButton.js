import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import THStyles from '../constants/THStyles';



const getStyle = ({size, theme, outline, disabled}) => {
    const containerStyles = [THStyles.containerDefault];
    const textStyles = [THStyles.textDefault];

    if(theme === 'secondary') {
         containerStyles.push(THStyles.containerSecondary);
         textStyles.push(THStyles.textSecondary);
    } else if(theme === 'primary') {
        containerStyles.push(THStyles.containerPrimary);
         textStyles.push(THStyles.textPrimary);
    } else if(theme === 'homeStart') {
        containerStyles.push(THStyles.containerHomeStart);
        textStyles.push(THStyles.textPrimary);
    } else if(theme === 'cancel') {
        containerStyles.push(THStyles.cancel);
        textStyles.push(THStyles.textPrimary);
    } else if(theme === 'validate') {
        containerStyles.push(THStyles.validate);
        textStyles.push(THStyles.textSmall);
    } else if(theme === 'homeBottom') {
        containerStyles.push(THStyles.containerHomeBottom);
        textStyles.push(THStyles.textPrimary);
    }
    if(size === 'large') {
        containerStyles.push(THStyles.containerLarge);
        textStyles.push(THStyles.textLarge);
   } else if(size === 'small') {
       containerStyles.push(THStyles.containerSmall);
        textStyles.push(THStyles.textSmall);
   } else {
    containerStyles.push(THStyles.containerDefault);
    textStyles.push(THStyles.textDefault);
   }

    return { containerStyles, textStyles };
};

export default class THButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        userContainerStyles: PropTypes.object,
        userTextStyles: PropTypes.object,
        onPress: PropTypes.func.isRequired,
        onPress: PropTypes.func.isRequired,
        outline: PropTypes.bool,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        theme: PropTypes.oneOf(['primary', 'secondary', 'homeStart', 'homeBottom', 'validate', 'cancel']),
        disabled: PropTypes.bool,
    };
    static defaultProps = {
        size: 'default',
        theme: 'primary',
        outline: false,
        disabled: false,
    }

    render() {
        const { text, onPress, disabled, userContainerStyles, userTextStyles, ...rest } = this.props;
        const { textStyles, containerStyles  } = getStyle({ disabled, ...rest });
        if(userContainerStyles && userTextStyles) {
            return (
                <TouchableOpacity onPress={onPress} disabled={disabled} style={userContainerStyles} >
                    <Text style={userTextStyles}>{text}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={onPress} disabled={disabled} style={containerStyles} >
                    <Text style={textStyles}>{text}</Text>
                </TouchableOpacity>
            )
        }
    }
}
