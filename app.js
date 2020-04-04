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
        };

        //initialse firebase
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(this.onAuthStateChangedLocal); 
    }

    onAuthStateChangedLocal = (user) => {
        console.log('onAuthStateChanged');
        this.setState({isAuthenticationReady: true});
        this.setState({isAuthenticated: !!user});
    }
    render() {
            if(!this.state.isLoadingComplete && !this.state.isAuthenticationReady && !this.props.skipLoadingScreen) {
                return ( 
                    <AppLoading 
                            startAsync={this._loadResourcesAsync}
                            onError={this._handleLoadingError}
                            onFinish={this._handleFinishLoading} 
                    />);
            } else {
                return (
                <Provider store={store} >
                    {(this.isAuthenticated)? <HomeScreenUser /> : <AppContainer />}
                </Provider>
                );
            }
    }
};

AppRegistry.registerComponent('TinderHouzze', () => AppContainer);