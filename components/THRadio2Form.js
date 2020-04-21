import React, { PureComponent } from 'react'
import { View } from 'react-native'
import THRadio2 from './THRadio2';

export default class THRadioForm extends PureComponent {
  
  render() {
    const { radios, input:{ value, onChange } } = this.props;
      return (
          <View>
              { radios.map( radio => <THRadio2 key={radio.label} {...radio} onChange={onChange} checked={radio.value === value} />) }
          </View>
      );
  }
}