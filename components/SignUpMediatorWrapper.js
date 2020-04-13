import React, { Component } from 'react';
import { SignUpMediatorForm } from './SignUpMediator';
  

export default class SignUpMediatorWrapper extends Component {
   
    render() {
      return (
            <SignUpMediatorForm navigation={this.props.navigation} />
        );
    }
};