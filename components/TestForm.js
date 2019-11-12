import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from 'react-native-gesture-handler';
import THStyles from '../constants/THStyles';
import THButton from './THButton';

const onSubmitSuccess = values => {
    console.log('onSubmitSuccess....', values);
    
}

const onSubmitFail = errors => {
    console.log('Ne vous acharnez pas, ça ne marchera pas!!!\n', errors);
    
}

const validate = values => {
    console.log('Validation in progress...', values.username, values.email);
    const errors = {};
    console.log('Validation in progress...');
    
    if(!values.username) {
        errors.username = 'requis';
    } else if(values.username.length > 20) {
        errors.username = 'Le nom user doit avoir moins de 20 caractères!';
    }
    if(!values.email) {
        errors.email = 'required';
    } else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(values.email)) {
        errors.email = 'Veuillez fournir un email valide!';
    }
    return errors;
}

const warn = values => {
    const warnings = {};
    if(values.username === 'coco' || values.username === 'fifi' || values.username === 'dede' || values.username === 'roro') {
        warnings.username = 'Vous pouvez faire mieux que ça, n\'est ce pas!'
    }
    return warnings;
}

const submit = values => {
    console.log('Validation OK! : ', values);
    
}

const renderField = ({ label, keyboardType, meta: {touched, error, warning}, input: {onChange, ...restInput} }) => {
    return (
        <View style={THStyles.renderFieldContainer}>
            <View style={THStyles.renderField}>
                <Text style={THStyles.renderFieldText}>{label}</Text>
                <TextInput style={THStyles.renderFieldTextInput} keyboardType={keyboardType} onChangeText={onChange} autoFocus={true} {...restInput} ></TextInput>
            </View>
            {touched && ((error && <Text style={{color: 'red'}}>{error}</Text> ) || warning && <Text style={{color: 'orange'}}>{warning}</Text>)}
        </View>
    );
}

const ContactComponent = props => {
    const { handleSubmit } = props;
    
    return (
        <View style={styles.main}>
            <Text style={styles.mainText}>My Redux Form Example : </Text>
            <Field keyboardType="default" label="Username" component={renderField} name="username" />
            <Field keyboardType="email-address" label="Email" component={renderField} name="email" />
            <THButton onPress={handleSubmit(submit)} text="Soumettre" userContainerStyles={THStyles.containerUserDefault} userTextStyles={THStyles.textUserDefault}/>
        </View>
    );
}

const TestForm = reduxForm({
    form: 'contact',
    validate,
    warn,
    onSubmitSuccess,
    onSubmitFail,
})(ContactComponent);

export default TestForm;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    mainText: {
        textAlign: 'center',
    }
});