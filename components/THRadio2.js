import React, { PureComponent } from 'react'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

export default class THRadio extends PureComponent {
    render() {
        const { checked, label } = this.props;
        console.log('THRadio : render : value = ' + label + ' : checked = ' + checked);
        return(
            <TouchableHighlight onPress={this.handlePress}>
            <View>
                <View>
                    <Text>{label}</Text>
                </View>
                <View style={checked ? styles.circleChecked : styles.circleUnChecked} />
            </View>
        </TouchableHighlight>);
    }

    handlePress = () => this.props.onChange(this.props.value)
}
const styles = StyleSheet.create({
    circleUnChecked: {
        borderRadius: 100,
        color: 'white',
        width: 15,
        height: 15,
        padding:'auto',
        margin:'auto',
        borderStyle:'solid',
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: Colors.CANCEL_COLOR,
    },
    circleChecked: {
        borderRadius: 100,
        color: 'red',
        width:15,
        height: 15,
        padding:'auto',
        margin:'auto',
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: Colors.VALIDATE_COLOR,
    },
  });
  


