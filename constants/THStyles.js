import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default THStyles = StyleSheet.create({
  testCircle: {
    width: 10,
    height: 10,
    borderRadius: 100/2,
    backgroundColor: Colors.VALIDATE_COLOR
},
  button: {
    width: '10%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonContainerSignIn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 210,
  },
  buttonContainerSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 170,
  },
  buttonContainerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 235,
  },
  buttonGroup2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonHeaderRight: {
    fontSize: 15,
    color: 'green',  
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.button,
    textAlign: 'center',
  },
  buttonPT: {
      width: 150,
      backgroundColor: Colors.buttonVal,
      borderRadius: 25,
      marginVertical: 10,
  },
  buttonTP: {
    width: 300,
    backgroundColor: Colors.buttonVal,
    borderRadius: 25,
    marginVertical: 10,
  },
  containerButtonHeaderRight: {
    margin: 5,
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.buttonVal,  
  },
  copyrightText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  centralImage: {
    height: 200, 
    width: 200,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topScreen: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleScreen: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterComponent: {
    flex: 1,
    backgroundColor: Colors.whitePurpled,
  },
  filterComponentSignInForm: {
    // flex: 1,
    // backgroundColor: Colors.whitePurpled,
    // marginTop: 750,
  },
  filterComponentRNP: {
    // flex: 1,
    backgroundColor: Colors.whiteTransp,
  },
  
  imageBackground: {
    flex: 1, 
    height: '100%',
    width: '100%', 
    resizeMode: 'cover',
  },
  imageContainer: {
    display: 'flex', /* default value */
    opacity: .8,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  imageContainerProfileChoice: {
    display: 'flex', /* default value */
    opacity: .8,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  imageContainerHomeScreen: {
    display: 'flex', /* default value */
    opacity: .8,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 125, 
  },
  imageContainerSearchCriteria: {
    display: 'flex', /* default value */
    opacity: .8,
    // alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    marginLeft: 20,
  },
  inputBox: {
    width: 300,
    backgroundColor: Colors.whiteTransp,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.violetDachine,
    marginVertical: 10,
  },
  logoTitle: {
    color: 'white',
    fontSize: 32,
    marginTop: -20,
  },
  mainComponent: {
    flex: 1,
    // backgroundColor: 'rgba(69,90,100,.5)',
    backgroundColor: Colors.whitePurpled,
  },
  mainComponentCriteriaForm: {
    flex: 1,
    // backgroundColor: 'rgba(69,90,100,.5)',
    backgroundColor: Colors.whitePurpled,
    marginTop: 50,
  },
  criteriaForm: {
    // flex: 1,
    // backgroundColor: 'rgba(69,90,100,.5)',
    // backgroundColor: Colors.CANCEL_COLOR,
    // marginLeft: 20,
    alignItems: 'flex-start',
  },
  middleLeitmotive: {
    fontSize: 15,
    marginTop: 30
  },
  renderFieldContainer: {
    flexDirection: 'column',
    height: 70,
    alignItems: 'flex-start',
  },
  renderField: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  renderFieldText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 80,
  },
  renderFieldTextInput: {
    borderColor: 'steelblue',
    borderWidth: 1,
    height: 37,
    width: 220,
    padding: 5,
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 10,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startActionUserButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  startActionUserSignUp: {
    marginTop: 50,
    color: Colors.whitePurpled,
  },
  startActionUserSignIn: {
    marginTop: 15,
    color: Colors.whitePurpled,
  },
  userSignInField: {
    color: Colors.whitePurpled,
  },
  
    ////////////
   //THbutton//
  ////////////

  //container styles
    containerDefault: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderWidth: 1,
      borderRadius: 30,
      marginHorizontal: 20,
      marginVertical: 10,
      width: 200,
    },
    containerUserDefault: {
      alignItems: 'center',
      backgroundColor: Colors.TH_HOME_COLOR,
      justifyContent: 'center',
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 30,
      marginHorizontal: 20,
      marginVertical: 10,
      width: 150,
    },
    containerSecondary: {
        backgroundColor: Colors.SECONDARY_COLOR,
        borderColor: Colors.SECONDARY_COLOR,
    },
    containerPrimary: {
        backgroundColor: Colors.PRIMARY_COLOR,
        borderColor: Colors.PRIMARY_COLOR,
    },
    containerHomeStart: {
        backgroundColor: Colors.TH_HOME_COLOR,
        borderColor: Colors.TH_HOME_COLOR,
    },
    validate: {
        backgroundColor: Colors.VALIDATE_COLOR,
        borderColor: Colors.TH_HOME_COLOR,
        width: 100,
    },
    cancel: {
        backgroundColor: Colors.CANCEL_COLOR,
        borderColor: Colors.TH_HOME_COLOR,
        width: 100,
    },
    containerHomeBottom: {
        backgroundColor: Colors.TH_HOME_COLOR,
        borderColor: Colors.TH_HOME_COLOR,
        width: 125,
    },
    containerLarge: {
        paddingVertical: 15,
    },
    containerSmall: {
        paddingVertical: 5,
    },
    //text styles
    textDefault: {
        fontSize: 25,
        fontWeight: '400',
        color: '#fff',
    },
    textUserDefault: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
    },
    textSecondary: {
        fontSize: 25,
        fontWeight: '500',
        color: '#fff',
    },
    textPrimary: {
        fontSize: 25,
        fontWeight: '500',
        color: '#fff',
    },
    textLarge: {
        fontSize: 25,
        fontWeight: '500',
        color: '#fff',
    },
    textSmall: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff',
    },
    titleSearchType: {
        fontSize: 12,
        fontWeight: '500',
    },
    loginTitle: {
        fontSize: 25,
        fontWeight: '500',
        marginLeft: 20
    },
    loginSubText: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 20
    },
    errorMessageText: {
        fontSize: 15,
        fontWeight: '700',
        marginLeft: 5,
        color: 'red'
    },
    testTextInput: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 25
    },

    ///////////////
   //THTextInput//
  ///////////////
//container styles
  THImainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  THInputDefault: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    // paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 250,
  },
  THIlabelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    // paddingVertical: 10,
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 100,
  },
  inputContainerStyleTestRNP: {
    margin: 0,
    width: 375,
    paddingLeft: 25
  },
    ///////////////
   //THTextInputForm//
  ///////////////
//container styles
  THIFmainContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    height: 70,
    alignItems: 'flex-start',
  },
  THIFinputDefault: {
    // alignItems: 'center',
    // justifyContent: 'center',
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    // borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 10,
    width: 350,
    // backgroundColor: Colors.TH_HOME_COLOR,
    borderColor: Colors.TH_HOME_COLOR,
  },
  THIFlabelContainer: {
    fontSize: 15,
    paddingVertical: 5,
    // borderWidth: 1,
    // borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 10,
    width: 100,
    // backgroundColor: Colors.TH_HOME_COLOR,
    borderColor: Colors.TH_HOME_COLOR,
  },
});
