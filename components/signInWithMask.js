import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'; //You can check the package on github to see more masking options

export default class signInWithMask extends Component {
  constructor(props) {
  super(props);
    this.state = { dt:'' ,amount:'0'};
  }
    render() {
     return (
       <View style={styles.container}>
         <Text>Entrer une Date (DD-MM-YYYY)</Text>
         <TextInputMask
                  style={{width: '50%',height: 40,backgroundColor: 'white',justifyContent: 'center'}}
                   type={'datetime'}
                   options={{
                     format: 'DD-MM-YYYY'
                   }}
              value={this.state.dt}
              onChangeText={text => { this.setState({ dt: text}) }}
            />

          <Text>Entrer un montant</Text>
            <TextInputMask
               style={{width: '50%',height: 40,backgroundColor: 'white',justifyContent: 'center'}}
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: '€',
                  suffixUnit: ''
                }}
                value={this.state.amount}
                onChangeText={text => { this.setState({ amount: text  })}}  />
       </View>
       );
   }
}

const styles = StyleSheet.create({
  myInput: {
    backgroundColor: 'rgb(232, 232, 232)',
    borderRadius: 30,
    height: 40,
    width: '90%'},

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ee3ab',
  },
});