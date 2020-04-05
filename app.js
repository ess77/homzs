import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { AppLoading, Asset, font } from 'expo';
import AppContainer from './constants/THNavigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from './components/sessionManagement/ApiKeys';
import HomeScreenUser from './components/HomeScreenUser';

const store = createStore(reducers);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false,
            isAuthenticationReady:  false,
            isAuthenticated: false,
            user: null,
        };

        //initialse firebase
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(this.onAuthStateChangedLocal); 
    }

    onAuthStateChangedLocal = async (user) => {
        // console.log('onAuthStateChanged : user : ' + user.email);
        this.setState({isAuthenticationReady: true});
        this.setState({isAuthenticated: !!user});
        this.setState({user: user});
    }
    render() {
            if(!this.state.isLoadingComplete && !this.state.isAuthenticationReady && !this.props.skipLoadingScreen) {
                {console.log('App:render : this.state.user 1 : ' + this.state.user)}
                return ( 
                    <AppLoading 
                            startAsync={this._loadResourcesAsync}
                            onError={this._handleLoadingError}
                            onFinish={this._handleFinishLoading} 
                    />);
            } else {
                if(this.state.user) {
                    console.log('App:render : this.state.user 2 : ' + this.state.user.uid);
                    return (
                    <Provider store={store} >
                        {(this.state.isAuthenticated)? <HomeScreenUser userCredentials={this.state.user} /> : <AppContainer />}
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