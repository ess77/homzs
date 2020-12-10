import React, { useState, Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { reduxForm, Field } from 'redux-form';
import { CONTACT_FORM_LBC } from '../constants/FormNames';
import THRNPTextInputForm from './THRNPTextInputForm';


const SignInHidePasswordComp = () => {

    const [ hidePassword, setHidePassword ] = useState(true);


  const setPasswordVisibility = () => {
      console.log('setPasswordVisibility : ');
    setHidePassword(!hidePassword);
  }


    return (
        <View style={{marginTop: 100, backgroundColor: 'yellow'}}>
          <Field
          componentStyle={{
            marginTop: 15, 
                       backgroundColor: "green", 
                       width: 370, 
                    //  fontSize: 20,
                    //  alignSelf: 'stretch',
                    //  height: 45,
                    //  paddingRight: 50,
                    //  paddingLeft: 8,
                     borderWidth: 1,
                     borderColor: 'red',
                    //  borderBlock: 'border-top-width',
                    //  borderBlockStyle: 'dashed',
                    //  paddingVertical: 1,
                  }} 
          security
          label="Password" 
          placeholder="Entrer votre password" 
          component={THRNPTextInputForm}
          mode="outlined"
          />
        </View>
    );
}

 const SignInHidePasswordForm = reduxForm({
  form: CONTACT_FORM_LBC,
})(SignInHidePasswordComp);

export default class SignInHidePassword extends Component {
  render() {
    return(
        <SignInHidePasswordForm />
    );
  }
} 

const styles = StyleSheet.create(
  {
    textBox: {
      // backgroundColor: 'green',
      // fontSize: 20,
      // alignSelf: 'stretch',
      // height: 45,
      // paddingRight: 5,
      // paddingLeft: 8,
     
      // borderRadius: 5,
    },
    touchableButton: {
      position: 'absolute',
      // backgroundColor: 'red',
      right: 3,
      borderWidth: 1,
      // paddingVertical: 0,
      borderColor: 'red',
      // height: 40,
      // width: 35,
      // padding: 2
    },
    buttonImage: {
      // resizeMode: 'contain',
      // backgroundColor: 'blue',
      height: 40,
      width: 40,
    }

  });