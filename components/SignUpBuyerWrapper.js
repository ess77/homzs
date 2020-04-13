import React, { Component } from 'react';
import { SignUpBuyerForm } from './SignUpBuyer';
  

export default class SignUpBuyerWrapper extends Component {
   
    render() {
      return (
            <SignUpBuyerForm navigation={this.props.navigation} />
        );
    }
};