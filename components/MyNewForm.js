import React, { Component } from 'react';
import { View, ImageBackground, Text, TextInput } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
  
const onSubmitSuccess = () => {
  console.log('onSubmitSuccess....');
  // this.props.navigation.navigate('HomeUser');
  
}

const onSubmitFail = errors => {
  console.log('Ne vous acharnez pas, ça ne marchera pas!!!\n', errors);
  
}

const required = values => { if(values === undefined) { return 'requis'; }} ;
  
const nameMax20 = values => { if(values.length > 20) { return 'Le nom user doit avoir moins de 20 caractères!'; }};

  
const mailValid = values => { if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) {return 'Veuillez fournir un email valide!';}};

const nameTooSimple = username => { // username = username
  if(username === 'coco' || username === 'fifi' || username === 'dede' || username === 'roro') { return 'Vous pouvez faire mieux que ça, n\'est ce pas!' }
};

const submit = values => {
  console.log('Submitting values : ', values);
}

const renderField = ({ label, keyboardType, meta: {touched, error, warning}, input: {onChange, ...restInput} }) => {
  // console.log('errors : ', error);
  
  return (
      <View style={THStyles.THIFmainContainer}>
          <View style={THStyles.renderField}>
              <Text style={THStyles.THIFlabelContainer}>{label}</Text>
              <TextInput style={THStyles.THIFinputDefault} keyboardType={keyboardType} onChangeText={onChange} {...restInput} ></TextInput>
          </View>
          {touched && ((error && <Text style={{color: 'red'}}>{error}</Text> ) || warning && <Text style={{color: 'orange'}}>{warning}</Text>)}
      </View>
  );
};
class SignInField extends Component {
    HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
    CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');
    
    static  navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      let headerTitle = 'Connexion';
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
      let tabBarLabel = 'Back';

      return ({ headerStyle, headerTitleStyle, headerTitle, headerRight, tabBarLabel });
    }
    

    _onConnection() { 
      this.props.navigation.setParams({ connected: true });
      console.log('Connecté : ', this.props.navigation.state.params.connected);
     }


    componentDidMount() {
      // this.props.navigation.setParams({ onConnection: this._onConnection.bind(this) });
      console.log('Connecté : ', this.props.navigation);
    }
  

    render() {
      const { handleSubmit } = this.props;
      return (
        <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
            <View style={THStyles.filterComponent}>
            <View style={THStyles.userSignInForm}>
                  <View style={THStyles.userSignInField}>
                      <Text>Test Form : </Text>
                      <Field keyboardType="default" label="Username" component={renderField} name="username" validate={[required, nameMax20]} war={[nameTooSimple]} />
                      <Field keyboardType="email-address" label="Email" component={renderField} name="email" validate={[required, mailValid]}  />
                    </View>
                    <View style={THStyles.buttonGroup2}>
                        <THButton text="Annuler" onPress={() => {this.props.navigation.goBack()}} theme="cancel" outline size="small"/>
                        <THButton text="Connexion" onPress={handleSubmit(submit)} theme="validate" outline size="small"/>
                    </View>
                </View>
                <THBaseButtons style={THStyles.buttonContainerSignIn} />
            </View>
            <Copyright />
        </ImageBackground>
        );
    }
}

const MyNewForm = reduxForm({
  form: 'contact',
  onSubmitSuccess,
  onSubmitFail,
})(SignInField);

export default MyNewForm;