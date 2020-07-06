import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import THBaseButtons from './THBaseButtons';
import { CONTACT_FORM } from '../constants/FormNames';
let errorMessage = undefined;
let valid = true;

const requiredValid = (values) => { if(values && values.trim()) return true} ;
  
const nameMax20NotValid = values => { if(values && values.length > 20) {return true } else { return false }};
  
const alphabeticalOnlyValid = values => { if(/^[\s-a-zA-Z]*$/i.test(values)) return true};

const passwordValid = values => { if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values)) return true};

const mailValid = values => { if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) return true};

const nameComplexityValid = values => { if(values !== 'coco' && values !== 'fifi' && values !== 'dede' && values !== 'roro') return true};

const validate = values => {
  const errors = {};
  if (nameMax20NotValid(values.username)) {
   errors.username = 'username doit être de longueur inférieure à 20 caractères.'
 }
  if (!requiredValid(values.username)) {
    errors.username = 'reqired';
  }
  console.log('errors : ', errors);
  return errors;
}

const renderField = ({ label, keyboardType, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return(
      <View style={{ flexDirection: 'column', height: 70, alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', width: 80 }}>{label} </Text>
          <TextInput style={{ borderColor: 'steelblue', borderWidth: 1, height: 37, width: 220, padding: 5 }} keyboardType={keyboardType} onChangeText={onChange} {...restInput} ></TextInput>
        </View>
        {touched && ((error && <Text style={{ color: 'red' }} >{error} </Text> ) || (warning && <Text style={{ color: 'orange'}}>{warning} </Text> ))}
      </View>
    );
}

const submit = values => {
   alert(`Validation OK! Values = ~${JSON.stringify(values)}`);
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

const SignInField = (props) => {
 // console.log('SignInForm : render message.', this.state.username);
    const decomp = { handleSubmit, navigation } = props;
    const { ...htem } = helperTextErrorMessages;
    return (
      <View >
              <Text style={THStyles.loginTitle}>Login : </Text>

              <Field keyboardType="default" label="Username" placeholder={htem.usernamePlaceholderText}
                     component={renderField} name="username"
                    //  onChange={validate}
                     helperTextMessage={helperTextErrorMessages.usernameError}/>

              <Field keyboardType="email-address" label="Email" placeholder={htem.mailPlaceholderText} 
                     component={renderField} name="email"
                     helperTextMessage={htem.mailHelperText} />

              <Field keyboardType="default" label="Password" placeholder={htem.passwordPlaceholderText} 
                     component={renderField} name="password"
                     security={true}
                     helperTextMessage={htem.passwordHelperText} />

                <TouchableOpacity  onPress={() => {decomp.navigation.goBack()}} outline size="small">
                  <Text style={{ backgroundColor: 'steelblue', color: 'white', fontSize: 16, height: 50, width: 200, textAlign: 'center', padding: 10, margin: 10 }}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={handleSubmit(submit)}  outline size="small">
                  <Text style={{ backgroundColor: 'steelblue', color: 'white', fontSize: 16, height: 50, width: 200, textAlign: 'center', padding: 10, margin: 10  }}>Connexion</Text>
                </TouchableOpacity>
      </View>
    );
  }

export const SignInForm = reduxForm({
  form: CONTACT_FORM,
  validate: validate,
})(SignInField);
