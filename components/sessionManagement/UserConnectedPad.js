import React, { Component } from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import firebase from 'firebase';
import THButton from '../THButton';
import Colors from '../../constants/Colors';

export default class UserConnectedPad extends Component {
    constructor(props) {
        super(props);
        
        //Suppress warnings for timer/performance bottleneck
        YellowBox.ignoreWarnings(['Setting a timer']);
        
        console.log('UserConnectedPad : constructor : user props : '+ this.props.user.displayName);
        this.state = {
            userName: this.props.user.displayName,
            userEmail: this.props.user.email,
            avatar: ''
        }
    }

static  navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = 'TinderHouzze';
    let headerTitleStyle = {
        color: 'white',
        fontSize: 15,
    };
    let headerStyle = {
        backgroundColor: Colors.homeCorporate,
    };
    let headerRight = (<THButton 
                            text={ THConstants.connected }
                            theme="validate" outline size="small"
                            onPress={ () => params.onConnection() } />);

    let tabBarLabel = 'Back';

    return ({ headerStyle, headerTitleStyle, headerTitle, headerRight, tabBarLabel });
    }

    render() {
        return (
            <View  style={styles.userConnected}>
                <Text style={{padding: 5}}>Bienvenue {this.state.userName}</Text>
                <Text style={{padding: 5}}>Mail : {this.state.userEmail}</Text>
                    <THButton text="Déconnexion" onPress={this.signOut} theme="homeBottom" outline size="small"/>
            </View>
        )
    }

    signOut() {
        firebase.auth().signOut();
        console.log('ManageSession : signOut');
        // this.props.navigation.navigate('Home');
    }
}


const styles = StyleSheet.create({
    userConnected: {
        backgroundColor: Colors.whitePurpled,
        padding: 0,
        marginTop: -75,
        marginLeft: 215,
        // alignSelf: 'flex-end'
        borderRadius: 25,
    }
})
