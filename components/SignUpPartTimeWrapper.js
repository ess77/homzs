import React, { Component } from 'react';
import { SignUpPartTimeForm } from './SignUpPartTime';
  

export default class SignUpPartTimeWrapper extends Component {
   
    render() {
      return (
            <SignUpPartTimeForm navigation={this.props.navigation} />
        );
    }
};