import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { authLocal } from './sessionManagement/firebase';

export default class LoginScreen extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: null,
    }

    handleLogin = () => {
        const { email, password } = this.state;

        authLocal.signInWithEmailAndPassword(email, password).catch(error => {
            this.setState({ errorMessage: error.message });
        });
    }
    handleCancel() {
        console.log('The cancel is pressed!');
        this.props.navigation.navigate('RegisterStack');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>{`Salut \nBienvenue!`}</Text>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage} </Text> }
                </View>
                <View>
                    <View style={styles.formContainer}>
                        <Text style={styles.form}>Email Address</Text>
                        <TextInput style={styles.input} autoCapitalize="none" keyboardType="email-address"
                                   onChangeText={email => this.setState({ email })}
                                   value={this.state.email}>
                        </TextInput>
                    </View>
                    <View >
                        <Text style={{ marginTop: 32 }}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none"
                                   onChangeText={password => this.setState({ password })}
                                   value={this.state.password}>
                        </TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={this.handleCancel }>
                    <Text style={{ color: "#414959", fontSize: 13 }}>Nouveau sur TinderHouse? <Text style={{ fontWeight: "500", color: "#E9446A" }}>S'Inscrire</Text> </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: "row",
        // justifyContent: "center",
        // backgroundColor: '#a14525',

    },
    greeting: {
        // backgroundColor: '#fc5255',
        marginTop: 35,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        // alignSelf: "center",
        // margin: 10,
        // padding: 50,
        // borderColor: '#fd45',
        // borderWidth: 10,
        // alignItems: "center",
        // color: '#fc5625',
        // borderRadius: 20,
    },
    errorMessage: {
        borderStyle: "solid",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center",
    },
    formContainer: {
        // color: '#a12452',
        // flexDirection: "column",
        // alignItems: "stretch",
        // marginBottom: 4,
        // marginHorizontal: 3,
    },
    form: {
        // color: '#a12452',
        marginBottom: 4,
        marginHorizontal: 3,
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "capitalize"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        // width: 100,
        fontSize: 15,
        // color: "#161F3D",
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        marginTop: 10,
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
})
