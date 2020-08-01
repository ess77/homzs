import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import TinderHouses from '../components/TinderHouses';
import SignInScreen from '../components/SignInScreen';
import FavoriteHousesScreen from '../components/FavoriteHousesScreen';
import SignUpChoice from '../components/SignUpChoice';
import SignUpBuyerWrapper from '../components/SignUpBuyerWrapper';
import SignUpPartTimeWrapper from '../components/SignUpPartTimeWrapper';
import SignUpSellerWrapper from '../components/SignUpSellerWrapper';
import SignUpMediatorWrapper from '../components/SignUpMediatorWrapper';
import TestFlex from '../components/TestFlex.js';
import UserLocation from '../components/UserLocation';
import HomeScreenUser from '../components/HomeScreenUser';
// import HomeScreenFacade from '../components/HomeScreenFacade';
import HomeScreenFacade from '../components/HomeScreenFacade';
import SignInScreenNDB from '../components/SignInScreenNDB';
import UserConnectedPad from '../components/sessionManagement/UserConnectedPad';
import THTextInputForm from '../components/THTextInputForm';
import Colors from './Colors';
import SearchCriteriaWrapper from '../components/SearchCriteriaWrapper';
import SignInScreenRNP from '../components/SignInScreenRNP';
import signInWithMask from '../components/signInWithMask';
import SignInHidePassword from '../components/SignInHidePassword';
import SignMdpOublieScreenLBC from '../components/SignMdpOublieScreen';

// firebase.initializeApp(firebaseConfig);

// const AppStack = createStackNavigator({
//   HomeStack: HomeScreen,
// });

// const AuthStack = createStackNavigator({
//   LoginStack: LoginScreen,
//   RegisterStack: RegistrationScreen,
// });

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       LoadingSwitch: LoadingScreen,
//       AppSwitch: AppStack,
//       AuthSwitch: AuthStack,
//     },
//     {
//       initialRouteName: "LoadingSwitch"
//     }
//   )
// )



let screenDisplayed = 'Home';


export const  TinderHousesScreen = (props) => {

    // return (
    //       <View style={THStyles.screen}>
    //         <TinderHouses onStopTinderHouzze={() => {props.navigation.navigate('Home')}} onFavoriteHouzze={() => {props.navigation.navigate('Favorite')}} />
    //       </View>
    //   );
}

export const AppNavigator = createStackNavigator(
    {
      Home: {
        screen: HomeScreenFacade2,
      },
      HomeUser: {
        screen: HomeScreenUser,
      },
      TinderHouses: TinderHouses,
      DrawerNav: TinderHousesScreen,
      Favorite: FavoriteHousesScreen,
      SignInNDB: SignInScreenNDB,
      SignIn: {
        screen: SignInScreen,
      },
      SignUpChoice: {
        screen: SignUpChoice,
      },
      TestFlex: TestFlex,
      LocateUser: UserLocation,
      SignUpPT: SignUpPartTimeWrapper,
      },
    {
      initialRouteName: 'Home',
    }
  );
  
  const AppDrawerNavigator = createDrawerNavigator(
    {
      // Home: HomeScreenFacade,
      Home: HomeScreenFacade2,
      HomeUser: HomeScreenUser,
      UserConnectedPad: UserConnectedPad,
      TinderHouses: TinderHouses,
      DrawerNav: TinderHousesScreen,
      Favorite: FavoriteHousesScreen,
      SignIn: SignInScreen,
      SignInNDB: SignInScreenNDB,
      SignInRNP: SignInScreenRNP,
      SignInMask: signInWithMask,
      SignInHidePassword: SignInHidePassword,
      SignUpChoice: SignUpChoice,
      SignUpBuyer: SignUpBuyerWrapper,
      SignUpSeller: SignUpSellerWrapper,
      SignUpMediator: SignUpMediatorWrapper,
      SignUpPT: SignUpPartTimeWrapper,
      SignMdpOublie: SignMdpOublieScreenLBC,
      SearchCriteria: SearchCriteriaWrapper,
      TestFlex: TestFlex,
      LocateUser: UserLocation,
      SignUpTest: THTextInputForm,
    },
    {
      unmountInactiveRoutes: true,
      initialRouteName: `${screenDisplayed}`,
      defaultNavigationOptions: {
        headerTitle: 'Connexion',
        headerStyle: {
          backgroundColor: Colors.header
        }
      }
    }
  );
  
const MainAppNavigation = createAppContainer(AppDrawerNavigator);
// const AppContainer = createAppContainer(AppNavigator);
export default MainAppNavigation;

// const MainAppNavigation = (props) => {
  // screenDisplayed = props.screen;
//   console.log('screenDisplayed : ' + screenDisplayed);
//   return(
//     <View>
//     {createAppContainer(AppDrawerNavigator)}
//     </View>);
// }
// export default MainAppNavigation;