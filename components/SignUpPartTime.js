import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Field, reduxForm, Form } from 'redux-form';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';
import { SIGNUP_PART_TIME_FORM } from '../constants/FormNames';
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
   console.log('createUserWithEmailAndPasswordHandler : test signup PartTime', username);
   try {
       await authLocal.createUserWithEmailAndPassword(email, password).then(async (result) => {
       // await authLocal.createUserWithEmailAndPassword('nono@gmail.com', 'jam176').then(async (result) => {
       const userInfo = {role:`PartTime`, username: username, photoURL: `https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png`};
       generateUserDocument(result.user, userInfo, '');
       console.log('createUserWithEmailAndPasswordHandler : user PartTime created with mail : ' + username);
     });
   } catch(error) {
     console.log('Erreur lors du sign up par email et password : error = ', error);
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
  console.log('submitFail : Ne vous acharnez pas, ça ne marchera pas!!!\n', errors);
  
}


export default class SignUpPartTime extends Component {
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
    console.log('test signup Part time');
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
      <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
        <View style={THStyles.mainComponent}>
              <View style={THStyles.imageContainer} ><Text>Profil Mandataire de Service : </Text>
                <View style={THStyles.startActionUserSignIn}>
                    <Field keyboardType="default" label="Prenom" component={THTextInputForm} name="firstname" validate={[required]} />
                    <Field keyboardType="default" label="Nom" component={THTextInputForm} name="lastname" validate={[required]} />
                    <Field keyboardType="default" label="Username" component={THTextInputForm} name="username" validate={[required, nameMax20]} warn={[nameTooSimple]} />
                    <Field keyboardType="numeric" label="Date de Naissance" component={THTextInputForm} name="birthday" validate={[required]} />
                    <Field keyboardType="email-address" label="Email" component={THTextInputForm} name="email" validate={[required, mailValid]} />
                    <Field keyboardType="numeric" label="Tél. Port. : " component={THTextInputForm} name="mobilePhone" validate={[required, nameMax20]} warn={[nameTooSimple]} />
                    <Field keyboardType="numeric" label="Tél. Fixe. : " component={THTextInputForm} name="phone" validate={[nameMax20]} warn={[nameTooSimple]} />
                    <Field keyboardType="numeric" label="Niveau d'étude " component={THTextInputForm} name="diploma_level" validate={[required]} />
                    <Field keyboardType="default" label="Password" security={true} component={THTextInputForm} name="password" validate={[required]} />
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
    export const SignUpPartTimeForm = reduxForm({
        form: SIGNUP_PART_TIME_FORM,
        // onSubmit: submitval,
        onSubmitSuccess: submitSuccess,
        onSubmitFail : submitFail,
      })(SignUpPartTime);

