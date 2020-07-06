import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Switch, Title, Paragraph, TextInput, Button, Snackbar } from 'react-native-paper';
import THConstants from '../constants/THConstants';

export default class TestFlex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkTheme: '#c2553e',
      showSnack: false,
    }
    this.toggleSnack = this.toggleSnack.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);

  }

  toggleSnack() {
    console.log('toggleSnack');
    const showSnack = !this.state.showSnack;
    this.setState({ showSnack: showSnack })
  }

  toggleTheme() {
    console.log('toggleTheme');
  }

  render() {
    return (
      <View >
        <View >
          <View >
            <Text>
              Toggle theme
            </Text>
            <Switch
              onValueChange={ this.toggleTheme }
              value={ this.state.darkTheme }
              trackColor='#443ec2'/>
            </View>
            <Title>Sign up to our newsletter!</Title>
            <Paragraph>Get a monthly dose of fresh React Native Paper news straight to your mailbox. Just sign up to our newsletter and enjoy!</Paragraph>
            <TextInput
              style={{ marginTop: 15 }}
              label='Outlined input'
              mode='outlined'
            />
            <TextInput
              style={{ marginTop: 15 }}
              label='Flat input'
              mode='flat'
            />
          <Button
            style={{ marginTop: 15 }}
            icon="send"
            mode="contained"
            onPress={ this.toggleSnack }>
            Sign me up
          </Button>
        </View>
        <Snackbar
          style={{margingTop: 100}}
          visible={ this.state.showSnack }
          onDismiss={ this.toggleSnack }
          action={{
            label: 'Dismiss',
            onPress: () => console.log('onPress'),
          }}
          duration={THConstants.Snackbar_DURATION_LONG}>
          SignUp OK!.
        </Snackbar>
      </View>
    );
  }
};
