import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import THStyles from '../constants/THStyles';
import { SIGNUP_BUYER_FORM } from '../constants/FormNames';
import THRNPTextInputForm from './THRNPTextInputForm';
import { Text, Button, Appbar, Chip } from 'react-native-paper';
import { authLocal } from './sessionManagement/firebase';
import Colors from '../constants/Colors';
import { helperTextErrorMessages } from '../constants/HelperTextMessage';

let errorMessage = '';
let errors = {};
let warns = {};
let compteurPassage = 0;


const required = (values) => { if(!values || !values.trim()) return true} ;
  
const fieldExceeds30 = values => { if(values && values.length > 30) { return true } else { return false }};

const fieldNotEq10 = values => { if(values && values.length !== 10) { return true } else { return false }};
  
const notAlphabeticalOnly = values => { if(/^[\s-a-zA-Z]*$/i.test(values)) { return false } else { return true }};

const phoneNumberNotValid = values => { if(/^[\0-9]*$/i.test(values)) { return false } else { return true }};

const notValidPassword = values => { if(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g.test(values)) { return false } else { return true }};

const mailNotValid = values => { if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) { return false } else { return true }};

const nameComplexityNotValid = values => { if(values === 'coco' || values === 'fifi' || values === 'dede' || values === 'roro') { return true } else { return false }};

/**
 * VALIDATION FUNCTIONS
 */
const validate = values => {
  errors = {};
  errorMessage = '';

  /**
   * Firstname Validation
   */
  if(required(values.firstname)) errors.firstname = helperTextErrorMessages.firstnameError;
  else if(notAlphabeticalOnly(values.firstname)) errors.firstname = helperTextErrorMessages.firstnameHelperText;
   else if(fieldExceeds30(values.firstname)) errors.firstname = helperTextErrorMessages.firstnameLengthError;

  /**
   * Lastname Validation
   */
  if(required(values.lastname)) errors.lastname = helperTextErrorMessages.lastnameError;
   else if(notAlphabeticalOnly(values.lastname)) errors.lastname = helperTextErrorMessages.lastnameHelperText;
   else if(fieldExceeds30(values.lastname)) errors.lastname = helperTextErrorMessages.lastnameLengthError;

  /**
   * Username Validation
   */
  if(required(values.username)) errors.username = helperTextErrorMessages.usernameError;
   else if(notAlphabeticalOnly(values.username)) errors.username = helperTextErrorMessages.usernameHelperText;
   else if(fieldExceeds30(values.username)) errors.username = helperTextErrorMessages.usernameLengthError;

  /**
   * Mail Validation
   */
  if(required(values.email)) errors.email = helperTextErrorMessages.emailError;
   else if(mailNotValid(values.email)) errors.email = helperTextErrorMessages.mailHelperText;
   else if(fieldExceeds30(values.email)) errors.email = helperTextErrorMessages.emailLengthError;

  /**
   * Mobile Validation
   */
  if(required(values.mobile)) errors.mobile = helperTextErrorMessages.mobileError;
   else if(phoneNumberNotValid(values.mobile)) errors.mobile = helperTextErrorMessages.mobileHelperText;
   else if(fieldNotEq10(values.mobile)) errors.mobile = helperTextErrorMessages.mobileLengthError;

  /**
   * Phone Validation
   */
  if(required(values.phone)) errors.phone = helperTextErrorMessages.phoneError;
  else if(phoneNumberNotValid(values.phone)) errors.phone = helperTextErrorMessages.phoneHelperText;
  else if(fieldNotEq10(values.phone)) errors.phone = helperTextErrorMessages.phoneLengthError;
  
  /**
   * Password Validation
   */
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
  signUpWithEmailAndPasswordHandler(null, null );
  console.log('SignUpBuyerForm : submitFail : Ne vous acharnez pas, ça ne marchera pas : ', errorMessage);
}

const submitval = values => {
  const { email, password } = values;
  console.log('SignUpBuyerForm : submitval : Validation en cours... : ', values);
  compteurPassage++;
  console.log('SubmitVal : ', compteurPassage);
  if(email && password) {
    return {email, password};
  } else {
    return false;
  }
}

const submitSignUp = validationOk => {
  // errorMessage = '';
  compteurPassage++;
  console.log('SubmitSignUpBuyer : ', compteurPassage);
  // const { email, password } = validationOk;
  // console.log('SignUpBuyerForm : submitSignUp : ', email);
  // signUpWithEmailAndPasswordHandler('rete@gmail.com', 'jam176');
  validationOk? signUpWithEmailAndPasswordHandler(validationOk) : signUpWithEmailAndPasswordHandler(null);
}
  
const signUpWithEmailAndPasswordHandler = values => {
  const { email, password, username } = values;
  if((!email) || (!password)) {
    //security signout, to protect privacy
    authLocal.signOut();
    console.log('signUpWithEmailAndPasswordHandler : Securely signUp!');
  } else {

    authLocal.createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
        console.log('SignUpBuyer : signUpWithEmailAndPasswordHandler : authenticated : ' + email);
        return userCredentials.user.updateProfile({
            displayName: username
        })
    })
    .catch(error => {
        console.error('SignUpBuyer : signUpWithEmailAndPasswordHandler : Erreur lors du sign in par email et password. ',  error);
        this.setState({ errorMessage: error.message });
    });
  }
};


const SignUpBuyer = (props) => {
    // console.log('SignUpBuyerForm : initialize state.');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    
    const toggleHidePassword = () => {
      setHidePassword(!hidePassword);
      console.log('SignUpBuyerForm : toggleHidePassword : ', hidePassword);
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
              <Chip  style={THStyles.textProfileBuyerSignUp}>Profil Acheteur</Chip>
              <Text style={THStyles.loginTitle}>Bonjour !</Text>
              <Text style={THStyles.loginSubText}>Inscrivez-vous pour décourvrir nos services.</Text>
                    
              <Field component={THRNPTextInputForm} value={firstname} 
                     onChangeText={text => setFirstname(text) } 
                     keyboardType="default" label="Prénom" 
                     placeholder={htem.firstnamePlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="firstname" mode="outlined" />
              <Field component={THRNPTextInputForm} value={lastname} 
                     onChangeText={text => setLastname(text) } 
                     keyboardType="default" label="Nom" 
                     placeholder={htem.lastnamePlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="lastname" mode="outlined" />
              <Field component={THRNPTextInputForm} value={username} 
                     onChangeText={text => setUsername(text) } 
                     keyboardType="default" label="Username" 
                     placeholder={htem.lastnamePlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="username" mode="outlined" />
              <Field component={THRNPTextInputForm} value={email} 
                     onChangeText={text => setEmail(text) } 
                     keyboardType="email-address" label="Email" 
                     placeholder={htem.mailPlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="email" mode="outlined" />
              <Field component={THRNPTextInputForm} value={mobilePhone} 
                     onChangeText={text => setMobilePhone(text) } 
                     keyboardType="numeric" label="Tél. Mobile" 
                     placeholder={htem.mobilePhonePlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="mobile" mode="outlined" />
              <Field component={THRNPTextInputForm} value={phone} 
                     onChangeText={text => setPhone(text) } 
                     keyboardType="numeric" label="Tél. Fixe" 
                     placeholder={htem.phonePlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="phone" mode="outlined" />

              
              <Field component={THRNPTextInputForm} value={password} 
                     onChangeText={text => setPassword(text)} 
                     keyboardType="default" label="Password" 
                     placeholder={htem.passwordPlaceholderText}
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white', borderWidth: 1, borderColor: 'white' }} 
                     name="password" security={hidePassword} mode="outlined" />

                {!!errorMessage && <Text style={THStyles.errorMessageText} visible={true} >Erreur : {errorMessage}</Text>}
              <View style={THStyles.buttonGroup2} style={{ display: 'flex', alignItems: 'center' }}>
                <Button type="submit" style={{ marginTop: 15, backgroundColor:  Colors.homeCorporate, width: 398 }} icon="send" mode="contained" onPress={handleSubmit(submitval)}>Valider</Button>
                <Button style={{ marginTop: 15, backgroundColor:  Colors.homeCorporate, width: 200 }} icon="step-backward"  onPress={() => navigation.navigate('SignUpChoice')}>Annuler</Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
};

export const SignUpBuyerForm = reduxForm({
  form: SIGNUP_BUYER_FORM,
  validate,
  warn,
  onSubmitSuccess: submitSignUp,
  onSubmitFail: submitFail,
})(SignUpBuyer);





