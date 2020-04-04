import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import TinderHouses from '../components/TinderHouses';
import SignInScreen from '../components/SignInScreen';
import FavoriteHousesScreen from '../components/FavoriteHousesScreen';
import SignUpScreen from '../components/SignUpScreen';
import TestFlex from '../components/TestFlex';
import UserLocation from '../components/UserLocation';
import SignUpPartTime from '../components/SignUpPartTime';
import SignUpThirdPart from '../components/SignUpThirdPart';
import HomeScreenUser from '../components/HomeScreenUser';
// import HomeScreenFacade from '../components/HomeScreenFacade';
import HomeScreenFacade2 from '../components/HomeScreenFacade2';
import TestFormScreen from '../components/TestFormScreen';
import SignInScreenNDB from '../components/SignInScreenNDB';
import MyNewForm from '../components/MyNewForm';
import SendPassword from '../components/SendPassword';

export const  TinderHousesScreen = (props) => {
    return (
          <View style={THStyles.screen}>
            <TinderHouses onStopTinderHouzze={() => {props.navigation.navigate('Home')}} onFavoriteHouzze={() => {props.navigation.navigate('Favorite')}} />
          </View>
      );
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
      SignUp: {
        screen: SignUpScreen,
      },
      SendPass: SendPassword,
      TestFlex: TestFlex,
      LocateUser: UserLocation,
      SignUpPT: SignUpPartTime,
      SignUpTP: SignUpThirdPart,
      TestForm: TestFormScreen,
      },
    {
      initialRouteName: 'Home',
    }
  );
  
  export const AppDrawerNavigator = createDrawerNavigator(
    {
      // Home: HomeScreenFacade,
      Home: HomeScreenFacade2,
      HomeUser: HomeScreenUser,
      TinderHouses: TinderHouses,
      DrawerNav: TinderHousesScreen,
      Favorite: FavoriteHousesScreen,
      SignIn: SignInScreen,
      MyNewForm: MyNewForm,
      SignInNDB: SignInScreenNDB,
      SignUp: SignUpScreen,
      TestFlex: TestFlex,
      LocateUser: UserLocation,
      SignUpPT: SignUpPartTime,
      SignUpTP: SignUpThirdPart,
    },
    {
      unmountInactiveRoutes: true,
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerTitle: 'Connexion',
        headerStyle: {
          backgroundColor: Colors.header
        }
      }
    }
  );
  
const AppContainer = createAppContainer(AppDrawerNavigator);
// const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;