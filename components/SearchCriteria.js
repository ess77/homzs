import React, { Component } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Field, reduxForm, Form } from 'redux-form';
import Colors from '../constants/Colors';
import THButton from './THButton';
import THConstants from '../constants/THConstants';
import THStyles from '../constants/THStyles';
import Copyright from './Copyright';
import THBaseButtons from './THBaseButtons';
import { SEARCH_CRITERIA_FORM } from '../constants/FormNames';
import THCheckboxForm from './THCheckboxForm';
import THRadioForm from './THRadioForm';
import THRadioAddressForm from './THRadioAddressForm';
import THRNPTextInputForm from './THRNPTextInputForm';


const required = values => { if(values === undefined) { return 'requis'; }} ;
  
const nameMax20 = values => { if(values && values.length > 20) { return 'Le nom user doit avoir moins de 20 caractères!'; }};

  
const mailValid = values => { if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values)) {return 'Veuillez fournir un email valide!';}};

const nameTooSimple = values => { // values = username
  if(values === 'coco' || values === 'fifi' || values === 'dede' || values === 'roro') { return 'Vous pouvez faire mieux que ça, n\'est ce pas!' }
};

const submitval = values => {
  const { event, ...rest } = values;
  console.log('SearchCriteria : submitval : Validation en cours : ', values);
}
const submitSucess = values => {
  // const { event, ...rest } = values;
  console.log('SearchCriteria : submitSucess : Validation OK! : ', values);
}


const submitFail = errors => {
  console.log('SearchCriteria : submitFail : Ne vous acharnez pas, ça ne marchera pas!!!\n', errors);
  
}

const checksBuySell = [{index: 'buy', label:'Achat', checked: false},
                       {index: 'rent', label:'Location', checked: false}
                      ];
const checksBuilding = [{index: 'appt', label:'Appartement', checked: false},
                        {index: 'house', label:'Maison', checked: false},
                        {index: 'build', label:'Immeuble', checked: false},
                        {index: 'other', label:'Autre', checked: false}
                    ];
const checksSearchArea = [{index: 'aroundme', label:'Autour de ma position', checked: false},
                        {index: 'addr', label:'address', checked: false}
                      ];

class SearchCriteria extends Component {
  HomeScreenImageUri =  require('../assets/tinderhouse/appt-Sandillon-6p.jpg');
  CentraleHomeScreenImageUri =  require('../assets/tinderhouse/pav_Montargis_Sandillon-5p.jpg');

  static  navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'SearchCriteria';
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
    
    constructor() {
      super();
      console.log('SearchCriteria : constructor');
      this.state = {
        currentIndex: 0,
        addressChecked: false,
      }
    }
    onPress() {
      console.log('SearchCriteria : onPress');
    }
    onChange(value) {
      // input.value = value;
      console.log('SearchCriteria : onChange value = ' + value);
      
    }
    
    addressToggle(value) {
      console.log('SearchCriteria : addressToggle : ');
      if(this.state.addressChecked) {
        this.setState({addressChecked: false});
      } else {
        this.setState({addressChecked: true});
      } 
    }
  checkToggle(selectedChecks) {
      console.log('SearchCriteria : checkToggle : selectedChecks ' + selectedChecks);
    }
    // _onConnection() { 
      // console.log('Connecté : ', this.props.navigation.state.params.connected);
      // }
      
      // componentDidMount() {
        // this.props.navigation.setParams({ onConnection: this._onConnection.bind(this) });
        // }
        // connectionParams = {  onConnection: this._onConnection.bind(this), connected: false };
  render() {
    console.log('SearchCriteria : render : ');
    
    const decomp = { handleSubmit, navigation } = this.props;
    return (
      <View style={THStyles.screen}>
        <ImageBackground style={THStyles.imageBackground} source={this.HomeScreenImageUri} >
          <View style={THStyles.mainComponentCriteriaForm}>
          <View style={THStyles.imageContainerSearchCriteria} >
            <Text style={THStyles.titleSearchType}>Type de Recherche : </Text>
            <View style={THStyles.criteriaForm}>
              <Field name="buySell" radios={checksBuySell} setLabel="Pick your Seach Type" component={THRadioForm} onChange={this.onChange} />
            </View>
            <Text style={THStyles.titleSearchType}>Type de Biens : </Text>
            <View style={THStyles.criteriaForm}>
              <Field name="buildings" checks={checksBuilding} setLabel="Pick Building Type" component={THCheckboxForm} onChangeChecked={(selected) => this.checkToggle(selected)} />
              </View>
              <Text style={THStyles.titleSearchType}>Lieux : </Text>
              <View style={THStyles.criteriaForm}>
              <Field name="areas" radios={checksSearchArea} setLabel="Pick Area Search " component={THRadioAddressForm} onChangeChecked={(value) => this.addressToggle(value)}/>
              { this.state.addressChecked? (<View style={THStyles.criteriaForm}>
                <Field keyboardType="default" label="Pays" component={THRNPTextInputForm} name="country" validate={[required, nameMax20]} />
                <Field keyboardType="default" label="Ville/CP" security={true} component={THRNPTextInputForm} name="citypc" validate={[required]} />
                <Field keyboardType="default" label="N° et Rue" security={true} component={THRNPTextInputForm} name="streetNumber" validate={[required]} />
              </View>): null}
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

export const SearchCriteriaForm = reduxForm({
form: SEARCH_CRITERIA_FORM,
onSubmit: submitval,
onSubmitSuccess: submitSucess,
onSubmitFail : submitFail,
})(SearchCriteria);
  

