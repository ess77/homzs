import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import THStyles from '../constants/THStyles';
import { CONTACT_FORM_MDP_LBC } from '../constants/FormNames';
import THRNPTextInputForm from './THRNPTextInputForm';
import { Text, Button, Appbar } from 'react-native-paper';
import THBaseButtons from './THBaseButtons';
import { authLocal } from './sessionManagement/firebase';
import Colors from '../constants/Colors';
import { helperTextErrorMessages } from '../constants/HelperTextMessage';

let errorMessage = '';
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
  errorMessage = '';
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
  if(nameComplexityNotValid(values.email)) warns.email = helperTextErrorMessages.emailError;
  return warns;
}

const submitval = values => {
  const { email, password } = values;
  errorMessage = '';
  console.log('SignMdpOublieLBC : submitval : Validation en cours... : ', values);
  if(email && password) {
    return {email, password};
  } else {
    return false;
  }
}

const submitSignIn = validationOk => {
  errorMessage = '';
  const { email, password } = validationOk;
  console.log('SignMdpOublieLBC : submitSignIn : ', email);
  // signInWithEmailAndPasswordHandler('rete@gmail.com', 'jam176');
  validationOk? signInWithEmailAndPasswordHandler(email, password) : signInWithEmailAndPasswordHandler(null, null);
}
  
const submitFail = errors => {
  console.log('SignMdpOublieLBC : submitFail : Ne vous acharnez pas, ça ne marchera pas.\n', errors)
  if(Object.keys(errors).length > 0 ) errorMessage = helperTextErrorMessages.errorMessageAll;
  signInWithEmailAndPasswordHandler(null, null );
}

const signInWithEmailAndPasswordHandler = (email, password) => {
  if((!email) || (!password)) {
    //security signout, to protect privacy
    authLocal.signOut();
    console.log('signInWithEmailAndPasswordHandler : Securely signing out!');
  } else {
    authLocal.signInWithEmailAndPassword(email, password).then((result) => {
      console.log('SignMdpOublieLBC : signInWithEmailAndPasswordHandler : authenticated : ' + result.user.email);
    })
      .catch(error => {
            //TODO : gestion UX des erreurs
            // console.error('SignMdpOublieLBC : signInWithEmailAndPasswordHandler : Erreur lors du sign in par email et password. ',  error);
            errorMessage = error;
    });
  }
};


const SignMdpOublieLBC = (props) => {
    // console.log('SignMdpOublieLBC : initialize state.');
    // const { username, setUsername } = useState('');
    const [email, setEmail] = useState('');
    // const { errorMsg, seterrorMsg } = useState(errorMessage);
    // const { usernameMessage, setUsernameMessage } = useState(undefined);
    // const { emailMessage, setEmailMessage } = useState(null);
    const [hidePassword, setHidePassword] = useState(true);
    // const { passwordMessage, setPasswordMessage } = useState(false);
    // const { showInfo, setShowInfo } = useState(false);

    const resetErrorMsg = () => {
      console.log('resetErrorMsg');
      errorMessage = '';
    }

    const toggleHidePassword = () => {
      setHidePassword(!hidePassword);
      console.log('SignMdpOublieLBC : toggleHidePassword : ', hidePassword);
    }
    const { handleSubmit, navigation } = props;
    const { ...htem } = helperTextErrorMessages;
    return (
      <View style={THStyles.filterComponentRNP}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-300}>
          <ScrollView keyboardShouldPersistTaps={'handled'} removeClippedSubviews={false}>
            <StatusBar backgroundColor={ Colors.homeCorporate } barStyle={"default"} />
            <Appbar.Header dark={true} style={THStyles.appbarHeader}>
              <Appbar.Content title="TinderHouze" subtitle={'Déjà Chez-moi!'} />
              <Appbar.BackAction icon="step-back" onPress={() => {navigation.goBack()}} />
              <Appbar.Action icon="step-forward" onPress={() => {toggleHidePassword()}} />
            </Appbar.Header>
            <View style={{marginTop: 15}}>
              <Text style={THStyles.loginTitle}>Réinitialisation de Mot de Passe :</Text>
              <Text style={THStyles.loginSubText}>Veuillez renseigner votre mail.</Text>
                    
              <Field component={THRNPTextInputForm} value={email} 
                     onChangeText={text => {resetErrorMsg(); setEmail(text)} } 
                     keyboardType="email-address" label="Email" 
                     placeholder={htem.mailPlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="email" mode="outlined" />

              
                {!!errorMessage && <Text style={THStyles.errorMessageText}>Erreur : {errorMessage}</Text>}
              <View style={THStyles.buttonGroup2} style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="submit" style={{ marginTop: 15, backgroundColor:  Colors.homeCorporate, color: 'red', width: 398 }} icon="lock-reset" mode="contained" onPress={handleSubmit(submitval)}>Réinitialiser</Button>
                <Button style={{ marginTop: 15, backgroundColor:  Colors.homeCorporate, width: 200 }} icon="step-backward"  onPress={() => navigation.navigate('SignIn')}>Retour</Button>
              </View>
            </View>
            <THBaseButtons style={THStyles.buttonContainer} fromTop='320' disabled={true}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
};

export const SignMdpOublieLBCForm = reduxForm({
  form: CONTACT_FORM_MDP_LBC,
  validate,
  warn,
  onSubmitSuccess: submitSignIn,
  onSubmitFail: submitFail,
})(SignMdpOublieLBC);