import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import UserConnectedPad from '../components/sessionManagement/UserConnectedPad';
import THTextInputForm from '../components/THTextInputForm';
import Colors from './Colors';
import SearchCriteriaWrapper from '../components/SearchCriteriaWrapper';
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



export const  TinderHousesScreen = (props) => {

    // return (
    //       <View style={THStyles.screen}>
    //         <TinderHouses onStopTinderHouzze={() => {props.navigation.navigate('Home')}} onFavoriteHouzze={() => {props.navigation.navigate('Favorite')}} />
    //       </View>
    //   );
}

export const Stack = createStackNavigator();
   
  const Drawer = createDrawerNavigator()
   
    // {
    //   unmountInactiveRoutes: true,
    //   initialRouteName: `${screenDisplayed}`,
    //   defaultNavigationOptions: {
    //     headerTitle: 'Connexion',
    //     headerStyle: {
    //       backgroundColor: Colors.header
    //     }

// function MainAppNavigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreenFacade} />
//         <Stack.Screen name="HomeUser" component={HomeScreenUser} />
//         <Stack.Screen name="TinderHouses" component={TinderHouses} />
//         <Stack.Screen name="DrawerNav" component={TinderHousesScreen} />
//         <Stack.Screen name="Favorite" component={FavoriteHousesScreen} />
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="SignUpChoices" component={SignUpChoice} />
//         <Stack.Screen name="TestFlex" component={TestFlex} />
//         <Stack.Screen name="LocateUser" component={UserLocation} />
//         <Stack.Screen name="SignUpPT" component={SignUpPartTimeWrapper} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
function MainAppNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreenFacade} />
        <Drawer.Screen name="HomeUser" component={HomeScreenUser} />
        <Drawer.Screen name="UserConnectedPad" component={UserConnectedPad} />
        <Drawer.Screen name="TinderHouses" component={TinderHouses} />
        <Drawer.Screen name="DrawerNav" component={TinderHousesScreen} />
        <Drawer.Screen name="Favorite" component={FavoriteHousesScreen} />
        <Drawer.Screen name="SignIn" component={SignInScreen} />
        <Drawer.Screen name="SignInHidePassword" component={SignInHidePassword} />
        <Drawer.Screen name="SignUpChoice" component={SignUpChoice} />
        <Drawer.Screen name="SignUpBuyer" component={SignUpBuyerWrapper} />
        <Drawer.Screen name="SignUpSeller" component={SignUpSellerWrapper} />
        <Drawer.Screen name="SignUpMediator" component={SignUpMediatorWrapper} />
        <Drawer.Screen name="SignUpPT" component={SignUpPartTimeWrapper} />
        <Drawer.Screen name="SignMdpOublie" component={SignMdpOublieScreenLBC} />
        <Drawer.Screen name="SearchCriteria" component={SearchCriteriaWrapper} />
        <Drawer.Screen name="TestFlex" component={TestFlex} />
        <Drawer.Screen name="LocateUser" component={UserLocation} />
        <Drawer.Screen name="SignUpTest" component={THTextInputForm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MainAppNavigation;
