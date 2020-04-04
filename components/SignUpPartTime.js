import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import Colors from '../constants/Colors';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';

export default class SignUpPartTime extends Component {
    HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
    CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');

    static  navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.home
        }
    }
    render() {
        return (
            <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
                <View style={THStyles.filterComponent}>
                    <View style={THStyles.container}>
                        <TextInput style={THStyles.inputBox} placeholder="Nom" placeholderTextColor={Colors.button} />
                        <TextInput style={THStyles.inputBox} placeholder="Prénom" placeholderTextColor={Colors.button} />
                        <TextInput style={THStyles.inputBox} placeholder="Date de Naissance" placeholderTextColor={Colors.button} />
                        <TextInput style={THStyles.inputBox} placeholder="Adresse" placeholderTextColor={Colors.button} />
                        <TextInput style={THStyles.inputBox} placeholder="Email" placeholderTextColor={Colors.button} />
                        <TextInput style={THStyles.inputBox} placeholder="Password" placeholderTextColor={Colors.button} />
                        <TextInput style={THStyles.inputBox} placeholder="Retaper Votre Password" placeholderTextColor={Colors.button} />
                        <TouchableOpacity style={THStyles.buttonPT} onPress={() => {this.props.navigation.navigate('Home')}} >
                            <Text style={THStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Copyright />
            </ImageBackground>
            );
        }
    }
