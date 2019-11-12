import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import THButton from './THButton';
import THConstants from '../constants/THConstants';
import { CONTACT_FORM } from '../constants/FormNames';

const RemoteButton = ({ dispatch }) => {
    return (
        <THButton  text={ THConstants.submit } theme="homeBottom" outline size="small" onPress={ () => dispatch(submit(CONTACT_FORM)) } />
    );
}

const RemoteSubmitButton = connect()(RemoteButton);
export default RemoteSubmitButton;

