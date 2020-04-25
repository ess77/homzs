import React, { Component } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import THStyles from '../constants/THStyles';
import THButton from './THButton';
import { CONTACT_FORM } from '../constants/FormNames';
import THBaseButtons from './THBaseButtons';
import { authLocal, logoutUpdateUserDocument } from './sessionManagement/firebase';
import THRNPTextInputForm from './THRNPTextInputForm';

let errorMessage = undefined;
const required = values => { if(values === undefined) { return 'requis'; }} ;
  
const nameMax20 = values => { if(values && values.length > 20) { return helperTextErrorMessages.usernameMaxLength; }};
  
const alphabeticalOnly = values => { if(! /^[a-zA-Z]*$/i.test(values)) {return helperTextErrorMessages.usernameHelperText;}};

const validPassword = values => { if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values)) {return helperTextErrorMessages.passwordHelperText;}};

const validMail = values => { if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) {return 'Veuillez fournir un email valide!';}};

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

const helperTextErrorMessages = {
  usernamePlaceholderText: "Entrer votre username, avec des lettres.",
  usernameError: "Attention: Seules les lettres sont autorisée.",
  usernameWarning: "Le nom user doit avoir moins de 20 caractères!",
  mailPlaceholderText: "Entrer votre mail.",
  mailHelperText: "Votre email doit être de la forme : pseudo@nom-domain.com",
  passwordPlaceholderText: "Entrer votre password.",
  passwordHelperText: "Attention: Le mot de passe doit comporter au moins une lettre, un chiffre, et un caractère spécial, il doit aussi avoir une longueur de 8 caractère minimum.",
}

class SignInField extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    errorMsg: errorMessage,
    usernameMessage: '',
    emailMessage: '',
    passwordMessage: '',
  } 
  removeMessage = (event) => {
    if(this.state.errorMsg) {
      console.log('SignInForm : removing message.', this.state.errorMsg);
      errorMessage = '';
      this.setState({errorMsg: ''});
    }
  }
  usernameValidation = event => {
    const tempUsername = event.nativeEvent.text;
    const valid = /^[a-zA-Z]*$/.test(tempUsername);
    if(!valid) {
      console.log('SignInForm : usernameValidation not valid', valid, tempUsername);
      this.setState({username: tempUsername, usernameMessage: helperTextErrorMessages.usernameError});
    } else {
      this.setState({username: tempUsername, errorMsg: ''});
    }
    return valid;
  }
  render() {
    console.log('SignInForm : render message.', this.state.errorMsg, this.state.username);
    const decomp = { handleSubmit, navigation } = this.props;
    const { ...htem } = helperTextErrorMessages;
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-300}>
      <ScrollView keyboardShouldPersistTaps={'never'} removeClippedSubviews={false}>
        <View style={THStyles.filterComponent}>
          <View style={THStyles.userSignInForm}>
              <Text style={THStyles.loginTitle}>Login : </Text>

              <Field keyboardType="default" label="Username" placeholder={htem.usernamePlaceholderText}
                     onFocus={(event) => this.removeMessage(event)} component={THRNPTextInputForm} name="username"
                     onChange={(value) => {this.usernameValidation(value)}}
                      warn={[nameTooSimple]} validate={[required, nameMax20, alphabeticalOnly]} helperTextMessage={this.state.usernameMessage}/>

              <Field keyboardType="email-address" label="Email" placeholder={htem.mailPlaceholderText} 
                     onFocus={(event) => this.removeMessage(event)} component={THRNPTextInputForm} name="email"
                     validate={[required, validMail]} helperTextErrorMessage={htem.mailHelperText} />

              <Field keyboardType="default" label="Password" placeholder={htem.passwordPlaceholderText} 
                     onFocus={(event) => this.removeMessage(event)} security={true} component={THRNPTextInputForm} name="password" 
                     validate={[required, validPassword]} helperTextErrorMessage={htem.passwordHelperText} format={() => format()} />

            <View style={THStyles.buttonGroup2}>
              <THButton text="Annuler" onPress={() => {decomp.navigation.goBack()}} theme="cancel" outline size="small"/>
              <THButton type="submit" text="Connexion" onPress={decomp.handleSubmit(submitval)} theme="validate" outline size="small"/>
            </View>
            {!!errorMessage && <Text style={THStyles.errorMessageText}>Erreur : {errorMessage}</Text>}
          </View>
          <THBaseButtons style={THStyles.buttonContainer} fromTop='210' />
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
  }
};

export const SignInForm = reduxForm({
  form: CONTACT_FORM,
  onSubmit: submitval,
  onSubmitSuccess: submitSuccess,
  onSubmitFail : submitFail,
})(SignInField);
