import React, { Component } from 'react';
import { SignUpSellerForm } from './SignUpSeller';
  

export default class SignUpSellerWrapper extends Component {
   
    render() {
      return (
            <SignUpSellerForm navigation={this.props.navigation} />
        );
    }
};