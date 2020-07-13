import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import THStyles from '../constants/THStyles';
import { SIGNUP_PART_TIME_FORM } from '../constants/FormNames';
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


const SignUpPartTime = (props) => {
    // console.log('SignInForm : initialize state.');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [rsacAgent, setRsacAgent] = useState('');
    const [agenceSiret, setAgenceSiret] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
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
              <Field component={THRNPTextInputForm} value={agenceSiret} 
                     onChangeText={text => setAgenceSiret(text) } 
                     keyboardType="default" label="Agence/SIRET" 
                     placeholder={htem.agenceSiretHelperText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="companySiret" mode="outlined" />
              <Field component={THRNPTextInputForm} value={rsacAgent} 
                     onChangeText={text => setRsacAgent(text) } 
                     keyboardType="numeric" label="N° RSAC Agent" 
                     placeholder={htem.rsacAgentHelperText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="realtorRSAC" mode="outlined" />
              <Field component={THRNPTextInputForm} value={mobilePhone} 
                     onChangeText={text => setMobilePhone(text) } 
                     keyboardType="numeric" label="Tél. Mobile" 
                     placeholder={htem.mobilePhonePlaceholderText} 
                     componentStyle={{ marginTop: 15, width: 370, backgroundColor: 'white'  }}
                     name="mobilePhone" mode="outlined" />
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
