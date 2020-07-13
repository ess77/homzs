import React, { Component } from 'react';
import { SignUpPartTimeForm } from './SignUpPartTime';
import { ImageBackground } from 'react-native';
import Copyright from './Copyright';
import THStyles from '../constants/THStyles';
import THConstants from '../constants/THConstants';
import THBaseButtons from './THBaseButtons';
  

export default class SignUpPartTimeWrapper extends Component {
   
    render() {
      return (

        <ImageBackground style={THStyles.imageBackground} source={THConstants.HomeScreenImageUri} >
            <SignUpPartTimeForm navigation={this.props.navigation} />
            <THBaseButtons style={THStyles.buttonContainer} fromTop='-5' disabled={true}/>
            <Copyright />
        </ImageBackground>
        );
    }
};