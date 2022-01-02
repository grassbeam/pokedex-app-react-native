import React from 'react'
import PropTypes from 'prop-types'
import {  shallowEqual, useSelector,  } from "react-redux";
import { View, StyleSheet, Text, } from 'react-native'
import * as PokeStorage from '_data/storage/pokemon/Pokemon.DataStore';
import PokeInfoItemText from './PokeInfo.Item.Text'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 7,
        borderColor: '#4F4F4F',
        borderWidth: 2,
        backgroundColor: '#4F4F4F',
        padding: 10,
        color: '#FFF',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    rowItem: {
        flex: 1,
    },
})

const PokeInfoContainer = ({ pokeID, style, styleLabel, styleValue,  }) => {

    const pokeData = useSelector((state)=>PokeStorage.selectorPokemonDataByID(state, pokeID), shallowEqual)
    

    if (pokeData && pokeData.data){
        const abilitiesValue = pokeData.data.abilities && pokeData.data.abilities[0] && pokeData.data.abilities[0]["ability"] && pokeData.data.abilities[0]["ability"]["name"]
            
        return(
            <View style={[ styles.container, (style || {}) ]} >

                <View style={[styles.rowContainer]}>
                    <PokeInfoItemText
                        style={styles.rowItem}
                        styleLabel={styleLabel || {}}
                        styleValue={styleValue || {}}
                        label={"Height"}
                        value={`${(pokeData.data.height/10)} m`}
                    />
                    <PokeInfoItemText
                        style={styles.rowItem}
                        styleLabel={styleLabel || {}}
                        styleValue={styleValue || {}}
                        label={"Weight"}
                        value={`${pokeData.data.weight/10} kg`}
                    />
                </View>

                <View style={[styles.rowContainer]}>
                    <PokeInfoItemText
                        style={styles.rowItem}
                        styleLabel={styleLabel || {}}
                        styleValue={styleValue || {}}
                        label={"Abilities"}
                        value={abilitiesValue || ""}
                    />
                </View>

            </View>
        )
    }
    else return (<Text>Loading...</Text>)
}


export default PokeInfoContainer

PokeInfoContainer.propTypes = {

}