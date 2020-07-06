import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import THStyles from '../constants/THStyles';
import THButton from './THButton';
import { CONTACT_FORM } from '../constants/FormNames';
import THRNPTextInputForm from './THRNPTextInputForm';
import THBaseButtons from './THBaseButtons';
import { authLocal } from './sessionManagement/firebase';

let errorMessage = undefined;
let errors = {};
let warns = {};


const required = (values) => { if(!values || !values.trim()) return true} ;
  
const fieldExceeds30 = values => { if(values && values.length > 30) { return true } else { return false }};
  
const notAlphabeticalOnly = values => { if(/^[\s-a-zA-Z]*$/i.test(values)) { return false } else { return true }};

const notValidPassword = values => { if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values)) { return false } else { return true }};

const mailNotValid = values => { if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) { return false } else { return true }};

const nameComplexityNotValid = values => { if(values === 'coco' || values === 'fifi' || values === 'dede' || values === 'roro') { return true } else { return false }};

/**
 * VALIDATION FUNCTIONS
 */
const validate = values => {
  errors = {};
  if(required(values.username)) errors.username = helperTextErrorMessages.usernameError;
  else if(notAlphabeticalOnly(values.username)) errors.username = helperTextErrorMessages.alphabeticalError;
   else if(fieldExceeds30(values.username)) errors.username = helperTextErrorMessages.usernameLengthError;

  if(required(values.email)) errors.email = helperTextErrorMessages.emailError;
   else if(mailNotValid(values.email)) errors.email = helperTextErrorMessages.mailHelperText;
   else if(fieldExceeds30(values.email)) errors.email = helperTextErrorMessages.emailLengthError;

  if(required(values.password)) errors.password = helperTextErrorMessages.passwordError;
  //  else if(notValidPassword(values.password)) errors.password = helperTextErrorMessages.mailHelperText;
   else if(fieldExceeds30(values.password)) errors.password = helperTextErrorMessages.passwordLengthError;
 
  // console.log('errors : ', errors);

  return errors;
}

const warn = values => {
  warns = {};
  // console.log('warn : values : ', values);
  if(nameComplexityNotValid(values.username)) warns.username = helperTextErrorMessages.usernameToSimple;
  return warns;
}

const submitval = values => {
  const { email, password, props } = values;
  errorMessage = '';
  console.log('SignInForm : submitval : Validation en cours... : ', values);
  if(email && password) {
    return {email, password, props};
  } else {
    return false;
  }
}

const submitSignIn = validationOk => {
  errorMessage = '';
  const { email, password } = validationOk;
  console.log('SignInForm : submitSignIn : ', email);
  // signInWithEmailAndPasswordHandler('rete@gmail.com', 'jam176');
  validationOk? signInWithEmailAndPasswordHandler(email, password) : signInWithEmailAndPasswordHandler(null, null);
}
  
const submitFail = errors => {
  console.log('SignInForm : submitFail : Ne vous acharnez pas, ça ne marchera pas.\n', errors);
  errorMessage = 'Veuillez remplir les champs requis!';
  signInWithEmailAndPasswordHandler(null, null );
}

const signInWithEmailAndPasswordHandler = (email, password) => {
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

const SignInFieldLBC = (props) => {
    console.log('SignInForm : initialize state.');
    // const { username, setUsername } = useState('');
    // const { email, setEmail } = useState('');
    // const { password, setPassword } = useState('');
    // const { errorMsg, seterrorMsg } = useState(errorMessage);
    // const { usernameMessage, setUsernameMessage } = useState(undefined);
    // const { emailMessage, setEmailMessage } = useState(null);
    // const { passwordMessage, setPasswordMessage } = useState(false);
    // const { showInfo, setShowInfo } = useState(false);

    // console.log('SignInForm : render message.', username);
    const { handleSubmit, navigation } = props;
    const { ...htem } = helperTextErrorMessages;
    return (
      <View style={THStyles.filterComponentRNP}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-300}>
          <ScrollView keyboardShouldPersistTaps={'never'} removeClippedSubviews={false}>
            <View style={{marginTop: 185}}>
              <Text style={THStyles.loginTitle}>Bonjour !</Text>
              <Text style={THStyles.loginSubText}>Connecter vous pour décourvrir nos services.</Text>

              <Field keyboardType="default" label="Username" placeholder={htem.usernamePlaceholderText}
                     component={THRNPTextInputForm} name="username" />
                    
              <Field keyboardType="email-address" label="Email" placeholder={htem.mailPlaceholderText} 
                     component={THRNPTextInputForm} name="email" />

              <Field keyboardType="default" label="Password" placeholder={htem.passwordPlaceholderText} 
                     component={THRNPTextInputForm} name="password" security />

              <View style={THStyles.buttonGroup2}>
                <THButton text="Annuler" onPress={() => {navigation.goBack()}} theme="cancel" outline size="small"/>
                <THButton type="submit" text="Connexion" onPress={handleSubmit(submitval)} theme="validate" outline size="small"/>
              </View>
              {!!errorMessage && <Text style={THStyles.errorMessageText}>Erreur : {errorMessage}</Text>}
            </View>
            <THBaseButtons style={THStyles.buttonContainer} fromTop='210' />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
};

export const SignInFormLBC = reduxForm({
  form: CONTACT_FORM,
  validate,
  warn,
  onSubmitSuccess: submitSignIn,
  onSubmitFail: submitFail,
})(SignInFieldLBC);


const helperTextErrorMessages = {
  usernamePlaceholderText: 'Entrer votre username, avec des lettres.',
  usernameError: 'Attention: Veuillez entrer le nom du user.',
  alphabeticalError: 'Attention: Seules les lettres sont autorisée.',
  usernameLengthError: 'Le nom user doit avoir moins de 30 caractères.',
  usernameToSimple: 'Éviter d\'utiliser des noms trop simples.',
  emailError: 'Attention: Veuillez entrer le mail du user.',
  emailLengthError: 'Le mail user doit avoir moins de 30 caractères.',
  mailHelperText: 'Votre email doit être de la forme : pseudo@nom-domain.com',
  mailPlaceholderText: 'Entrer votre mail.',
  passwordPlaceholderText: 'Entrer votre password.',
  passwordError: 'Votre mot de passe est nécéssaire pour être connecté.',
  passwordLengthError: 'Le mot de passe doit avoir moins de 30 caractères.',
  passwordHelperText: 'Attention: Le mot de passe doit comporter au moins une lettre, un chiffre, et un caractère spécial, il doit aussi avoir une longueur de 8 caractère minimum.',
}

