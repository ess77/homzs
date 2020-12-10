import React, { Component } from 'react';
import { SignUpBuyerForm } from './SignUpBuyer';
import { ImageBackground } from 'react-native';
import Copyright from './Copyright';
import THStyles from '../constants/THStyles';
import THConstants from '../constants/THConstants';
import THBaseButtons from './THBaseButtons';
  

export default class SignUpBuyerWrapper extends Component {
   
    render() {
      return (
        <ImageBackground style={THStyles.imageBackground} source={THConstants.HomeScreenImageUri} >
            <SignUpBuyerForm navigation={this.props.navigation} />
            <THBaseButtons style={THStyles.buttonContainer} fromTop='-5' disabled={true}/>
            <Copyright />
        </ImageBackground>
        );
    }
};