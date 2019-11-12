import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import AppContainer from './constants/THNavigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';

const store = createStore(reducers);

export default class App extends Component {
    render() {
        return (
                <Provider store={store} >
                    <AppContainer />
                </Provider>
        );
    }
};

AppRegistry.registerComponent('TinderHouzze', () => AppContainer);