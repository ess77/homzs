import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'

export default class AuthLoadingScreen extends Component {

    constructor (props) {
        super(props)
        this.loadApp();
    }
    

    loadApp = async() => {
        const userToken = await AsyncStorage.getItem('userToken')
        this.props.navigation.navigate(userToken?'App':'Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  
