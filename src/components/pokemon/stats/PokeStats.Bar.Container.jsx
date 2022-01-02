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
    styleLabel: {
        textAlign: 'center',
        textTransform: 'capitalize',
    },
})

const PokeStatsBarContainer = ({ dataStat, style, styleLabel, styleBar, colorActiveBar }) => {

    return (
        <View style={[ styles.container, (style || {}), ]} >
            <PokeStatsBar 
                key={dataStat.stat.name} 
                style={ styleBar || {}} 
                colorActiveBar={colorActiveBar}
                statsValue={dataStat.base_stat} 
            />
            <Text style={[ styles.styleLabel, (styleLabel || {}), ]} >{ labelProcessing(dataStat && dataStat.stat && dataStat.stat.name) }</Text>
        </View>
    )
}

export default PokeStatsBarContainer

PokeStatsBarContainer.propTypes = {
    dataStat: PropTypes.object.isRequired,
}