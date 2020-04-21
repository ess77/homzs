import React, { Component } from 'react'
import { View, Text, Field, CheckBox, StyleSheet } from 'react-native'
import THStyles from '../constants/THStyles';
import { render } from 'react-dom';

export default class THCheckboxForm extends Component {
  state = {
    criteriasSelected: [],
  }

  //store le selectionné en fonction de son checked, puis rendering
  storeSelected(focusedCheck) {
    console.log('THCheckboxForm : storeSelected : index = ' + focusedCheck.index);
    criteriasSelectedTemp = this.state.criteriasSelected.slice();
    if(focusedCheck.checked) {
      criteriasSelectedTemp.push(focusedCheck.index);
    } else {
      criteriasSelectedTemp.pop(focusedCheck.index);
    }
    
    //To trigger the rendering
    this.setState({criteriasSelected: criteriasSelectedTemp});
    console.log('THCheckboxForm : storeSelected : criteriasSelectedTemp ' + criteriasSelectedTemp);
    this.props.onChangeChecked(criteriasSelectedTemp);
  }
  render() {
    const { checks } = this.props;
      return (
          <View>
              { checks.map( check => {
                                      return(
                                        <View key={check.index} style={styles.container}>
                                          <View style={styles.checkboxContainer}>
                                            <CheckBox value={check.checked} onValueChange={() => {check.checked = !check.checked; this.storeSelected(check);}} style={styles.checkbox} />
                                            <Text style={styles.label}>{check.label}</Text>
                                          </View>
                                        </View>
                                      )
                                    }
                          )
              }
          </View>
      );
  }
}
//onPress={() => {check.checked = true; this.setSelected(check.index);}}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "flex-start",
    // justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    // marginBottom: 5,
  },
  checkbox: {
    alignSelf: "flex-start",
  },
  label: {
    margin: 0,
  },
});

