import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors';

export default class THRadio2Form extends PureComponent {
  state = {
    valueSelected: null,
  }
  setSelected(indexSelected) {
    console.log('THRadio2Form : setSelected : index = ' + indexSelected);
    this.props.radios.map(radio => (radio.index !== indexSelected)? radio.checked = false: null);
    //To trigger the rendering
    this.setState({valueSelected: indexSelected});
  }
  render() {
    const { radios } = this.props;
      return (
          <View>
              { radios.map( radio => {
                                      return(
                                        <View key={radio.index} style={styles.radioButtonContainer}>
                                          <Text style={styles.radioButtonText}>{radio.label}</Text>
                                          <TouchableOpacity onPress={this.handlePress} style={styles.radioCircle} onPress={() => {radio.checked = true; this.setSelected(radio.index);}} >
                                            {radio.checked && <View style={styles.selectedRB} />}
                                          </TouchableOpacity>
                                      </View>
                                      )
                                    }
                          )
              }
          </View>
      );
  }
}
const styles = StyleSheet.create({
  radioButtonContainer: {
    // marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButtonText: {
    marginRight: 15,
    fontSize: 15,
    color: '#000',
    fontWeight: '300',
  },
  radioCircle: {
    width: 17,
    height: 17,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.VALIDATE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRB: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: Colors.VALIDATE_COLOR,
  },
});

