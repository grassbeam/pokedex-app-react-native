import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, } from 'react-native'

const styles = StyleSheet.create({
    textDefault: {
        color: '#FFF',
    },
    textLabel: {
        fontSize: 28,
    },
    textValue: {
        fontSize: 18,
        textTransform: 'capitalize',
    }
})

const PokeInfoItemText = ({ label, value, style, styleLabel, styleValue }) => {

    return(
        <View style={style}>
            <Text style={[ styles.textDefault, styles.textLabel, (styleLabel || {}) ]} >{label}</Text>
            <Text style={[ styles.textDefault, styles.textValue, (styleValue || {}) ]}>{value}</Text>
        </View>
    )
}

export default PokeInfoItemText