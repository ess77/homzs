import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Field, reduxForm, Form } from 'redux-form';
import THStyles from '../constants/THStyles';
import THButton from './THButton';
import { CONTACT_FORM } from '../constants/FormNames';
import THTextInputForm from './THTextInputForm';
// import * as firebase from 'firebase';
import THBaseButtons from './THBaseButtons';
import { authLocal, logoutUpdateUserDocument } from './sessionManagement/firebase';

let errorMessage = undefined;
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
  if((!email) || (!password)) {
    //security signout, to protect privacy
    authLocal.signOut();
    console.log('signInWithEmailAndPasswordHandler : Securely signing out!');
  } else {
    authLocal.signInWithEmailAndPassword(email, password).then((result) => {
      console.log('SignInForm : signInWithEmailAndPasswordHandler : authenticated : ' + result.user.email);
    })
      .catch(error => {
            //TODO : gestion UX des erreurs
            // console.error('SignInForm : signInWithEmailAndPasswordHandler : Erreur lors du sign in par email et password. ',  error);
            errorMessage = error;
    });
  }
};

const submitval = values => {
  errorMessage = '';
  const { email, password } = values;
  console.log('SignInForm : submitval : Validation en cours! : ', values);
  if(email && password) {
    return {email, password};
  } else {
    return false;
  }
}


const submitSuccess = validationOk => {
  errorMessage = undefined;
  const { email, password } = validationOk;
  console.log('SignInForm : submitSuccess : ', validationOk);
  // signInWithEmailAndPasswordHandler('rete@gmail.com', 'jam176');
  validationOk? signInWithEmailAndPasswordHandler(email, password) : signInWithEmailAndPasswordHandler(null, null );
}
  
const submitFail = errors => {
  console.log('SignInForm : submitFail : Ne vous acharnez pas, ça ne marchera pas.\n', errors);
  errorMessage = 'Veuillez remplir les champs requis!';
  signInWithEmailAndPasswordHandler(null, null );
}



class SignInField extends Component {
  state = {
    errorMsg: errorMessage
  } 
  removeMessage = (event) => {
    this.setState({errorMsg: ''});
    errorMessage = '';
    console.log('SignInForm : removing message.', this.state.errorMsg);
  }
  render() {
    const decomp = { handleSubmit, navigation } = this.props;
    return (
        <View style={THStyles.filterComponent}>
          <View style={THStyles.userSignInForm}>
            <View style={THStyles.userSignInField}>
              <Text style={THStyles.loginTitle}>Login : </Text>
              <Field keyboardType="default" label="Username"  onFocus={(event) => this.removeMessage(event)} component={THTextInputForm} name="username" validate={[required, nameMax20]} warn={[nameTooSimple]} autofocus/>
              <Field keyboardType="email-address" label="Email" onFocus={(event) => this.removeMessage(event)} component={THTextInputForm} name="email" validate={[required]} />
              <Field keyboardType="default" label="Password" onFocus={(event) => this.removeMessage(event)} security={true} component={THTextInputForm} name="password" validate={[required]} format={() => format()} />
            </View>
            <View style={THStyles.buttonGroup2}>
              <THButton text="Annuler" onPress={() => {decomp.navigation.goBack()}} theme="cancel" outline size="small"/>
              <THButton type="submit" text="Connexion" onPress={decomp.handleSubmit(submitval)} theme="validate" outline size="small"/>
            </View>
            {!!errorMessage && <Text style={THStyles.errorMessageText}>Erreur : {errorMessage}</Text>}
          </View>
          <THBaseButtons style={THStyles.buttonContainer} fromTop='210' />
        </View>
    );
  }
};

export const SignInForm = reduxForm({
  form: CONTACT_FORM,
  onSubmit: submitval,
  onSubmitSuccess: submitSuccess,
  onSubmitFail : submitFail,
})(SignInField);
