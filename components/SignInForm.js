import React, { Component } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import THStyles from '../constants/THStyles';
import THButton from './THButton';
import { CONTACT_FORM } from '../constants/FormNames';
import THRNPTextInputForm from './THRNPTextInputForm';
import THBaseButtons from './THBaseButtons';
import { authLocal } from './sessionManagement/firebase';

let errorMessage = undefined;
const requiredValid = values => { if(values.trim()) return true} ;
  
const nameMax20Valid = values => { if(values && values.length < 21) return true};
  
const alphabeticalOnlyValid = values => { if(/^[\s-a-zA-Z]*$/i.test(values)) return true};

const passwordValid = values => { if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values)) return true};

const mailValid = values => { if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) return true};

const nameComplexityValid = values => { if(values !== 'coco' && values !== 'fifi' && values !== 'dede' && values !== 'roro') return true};


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
  const { email, password } = values;
  errorMessage = '';
  console.log('SignInForm : submitval : Validation en cours... : ', values);
  if(email && password) {
    return {email, password};
  } else {
    return false;
  }
}


const submitSuccess = validationOk => {
  errorMessage = undefined;
  const {username, email, password } = validationOk;
  console.log('SignInForm : submitSuccess : ', username);
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
  constructor(props) {
    super(props);
    console.log('SignInForm : constructor.');
    this.state = {
      username: '',
      email: '',
      password: '',
      errorMsg: errorMessage,
      usernameMessage: undefined,
      emailMessage: '',
      passwordMessage: '',
    }
  }

  removeMessage = (event) => {
    if(this.state.errorMsg) {
      console.log('SignInForm : removing message.', this.state.errorMsg);
      errorMessage = '';
      this.setState({errorMsg: ''});
    }
  }

  usernameValidation = tempUsername => {
    const valid = requiredValid(tempUsername) && nameMax20Valid(tempUsername) && alphabeticalOnlyValid(tempUsername);
    if(!valid) {
      console.log('SignInForm : usernameValidation not valid', valid, tempUsername);
      this.setState({username: tempUsername.trim(), usernameMessage: helperTextErrorMessages.usernameError});
    } else {
      this.setState({username: tempUsername.trim(), usernameMessage: ''});
    }
    return valid;
  }

  emailValidation = tempEmail => {
    const valid = requiredValid(tempEmail) && mailValid(tempEmail);
    if(!valid) {
      console.log('SignInForm : emailValidation not valid', valid, tempEmail);
      this.setState({email: tempEmail.trim(), emailMessage: helperTextErrorMessages.mailHelperText});
    } else {
      this.setState({email: tempEmail.trim(), emailMessage: ''});
    }
    return valid;
  }

  passwordValidation = tempPassword => {
    // const valid = requiredValid(tempPassword) && nameMax20Valid(tempPassword) && passwordValid(tempPassword);
    const valid = requiredValid(tempPassword) && nameMax20Valid(tempPassword);
    if(!valid) {
      console.log('SignInForm : passwordValidation not valid', valid, tempPassword);
      this.setState({password: tempPassword.trim(), passwordMessage: helperTextErrorMessages.passwordHelperText});
    } else {
      this.setState({password: tempPassword.trim(), passwordMessage: ''});
    }
    return valid;
  }

  render() {
    console.log('SignInForm : render message.', this.state.username);
    const decomp = { handleSubmit, navigation } = this.props;
    const { ...htem } = helperTextErrorMessages;
    return (
      <View>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-500}>
        <ScrollView keyboardShouldPersistTaps={'never'} removeClippedSubviews={false}>
          <View style={THStyles.filterComponent}>
            <View style={THStyles.userSignInForm}>
              <Text style={THStyles.loginTitle}>Login : </Text>

              <Field keyboardType="default" label="Username" placeholder={htem.usernamePlaceholderText}
                     component={THRNPTextInputForm} name="username"
                     onChangeText={this.usernameValidation}
                     value={this.state.username}
                     error={!!this.state.usernameMessage}
                     helperTextMessage={helperTextErrorMessages.usernameError}/>

              <Field keyboardType="email-address" label="Email" placeholder={htem.mailPlaceholderText} 
                     component={THRNPTextInputForm} name="email"
                     onChangeText={this.emailValidation}
                     value={this.state.email}
                     error={!!this.state.emailMessage}
                     helperTextMessage={htem.mailHelperText} />

              <Field keyboardType="default" label="Password" placeholder={htem.passwordPlaceholderText} 
                     component={THRNPTextInputForm} name="password"
                     onChangeText={this.passwordValidation} security={true}
                     value={this.state.password}
                     error={!!this.state.passwordMessage}
                     helperTextMessage={htem.passwordHelperText} />

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
