import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {  shallowEqual, useSelector,  } from "react-redux";
import { View, StyleSheet } from 'react-native'
import * as PokeStorage from '_data/storage/pokemon/Pokemon.DataStore';
import PokeStatsBarContainer from './PokeStats.Bar.Container'
import { Log } from '_helpers'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    itemBarContainer: {
        flex: 1,
        margin: 2,
    },
})

const PokeStatsContainer = ({ pokeID, style, colorActiveBar, styleLabel, styleBarItem, styleBarItemContainer }) => {
    
    const pokeStats = useSelector((state)=>PokeStorage.selectorPokemonStatsByID(state, pokeID), shallowEqual)


    return(
        <View style={[ styles.container, (style || {}) ]}>
            {
                
                pokeStats && pokeStats.map((itm, idx)=>(
                    <PokeStatsBarContainer
                        key={`poke-base-stat-${idx}`}
                        style={[ styles.itemBarContainer, (styleBarItemContainer || {}) ]}
                        styleBar={styleBarItem}
                        styleLabel={styleLabel}
                        colorActiveBar={colorActiveBar}
                        dataStat={itm}
                    />
                ))
            }
        </View>
    )
}

export default PokeStatsContainer

PokeStatsContainer.propTypes = {
    pokeID: PropTypes.string.isRequired,
}