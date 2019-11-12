import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';
                                                                    
export default class FetchLocation extends Component {
    render() {
        return (
            <Button title='Get Location' onPress={this.props.onGetLocation} ></Button>
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
        textAlign: 'center',
    }
});