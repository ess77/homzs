import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import THStyles from '../constants/THStyles';
import THButton from './THButton';
import RemoteSubmitButton from './RemoteSubmitButton';
import { CONTACT_FORM } from '../constants/FormNames';
import THTextInputForm from './THTextInputForm';
import UselessTextInput from './TestInput';

const required = values => { if(values === undefined) { return 'requis'; }} ;
  
const nameMax20 = values => { if(values.length > 20) { return 'Le nom user doit avoir moins de 20 caractères!'; }};

  
const mailValid = values => { if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) {return 'Veuillez fournir un email valide!';}};

const nameTooSimple = values => { // values = username
  if(values === 'coco' || values === 'fifi' || values === 'dede' || values === 'roro') { return 'Vous pouvez faire mieux que ça, n\'est ce pas!' }
};

const format = (value, name) => {
  let enteredValue = new String(value);

  return value + " : ";
  // return enteredValue.replace('\w', '*');
}
const submit = values => {
  console.log('Validation OK! : ', values);
}

const onSubmitSuccess = props => {
  // decomp = { navigation } = props;
    console.log('onSubmitSuccess....', props);
}
  
const onSubmitFail = errors => {
  // this.props.navigation.navigate('HomeUser');
  console.log('Ne vous acharnez pas, ça ne marchera pas!!!\n', errors);
  
}

class SignInField extends Component {
  render() {
    const decomp = { handleSubmit, navigation } = this.props;
    return (
        <View style={THStyles.filterComponent}>
            <View style={THStyles.userSignInForm}>
              <View style={THStyles.userSignInField}>
                  <Text>Test Form : </Text>
                  <Field keyboardType="default" label="Username" component={THTextInputForm} name="username" validate={[required, nameMax20]} warn={[nameTooSimple]} />
                  <Field keyboardType="email-address" label="Email" component={THTextInputForm} name="email" validate={[required, mailValid]} />
                  <Field keyboardType="default" label="Password" component={THTextInputForm} name="password" validate={[required]} format={() => format()} />
                </View>
                <View style={THStyles.buttonGroup2}>
                  <THButton text="Annuler" onPress={() => {decomp.navigation.goBack()}} theme="cancel" outline size="small"/>
                  <THButton text="Connexion" onPress={decomp.handleSubmit(submit)} theme="validate" outline size="small"/>
                  <RemoteSubmitButton />
                </View>
                <View>
                  <UselessTextInput />
                </View>
            </View>
            <View style={THStyles.buttonContainerSignIn}>
                <THButton text="Recherche" onPress={() => {navigation.navigate('LocateUser')}} theme="homeBottom" outline size="small"/>
                <THButton text="Selection" onPress={() => {navigation.navigate('TinderHouses')}} theme="homeBottom" outline size="small"/>
                <THButton text='Transactions' onPress={() => navigation.navigate('TestFlex')} theme="homeBottom" outline size="small"/>
            </View>
        </View>
    );
  }
};

export const SignInForm = reduxForm({
    form: CONTACT_FORM,
    onSubmit: submit,
    onSubmitSuccess,
    onSubmitFail,
  })(SignInField);