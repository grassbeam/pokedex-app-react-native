import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'


/**
 * 
 * @param {Array} statValue value Pokemon Stats to count 
 * @returns Array of 0 / 1 to render the bar
 */
 const getSpaceObject = (statValue) => {
    const result =[], maximumBar = 15, barValue = 15, maxValue = maximumBar * barValue 
    const checkedBarCount = Math.trunc(statValue / maxValue * maximumBar)

    for (let i = maximumBar; i >= 0; i--) {

        if (i < checkedBarCount)
            result.push(1)
        else result.push(0)
    }
    return result
}

const styles = StyleSheet.create({
    barItem: {
        height: 10,
        width: '100%',
        borderWidth: 2,
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        marginTop: 2,
    },
    checked: {
        backgroundColor: '#999912',
    }
})

const PokeStatsBarItem = ({statsValue, key, style}) => {

    const spaceRender = getSpaceObject(statsValue)
    

    return(
        <View style={style}>
            {
                spaceRender.map((item,idx)=>(
                    <View key={`${key}-${idx}`} style={[styles.barItem, (item===1 && styles.checked)]} />
                ))
            }
        </View>
    )
}

export default PokeStatsBarItem

PokeStatsBarItem.propTypes = {
    statsValue: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired,
}
