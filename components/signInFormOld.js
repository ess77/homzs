import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Field, reduxForm, Form } from 'redux-form';
import THStyles from '../constants/THStyles';
import THButton from './THButton';
import { CONTACT_FORM } from '../constants/FormNames';
import THTextInputForm from './THTextInputForm';
// import * as firebase from 'firebase';
import THBaseButtons from './THBaseButtons';
import { authLocal } from './sessionManagement/firebase';


const required = values => { if(values === undefined) { return 'requis'; }} ;
  
const nameMax20 = values => { if(values && values.length > 20) { return 'Le nom user doit avoir moins de 20 caractères!'; }};

  
const mailValid = values => { if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) {return 'Veuillez fournir un email valide!';}};

const nameTooSimple = values => { // values = username
  if(values === 'coco' || values === 'fifi' || values === 'dede' || values === 'roro') { return 'Vous pouvez faire mieux que ça, n\'est ce pas!' }
};

const format = (value, name) => {
  let enteredValue = new String(value);

  // return value + " : ";
  return enteredValue.replace('\w', '*');
}

const signInWithEmailAndPasswordHandler = (email, password) => {
  // event.preventDefault();
  console.log('signInWithEmailAndPasswordHandler : SignInField : success : ' + email);
  authLocal.signInWithEmailAndPassword(email, password).then((result) => {
    console.log('signInWithEmailAndPasswordHandler : SignInField : authenticated : ' + result.user.email);
  })
    .catch(error => {
          console.error('Erreur lors du sign in par email et password.' + error);
  });
};

const submitval = values => {
  const { email, password } = values;
  console.log('Validation OK! : ', values);
  signInWithEmailAndPasswordHandler(email, password);
  // signInWithEmailAndPasswordHandler('gege@gmail.com', 'jam176');
  this.props.navigation.navigate('HomeUser');
}


const submitSuccess = props => {
  // decomp = { navigation } = props;
    console.log('submitSuccess : ', props);
}
  
const submitFail = errors => {
  // this.props.navigation.navigate('HomeUser');
  console.log('submitFail : Ne vous acharnez pas, ça ne marchera pas!!!\n', errors);
  
}



class SignInField extends Component {
  render() {
    const decomp = { handleSubmit, navigation } = this.props;
    return (
        <View style={THStyles.filterComponent}>
          <View style={THStyles.userSignInForm}>
            <View style={THStyles.userSignInField}>
              <Text>Test Form : </Text>
              <Field keyboardType="default" label="Username" component={THTextInputForm} name="username" validate={[nameMax20]} warn={[nameTooSimple]} />
              <Field keyboardType="email-address" label="Email" component={THTextInputForm} name="email" validate={[]} />
              <Field keyboardType="default" label="Password" type="password" component={THTextInputForm} name="password" validate={[]} format={() => format()} />
            </View>
            <View style={THStyles.buttonGroup2}>
              <THButton text="Annuler" onPress={() => {decomp.navigation.goBack()}} theme="cancel" outline size="small"/>
              <THButton type="submit" text="Connexion" onPress={decomp.handleSubmit(submitval)} theme="validate" outline size="small"/>
            </View>
          </View>
          <THBaseButtons style={THStyles.buttonContainer} fromTop='210' />
        </View>
    );
  }
};

export const SignInForm = reduxForm({
  form: CONTACT_FORM,
  // onSubmit: submitval,
  onSubmitSuccess: submitSuccess,
  onSubmitFail : submitFail,
})(SignInField);
