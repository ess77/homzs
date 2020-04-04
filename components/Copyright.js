import React from 'react';
import { View, Text } from 'react-native';

const Copyright = () => {
    return(
        <View style={THStyles.copyrightContainer}>
            <Text style={THStyles.copyrightText}>{THConstants.copyrightText}</Text>
        </View>);
}
export default Copyright;