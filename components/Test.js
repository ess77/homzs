import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maValueState: '',
        }
    }

    render() {
        return(<View>
            <Text style={styles.style1}>Mon component Test!</Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    style1: {
        backgroundColor: "#df451232",
        color: "#784598",
        padding: 5,
        // margin: 50,
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // alignContent: 'center'
        // alignSelf: 'center'
    }
})