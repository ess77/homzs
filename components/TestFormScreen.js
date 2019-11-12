import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TestForm from './TestForm';
        
const handleSubmit = values => {
    console.log('Soumission du formulaire!', values);
}

export default class TestFormScreen extends Component {
    render() {
        return (
            <View style={styles.main}>
                <TestForm></TestForm>
            </View>
        );
    }
}
                                                                     
const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    mainText: {
        textAlign: 'center'
    }
});