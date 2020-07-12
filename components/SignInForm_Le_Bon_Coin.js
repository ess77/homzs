import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, KeyboardAvoidingView, StatusBar, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import THStyles from '../constants/THStyles';
import THButton from './THButton';
import { CONTACT_FORM_LBC } from '../constants/FormNames';
import THRNPTextInputForm from './THRNPTextInputForm';
import { Text, Switch, Title, Paragraph, Button, Appbar, Head, ToggleButton } from 'react-native-paper';
import THBaseButtons from './THBaseButtons';
import { authLocal } from './sessionManagement/firebase';
import Colors from '../constants/Colors';
import { helperTextErrorMessages } from '../constants/HelperTextMessage';

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
  console.log('SignInForm : submitval : Validation en cours... : ', values);
  if(email && password) {
    return {email, password};
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
  errorMessage = helperTextErrorMessages.errorMessageAll;
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
    // console.log('SignInForm : initialize state.');
    // const { username, setUsername } = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    // const { errorMsg, seterrorMsg } = useState(errorMessage);
    // const { usernameMessage, setUsernameMessage } = useState(undefined);
    // const { emailMessage, setEmailMessage } = useState(null);
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    // const { passwordMessage, setPasswordMessage } = useState(false);
    // const { showInfo, setShowInfo } = useState(false);

    
    const toggleHidePassword = () => {
      setHidePassword(!hidePassword);
      console.log('SignInForm : toggleHidePassword : ', hidePassword);
    }
    const { handleSubmit, navigation } = props;
    const { ...htem } = helperTextErrorMessages;
    return (
      <View style={THStyles.filterComponentRNP}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-300}>
          <ScrollView keyboardShouldPersistTaps={'never'} removeClippedSubviews={false}>
            <StatusBar backgroundColor={ Colors.homeCorporate } barStyle={"default"} />
            <Appbar.Header dark={true} style={THStyles.appbarHeader}>
              <Appbar.Content title="TinderHouze" subtitle={'Déjà Chez-moi!'} />
              <Appbar.Action icon="magnify" onPress={() => {}} />
            </Appbar.Header>
            <View style={{marginTop: 15}}>
              <Text style={THStyles.loginTitle}>Bonjour !</Text>
              <Text style={THStyles.loginSubText}>Connecter vous pour décourvrir nos services.</Text>
                    
              <Field component={THRNPTextInputForm} value={email} 
                     onChangeText={text => setEmail(text) } 
                     keyboardType="email-address" label="Email" 
                     placeholder={htem.mailPlaceholderText} 
                     style={{ marginTop: 15, backgroundColor: "yellow", width: 370,  }}
                     name="email" mode="outlined" />

              
              <Field component={THRNPTextInputForm} value={password} 
                     onChangeText={text => setPassword(text)} 
                     keyboardType="default" label="Password" 
                     placeholder={htem.passwordPlaceholderText}
                    //  style={{ backgroundColor: 'green', borderWidth: 1, borderColor: 'green', padding:  10, margin: 50, width: 400 }}
                     componentStyle={{ 
                       marginTop: 15, 
                       backgroundColor: "yellow", 
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
                     name="password" security={hidePassword} mode="outlined" />
                {!!errorMessage && <Text style={THStyles.errorMessageText}>Erreur : {errorMessage}</Text>}
              <View style={THStyles.buttonGroup2} style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="submit" style={{ marginTop: 15, backgroundColor:  Colors.homeCorporate, width: 398 }} icon="send" mode="contained" onPress={handleSubmit(submitval)}>Connexion</Button>
                <Text style={{color:"blue", marginTop: 20}}>Mot de Passe oublié?</Text>
              </View>
            </View>
            <THBaseButtons style={THStyles.buttonContainer} fromTop='165' disabled={true}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
};

export const SignInFormLBC = reduxForm({
  form: CONTACT_FORM_LBC,
  validate,
  warn,
  onSubmitSuccess: submitSignIn,
  onSubmitFail: submitFail,
})(SignInFieldLBC);