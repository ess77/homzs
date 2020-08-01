import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import THStyles from '../constants/THStyles';
import { SIGNUP_PART_TIME_FORM } from '../constants/FormNames';
import THRNPTextInputForm from './THRNPTextInputForm';
import { Text, Button, Appbar, Chip, List } from 'react-native-paper';
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

const birthdateNotLegal = values => { if(values && values.length > 10) { return true } else { return false }};
  
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
   * Birthdate Validation
   */
  if(required(values.birthdate)) errors.birthdate = helperTextErrorMessages.birthdateError;
   else if(birthdateNotLegal(values.birthdate)) errors.birthdate = helperTextErrorMessages.birthdateLegalHelperText;
  //  else if(fieldExceeds30(values.email)) errors.email = helperTextErrorMessages.emailLengthError;

  /**
   * studyLevel Validation
   */
  if(required(values.studyLevel)) errors.studyLevel = helperTextErrorMessages.studyLevelError;

  /**
   * Last diploma Validation
   */
  if(required(values.lastDiploma)) errors.lastDiploma = helperTextErrorMessages.lastDiplomaError;
   else if(notAlphabeticalOnly(values.lastDiploma)) errors.lastDiploma = helperTextErrorMessages.lastDiplomaHelperText;
   else if(fieldExceeds30(values.lastDiploma)) errors.lastDiploma = helperTextErrorMessages.lastDiplomaHelperTextLengthError;
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
  signInWithEmailAndPasswordHandler(null, null );
  console.log('SignUpPartTime : submitFail : Ne vous acharnez pas, ça ne marchera pas : ', errorMessage);
}

const submitval = values => {
  const { email, password } = values;
  console.log('SignUpPartTime : submitval : Validation en cours... : ', values);
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
  // const { email, password } = validationOk;
  // console.log('SignUpPartTime : submitSignIn : ', email);
  // signInWithEmailAndPasswordHandler('rete@gmail.com', 'jam176');
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
        console.log('SignUpPartTime : signUpWithEmailAndPasswordHandler : authenticated : ' + email);
        return userCredentials.user.updateProfile({
            displayName: username
        })
    })
    .catch(error => {
        console.error('SignUpPartTime : signUpWithEmailAndPasswordHandler : Erreur lors du sign in par email et password. ',  error);
        this.setState({ errorMessage: error.message });
    });
  }
};

const SignUpPartTime = (props) => {
    // console.log('SignUpPartTime : initialize state.');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [studyLevel, setStudyLevel] = useState('-');
    const [lastDiploma, setLastDiploma] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [expanded, setExpanded] = useState(false);

    
    const toggleHidePassword = () => {
      setHidePassword(!hidePassword);
      console.log('SignUpForm : toggleHidePassword : ', hidePassword);
    }

    const studyLevelSettings = (value) => {
      if(value) setStudyLevel(value);
      setExpanded(!expanded);
      // console.log('SignUpForm : studyLevelSettings : ', studyLevel);
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
              <Chip style={THStyles.textProfilePartTimeSignUp}>Profil First Services</Chip>
              <Text style={THStyles.loginTitle}>Bonjour.</Text>
              <Text style={THStyles.loginSubText}>Inscrivez-vous pour faire décourvrir nos services.</Text>
              <Text style={THStyles.loginSubText}>Devenez notre ambassadeur ou ambassadrice client.</Text>
                    
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
              <Field component={THRNPTextInputForm} value={birthdate} 
                     onChangeText={text => setBirthdate(text) } 
                     keyboardType="default" label="Date de Naissance" 
                     placeholder={htem.birthdatePlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="birthdate" mode="outlined" />
              <List.Section>
                     <List.Accordion
                       title={`Votre niveau d'étude : ${studyLevel}`}
                       left={props => <List.Icon {...props} icon="send" />}
                       expanded={expanded}
                       onPress={studyLevelSettings}>
                       <List.Item title="Bac + 1" onPress={() => studyLevelSettings('Bac + 1')}/>
                       <List.Item title="Bac + 2" onPress={() => studyLevelSettings('Bac + 2')}/>
                       <List.Item title="Bac + 3" onPress={() => studyLevelSettings('Bac + 3')}/>
                       <List.Item title="Bac + 4" onPress={() => studyLevelSettings('Bac + 4')}/>
                       <List.Item title="Bac + 5" onPress={() => studyLevelSettings('Bac + 5')}/>
                       <List.Item title="Bac + 6" onPress={() => studyLevelSettings('Bac + 6')}/>
                       <List.Item title="Bac + 7" onPress={() => studyLevelSettings('Bac + 7')}/>
                     </List.Accordion>
              </List.Section>


              <Field component={THRNPTextInputForm} value={lastDiploma} 
                    onChangeText={text => setLastDiploma(text) } 
                    keyboardType="default" label="Dernier diplôme validé" 
                    placeholder={htem.lastDiplomaHelperText} 
                    componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                    name="lastDiploma" mode="outlined" />
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

export const SignUpPartTimeForm = reduxForm({
  form: SIGNUP_PART_TIME_FORM,
  validate,
  warn,
  onSubmitSuccess: submitSignIn,
  onSubmitFail: submitFail,
})(SignUpPartTime);
