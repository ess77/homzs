import React, { Component } from 'react';
import { View, ImageBackground, Text, StatusBar } from 'react-native';
import { Field, reduxForm, Form } from 'redux-form';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';
import { SIGNUP_MEDIATOR_FORM } from '../constants/FormNames';
import THTextInputForm from './THTextInputForm';
import { authLocal, generateUserDocument } from './sessionManagement/firebase';


const required = values => { if(values === undefined) { return 'requis'; }} ;
  
const nameMax20 = values => { if(values && values.length > 20) { return 'Le nom user doit avoir moins de 20 caractères!'; }};

  
const mailValid = values => { if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) {return 'Veuillez fournir un email valide!';}};

const nameTooSimple = values => { // values = username
  if(values === 'coco' || values === 'fifi' || values === 'dede' || values === 'roro') { return 'Vous pouvez faire mieux que ça, n\'est ce pas!' }
};

const createUserWithEmailAndPasswordHandler = async (email, password, rest) => {
  const { username } = rest;
  console.log('SignUpMediator : createUserWithEmailAndPasswordHandler : test signup Buyer', username);
  const result = await authLocal.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('SignUpMediator : createUserWithEmailAndPasswordHandler : Erreur lors du sign up par email et password : error = ', errorCode, errorMessage);
  });
  const userInfo = {role:`Buyer`, username: username, photoURL: `https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png`};
  try {
      generateUserDocument(result.user, userInfo, '');
      console.log('SignUpMediator : createUserWithEmailAndPasswordHandler : user Buyer created with mail : ' + email);
  } catch(error) {
    console.log('SignUpMediator : Erreur lors du sign up par email et password : error = ', error);
  };

};

const submitval = values => {
  const { email, password, event, ...rest } = values;
  console.log('Validation OK! : ', values);
  createUserWithEmailAndPasswordHandler(email, password, rest).then(() => {});
}


const submitSuccess = props => {
    console.log('submitSuccess : ', props);
}
  
const submitFail = errors => {
  // this.props.navigation.navigate('HomeUser');
  console.log('submitFail : Ne vous acharnez pas, ça ne marchera pas!!!\n', errors);
  
}

export default class SignUpMediator_old extends Component {
  HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
  CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');
  
  static  navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'Inscription';
    let headerTitleStyle = {
      color: 'white',
    };
    let headerStyle = {
      backgroundColor: Colors.homeCorporate,
    };
    let headerRight = (<THButton 
                          text={ THConstants.notConnected }
                          theme="homeBottom" outline size="small"
                          onPress={ () => params.onConnection() } />);

    let headerBackTitle = 'Back';

    return ({ headerStyle, headerTitleStyle, headerTitle, headerRight, headerBackTitle });
  }

  createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    console.log('test signup Mediator');
    try {
      const {user} =  auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
      this.props.navigation.navigate('SignIn', this.connectionParams);
    } catch(error) {
      setError('Erreur lors du sign up par email et password' + error, error);
    };

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  constructor() {
    super();
    console.log('SignUpMediator : constructor');
    this.state = {
      currentIndex: 0
    }
  }
  _onConnection() { 
    console.log('Connecté : ', this.props.navigation.state.params.connected);
   }

  componentDidMount() {
    // this.props.navigation.setParams({ onConnection: this._onConnection.bind(this) });
  }
  connectionParams = {  onConnection: this._onConnection.bind(this), connected: false };
  render() {
    const decomp = { handleSubmit, navigation } = this.props;
    return (
      <View style={THStyles.screen}>
        <StatusBar backgroundColor={ Colors.homeCorporate } barStyle={"default"} />
        <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
          <View style={THStyles.mainComponent}>
                <View style={THStyles.imageContainer} ><Text>Profil Intermédiant : </Text>
                  <View style={THStyles.startActionUserSignIn}>
                      <Field keyboardType="default" placeholder="Votre Prenom" component={THTextInputForm} name="firstname" validate={[required]} />
                      <Field keyboardType="default" placeholder="Votre Nom" component={THTextInputForm} name="lastname" validate={[required]} />
                      <Field keyboardType="default" placeholder="Votre Username" component={THTextInputForm} name="username" validate={[required, nameMax20]} warn={[nameTooSimple]} />
                      <Field keyboardType="email-address" placeholder="Votre Email" component={THTextInputForm} name="email" validate={[required, mailValid]} />
                      <Field keyboardType="default" placeholder="Agence/SIRET" component={THTextInputForm} name="company_siret" validate={[required]} />
                      <Field keyboardType="numeric" placeholder="N°RSCAC-Agent" component={THTextInputForm} name="realtor_rscac" validate={[required]} />
                      <Field keyboardType="default" placeholder="Adresse" component={THTextInputForm} name="address" validate={[required]} />
                      <Field keyboardType="numeric" placeholder="Tél. Port. : " component={THTextInputForm} name="mobilePhone" validate={[required, nameMax20]} warn={[nameTooSimple]} />
                      <Field keyboardType="numeric" placeholder="Tél. Fixe. : " component={THTextInputForm} name="phone" validate={[nameMax20]} warn={[nameTooSimple]} />
                      <Field keyboardType="default" placeholder="Password" security={true} component={THTextInputForm} name="password" validate={[required]} />
                  </View>
                  <View style={THStyles.buttonGroup2}>
                      <THButton text="Annuler" onPress={() => {this.props.navigation.goBack()}} theme="cancel" size="small"/>
                      <THButton text="Valider" onPress={decomp.handleSubmit(submitval)} theme="validate" outline size="small"/>
                  </View>
                </View>
                <THBaseButtons style={THStyles.buttonContainer} fromTop='170' />
            </View>
            <Copyright />
          </ImageBackground>
        </View>
        );
      }
    }
export const SignUpMediatorForm_old = reduxForm({
  form: SIGNUP_MEDIATOR_FORM,
  // onSubmit: submitval,
  onSubmitSuccess: submitSuccess,
  onSubmitFail : submitFail,
})(SignUpMediator_old);
