import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, } from 'react-native'
import PokeStatsBar from './PokeStats.Bar.Item'

const labelProcessing = (label="") => {
    let result = "";

    const splitLabel = label.split("-");

    splitLabel.forEach(text => {
        result = result + text + " ";
    });

    return result;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
    }, 
    labelStyle: {
        textAlign: 'center',
        textTransform: 'capitalize',
    },
})

const PokeStatsBarContainer = ({ dataStat, style, labelStyle, barStyle }) => {

    return (
        <View style={[ styles.container, (style || {}), ]} >
            <PokeStatsBar statsValue={dataStat.base_stat} key={dataStat.stat.name} style={ barStyle || {}} />
            <Text style={[ styles.labelStyle, (labelStyle || {}), ]} >{ labelProcessing(dataStat && dataStat.stat && dataStat.stat.name) }</Text>
        </View>
    )
}

export default PokeStatsBarContainer

PokeStatsBarContainer.propTypes = {
    dataStat: PropTypes.object.isRequired,
}