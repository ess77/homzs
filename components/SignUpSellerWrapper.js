import React, { Component } from 'react';
import { SignUpSellerForm } from './SignUpSeller';
import Copyright from './Copyright';
import { ImageBackground } from 'react-native';
import THStyles from '../constants/THStyles';
import THConstants from '../constants/THConstants';
import THBaseButtons from './THBaseButtons';
  

export default class SignUpSellerWrapper extends Component {
   
    render() {
      return (
        <ImageBackground style={THStyles.imageBackground} source={THConstants.HomeScreenImageUri} >
            <SignUpSellerForm navigation={this.props.navigation} />
            <THBaseButtons style={THStyles.buttonContainer} fromTop='-5' disabled={true}/>
            <Copyright />
        </ImageBackground>
        );
    }
};