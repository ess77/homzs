import React from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { authLocal } from './sessionManagement/firebase'
import THStyles from '../constants/THStyles';
import THButton from './THButton';
import THBaseButtons from './THBaseButtons';
import ValidationComponent from './ValidationComponent';

let errorMessage = undefined;
const requiredValid = values => { if(values.trim()) return true} ;
  
const nameMax20Valid = values => { if(values && values.length < 21) return true};
  
const alphabeticalOnlyValid = values => { if(/^[\s-a-zA-Z]*$/i.test(values)) return true};

const passwordValid = values => { if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values)) return true};

const mailValid = values => { if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) return true};

const nameComplexityValid = values => { if(values !== 'coco' && values !== 'fifi' && values !== 'dede' && values !== 'roro') return true};



const signInWithEmailAndPasswordHandler = async (email, password) => {
  console.log('signInWithEmailAndPasswordHandler : received parameters : ' + email + ' : ' + password);
  // event.preventDefault();
  if((!email) || (!password)) {
    //security signout, to protect privacy
    authLocal.signOut();
    console.log('signInWithEmailAndPasswordHandler : Securely signing out!');
  } else {
    await authLocal.signInWithEmailAndPassword(email, password).then((result) => {
      console.log('SignInForm : signInWithEmailAndPasswordHandler : authenticated : ' + result.user.email);
    })
      .catch(error => {
            //TODO : gestion UX des erreurs
            // console.error('SignInForm : signInWithEmailAndPasswordHandler : Erreur lors du sign in par email et password. ',  error);
            errorMessage = error;
    });
  }
};

const submitval = values => {
  errorMessage = '';
  const { email, password } = values;
  console.log('SignInForm : submitval : Validation en cours! : ', values);
  if(email && password) {
    return {email, password};
  } else {
    return false;
  }
}


const submitSuccess = validationOk => {
  errorMessage = undefined;
  const { email, password } = validationOk;
  console.log('SignInForm : submitSuccess : ', validationOk);
  // signInWithEmailAndPasswordHandler('rete@gmail.com', 'jam176');
  validationOk? signInWithEmailAndPasswordHandler(email, password) : signInWithEmailAndPasswordHandler(null, null );
}
  
const submitFail = errors => {
  console.log('SignInForm : submitFail : Ne vous acharnez pas, ça ne marchera pas.\n', errors);
  errorMessage = 'Veuillez remplir les champs requis!';
  signInWithEmailAndPasswordHandler(null, null );
}

const helperTextErrorMessages = {
  usernamePlaceholderText: "Entrer votre username, en lettres alphabetique.",
  usernameError: "Attention: Seules les lettres sont autorisées, sans espace.",
  usernameHelperText: "Le nom user doit avoir moins de 20 caractères!",
  usernameComplexityHelperText: "Vous pouvez faire mieux que ça, n\'est ce pas!",
  emailPlaceholderText: "Entrez votre mail.",
  emailHelperText: "Votre email doit être de la forme : pseudo@nom-domain.com",
  passwordPlaceholderText: "Entrez votre password.",
  passwordHelperText: "Attention: Le mot de passe doit comporter au moins une lettre, un chiffre, et un caractère spécial, il doit aussi avoir une longueur de 8 caractères minimum.",
}

export default class SignInRNPForm extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errorMsg: '',
      usernameMessage: '',
      emailMessage: '',
      passwordMessage: '',
    }
    this._onPressButton = this._onPressButton.bind(this);
    this.validate = this.validate.bind(this);
    // YellowBox.ignoreWarnings(['Warning: componentWillMount has been renamed']);
  }

  static  navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'Home';
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

    return ({ headerStyle, headerTitleStyle, headerTitle, headerRight });
  }
  
  validateUsername(username) {
    if(requiredValid(username) && alphabeticalOnlyValid(username) && nameMax20Valid(username)) {
      this.setState({ username: username.trim(), usernameMessage: ''});
      console.log('SignInForm : validateUsername : ok');
    } else {
      this.setState({ username: username.trim(), usernameMessage: helperTextErrorMessages.usernameError});
      console.log('SignInForm : validateUsername : error  : ');
    }
    // Call ValidationComponent validate method
    // this.validate({
    //   username: {minlength:3, maxlength:20, required: true},
    // });
  };

  validateEmail(email) {
    if(requiredValid(email) && mailValid(email)) {
      this.setState({ email: email.trim(), emailMessage: ''});
      console.log('SignInForm : validateEmail : ok');
    } else {
      this.setState({ email: email.trim(), emailMessage: helperTextErrorMessages.emailHelperText});
      console.log('SignInForm : validateEmail : error  : ');
    }
    // Call ValidationComponent validate method
    // this.validate({
    //   email: {minlength:8, maxlength:20, required: true},
    // });
  };
  validatePassword(password) {
    if(requiredValid(password) && passwordValid(password)) {
      this.setState({ password: password.trim(), passwordMessage: ''});
      console.log('SignInForm : validatePassword : ok');
    } else {
      this.setState({ password: password.trim(), passwordMessage: helperTextErrorMessages.passwordHelperText});
      console.log('SignInForm : validatePassword : error  : ');
    }
    // Call ValidationComponent validate method
    // this.validate({
      //   password: {minlength:8, maxlength:20, required: true},
      // });
    };
    
    _onPressButton() {
      console.log('SignInForm : _onPressButton :   : ');
    // Call ValidationComponent validate method
    const validForm = this.validate({
      username: {minlength:3, maxlength:20, required: true},
      email: {email: true, required: true},
      password: {minlength:6, maxlength:20, required: true},
    });
    if(validForm) {
      console.log('Form valide! : soumission.');
      signInWithEmailAndPasswordHandler(this.state.email, this.state.password);
      console.log('Après signIn.');
      this.props.navigation.navigate('Home');
    } else {
      console.log('Form not valide!');
    }
  };

  render() {
    console.log('SignInForm : render values : ' +  this.state.errorMsg + ' : ' + this.state.username + ' : ' + this.state.email + ' : ' + this.state.password + ' :$ ');
    const { ...htem } = helperTextErrorMessages;
    return (
    <View style={THStyles.filterComponentRNP}>
      <View style={THStyles.userSignInForm}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-300}>
          <ScrollView keyboardShouldPersistTaps={'never'} removeClippedSubviews={false}>
            <Text style={THStyles.loginTitle}>Login : </Text>
              <View style={THStyles.inputContainerStyleTestRNP}>
              <TextInput
                ref="username"
                label="Username"
                keyboardType="default"
                style={{ backgroundColor: 'transparent', paddingHorizontal: 0, margin: 0 }}
                placeholder={htem.usernamePlaceholderText}
                value={this.state.username}
                error={this.state.usernameMessage}
                onChangeText={username => this.validateUsername(username)}/>
              <HelperText type="error" padding="none" visible={this.state.usernameMessage} >{helperTextErrorMessages.usernameError}</HelperText>
            </View>
            <View style={THStyles.inputContainerStyleTestRNP}>
              <TextInput
                ref="email"
                label="Email"
                keyboardType="email-address"
                style={{ backgroundColor: 'transparent', paddingHorizontal: 0, margin: 0 }}
                placeholder={htem.emailPlaceholderText}
                value={this.state.email}
                error={this.state.emailMessage}
                onChangeText={email => this.validateEmail(email)}/>
              <HelperText type="error" padding="none" visible={this.state.emailMessage} >{helperTextErrorMessages.emailHelperText}</HelperText>
            </View>

            <View style={THStyles.inputContainerStyleTestRNP}>
              <TextInput
                ref="password"
                label="Password"
                keyboardType="default"
                style={{ backgroundColor: 'transparent', paddingHorizontal: 0, margin: 0 }}
                placeholder={htem.passwordPlaceholderText}
                value={this.state.password}
                secureTextEntry={true} 
                error={this.state.passwordMessage}
                onChangeText={password => this.validatePassword(password)}/>
              <HelperText type="error" padding="none" visible={this.state.passwordMessage} >{helperTextErrorMessages.passwordHelperText}</HelperText>
            </View>

            <View style={THStyles.buttonGroup2}>
              <THButton text="Annuler" onPress={() => {this.props.navigation.goBack()}} theme="cancel" outline size="small"/>
              <THButton type="submit" text="Connexion" onPress={this._onPressButton} theme="validate" outline size="small"/>
              <View style={THStyles.errorMessageText}>
                <Text>
                  {this.getErrorMessages()}
                </Text>
              </View>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <THBaseButtons style={THStyles.buttonContainer} fromTop='210' />
        </View>
    );
  }
}
