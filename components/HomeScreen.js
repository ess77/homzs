import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { authLocal } from './sessionManagement/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    state = {
        email: '',
        displayName: '',
    }

    componentDidMount() {
        const { email, displayName } = authLocal.currentUser;
        this.setState({ email, displayName });
    }

    signOutUser = () => {
        authLocal.signOut();
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.displayName? <Text>Hi, {this.state.displayName}</Text> : <Text>Hi, {this.state.email}</Text>}
                <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }
})
