import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { AppLoading, Asset, font } from 'expo';
import AppContainer from './constants/THNavigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
// import AsyncStorage from '@react-native-community/async-storage';
// import SyncStorage from 'sync-storage';
import { firebaseConfig } from './components/sessionManagement/ApiKeys';
import { authLocal, generateUserDocument, logoutUpdateUserDocument } from './components/sessionManagement/firebase';
import HomeScreenUser from './components/HomeScreenUser';

//Workaround for Firebase >= 7.9.0 bug.
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode };
if (!global.atob) { global.atob = decode };


const store = createStore(reducers);
let localSession = undefined;
export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoadingComplete: false,
            isAuthenticationReady:  false,
            isAuthenticated: false,
            user: null,
        };
        this.retrieveData("session").then((result) => {
            localSession = result;
        });
        //initialse firebase
        if(!firebase.apps.length) {
            console.log('App : Initializing Firebase App.');
            firebase.initializeApp(firebaseConfig);
        }
        authLocal.onAuthStateChanged(this.onAuthStateChangedLocal); 
    }

    onAuthStateChangedLocal = async (userAuth) => {
        
    // console.log('onAuthStateChanged : user : ' + user.email);
    this.setState({isAuthenticationReady: true});
    this.setState({isAuthenticated: !!userAuth});
    this.setState({user: userAuth});
    
    if(userAuth) {
        let remoteStored = 0;
        let token = await userAuth.getIdToken();
        let sessionParam = null;
        if(!localSession) {
                localSession = userAuth.uid + '!' + token + '!' + remoteStored;
                console.log('App : onAuthStateChangedLocal : localSession : ');
                sessionParam = localSession.split('!');
        } else {
                sessionParam = localSession.split('!');
            if(!this.sameSession(sessionParam[1], token)) {
                localSession = userAuth.uid + '!' + token + '!' + remoteStored;
                console.log('App : onAuthStateChangedLocal : New user session : ');
            }
        }
        await this.storeData('session', localSession);
        console.log('App : onAuthStateChangedLocal 1: ' + sessionParam[1]);
        const user = generateUserDocument(userAuth, sessionParam[1]);
        this.setState({ userContext: { user: user, sessionToken: localSession }});
        console.log('App : onAuthStateChangedLocal : ' + user.uid + ' : ');
    } else {
        if(localSession) {
            console.log('App : onAuthStateChangedLocal : localSession : ');
            const sessionParam = localSession.split('!');
            await logoutUpdateUserDocument(sessionParam[0], sessionParam[1]);
            await this.removeData('session');
        } else {
            console.log('App : onAuthStateChangedLocal : no localSession.');
        }
        console.log('App : onAuthStateChangedLocal : No user connected : ');
        this.setState({ userContext: { user: null, sessionToken: '' } });
    }
}
storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('storeData : ' + value);
    } catch (error) {
        console.error('App : storeData : error while saving on local storage : ' + error);
    }
}

retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('App : retrieveData : ' + value);
        }
    } catch (error) {
        console.error('App : retrieveData : error while retrieving data on local storage : ' + error);
    }
}

removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('App : removeData : key=' + key);
    } catch (error) {
        console.error('App : removeData : error while removing data on local storage : ' + error);
    }
}
render() {
    if(!this.state.isLoadingComplete && !this.state.isAuthenticationReady && !this.props.skipLoadingScreen) {
        console.log('App : render : Not LoadingCompleted.');
        return ( 
            <AppLoading 
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading} 
            />);
    } else {
        if(this.state.user) {
            console.log('App : render : this.state.user : ' + this.state.user.uid);
            return (
            <Provider store={store} >
                {(this.state.isAuthenticated)? <HomeScreenUser userCredentials={this.state.user} /> : <AppContainer screen="HomeUser"/>}
            </Provider>
        );} else {
            return (
                <Provider store={store} >
                    <AppContainer />
                </Provider>)
            }
        }
    }
};

AppRegistry.registerComponent('TinderHouzze', () => AppContainer);