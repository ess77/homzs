import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, KeyboardAvoidingView, StatusBar, TouchableOpacity } from 'react-native';
import THStyles from '../constants/THStyles';
import { CONTACT_FORM } from '../constants/FormNames';
import THRNPTextInputForm from './THRNPTextInputForm';
import { Text, Button, Appbar } from 'react-native-paper';
import THBaseButtons from './THBaseButtons';
import { authLocal } from './sessionManagement/firebase';
import Colors from '../constants/Colors';
import { helperTextErrorMessages } from '../constants/HelperTextMessage';

let errorMessage = '';
let errors = {};
let warns = {};
let compteurPassage = 0;


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
  compteurPassage++;
  console.log('Validate : ', compteurPassage);

  return errors;
}

const warn = values => {
  warns = {};
  // console.log('warn : values : ', values);
  compteurPassage++;
  console.log('Warn : ', compteurPassage);
  if(nameComplexityNotValid(values.email)) warns.email = helperTextErrorMessages.emailError;
  return warns;
}

const submitFail = errors => {
  if(Object.keys(errors).length > 0 ) errorMessage = helperTextErrorMessages.errorMessageAll;
  compteurPassage++;
  console.log('SubmitFail : ', compteurPassage);
  signInWithEmailAndPasswordHandler(null, null );
  console.log('SignInForm : submitFail : Ne vous acharnez pas, ça ne marchera pas : ', errorMessage);
}

const submitval = values => {
  const { email, password } = values;
  console.log('SignInForm : submitval : Validation en cours... : ', values);
  compteurPassage++;
  console.log('SubmitVal : ', compteurPassage);
  if(email && password) {
    return {email, password};
  } else {
    return false;
  }
}

const submitSignIn = validationOk => {
  // errorMessage = '';
  compteurPassage++;
  console.log('SubmitSignIn : ', compteurPassage);
  const { email, password } = validationOk;
  console.log('SignInForm : submitSignIn : ', email);
  // signInWithEmailAndPasswordHandler('rete@gmail.com', 'jam176');
  validationOk? signInWithEmailAndPasswordHandler(email, password) : signInWithEmailAndPasswordHandler(null, null);
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
            console.error('SignInForm : signInWithEmailAndPasswordHandler : Erreur lors du sign in par email et password. ',  error);
            errorMessage = error;
    });
  }
};


const SignInField = (props) => {
    // console.log('SignInForm : initialize state.');
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    
    const toggleHidePassword = () => {
      setHidePassword(!hidePassword);
      console.log('SignInForm : toggleHidePassword : ', hidePassword);
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
              <Text style={THStyles.loginTitle}>Bonjour !</Text>
              <Text style={THStyles.loginSubText}>Connecter vous pour décourvrir nos services.</Text>
                    
              <Field component={THRNPTextInputForm} value={email} 
                     onChangeText={text => { setEmail(text); } } 
                     keyboardType="email-address" label="Email" 
                     placeholder={htem.mailPlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="email" mode="outlined" />

              
              <Field component={THRNPTextInputForm} value={password} 
                     onChangeText={text => setPassword(text)} 
                     keyboardType="default" label="Password" 
                     placeholder={htem.passwordPlaceholderText}
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white', borderWidth: 1, borderColor: 'white' }} 
                     name="password" security={hidePassword} mode="outlined" />
                {!!errorMessage && <Text style={THStyles.errorMessageText} visible={true} >Erreur : {errorMessage}</Text>}
              <View style={THStyles.buttonGroup2} style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="submit" style={{ marginTop: 15, backgroundColor:  Colors.homeCorporate, width: 398 }} icon="send" mode="contained" onPress={handleSubmit(submitval)}>Connexion</Button>
                <TouchableOpacity activeOpacity={0.1} onPress={() => navigation.navigate('SignMdpOublie')} >
                  <Text style={{color:"blue", marginTop: 20, textDecorationLine: 'underline'}}>Mot de Passe oublié?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <THBaseButtons style={THStyles.buttonContainer} fromTop='265' disabled={true}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
};

export const SignInForm = reduxForm({
  form: CONTACT_FORM,
  validate,
  warn,
  onSubmitSuccess: submitSignIn,
  onSubmitFail: submitFail,
})(SignInField);


