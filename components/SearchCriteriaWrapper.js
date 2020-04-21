import React, { Component } from 'react';
import { SearchCriteriaForm } from './SearchCriteria';
  

export default class SearchCriteriaWrapper extends Component {
   
    render() {
      return (
            <SearchCriteriaForm navigation={this.props.navigation} />
        );
    }
};