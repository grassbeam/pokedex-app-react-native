import React from 'react';
import PropTypes from 'prop-types';
import {  shallowEqual, useSelector  } from "react-redux";
import { View, StyleSheet, Text, } from "react-native";
import * as Colors from '_styles/Colors'
import * as PokeStorage from '_data/storage/pokemon/Pokemon.DataStore';




const styles = StyleSheet.create({
    textPokeType: {
        textAlign: 'center',
        color: '#FFFFFF',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
    }
});

const PokeTypeList = ({ style, styleText, pokeID }) => {

    
    const pokeData = useSelector((state)=>PokeStorage.selectorPokemonDataByID(state, pokeID), shallowEqual)

    return (
        <View style={style}>
            {
                pokeData.data.types && pokeData.data.types.map((itm,idx)=>(
                    <Text 
                        key={`poke-types-${idx}`}
                        style={[styles.textPokeType, Colors.COLOR_POKE_TYPE[itm.name || ''], (styleText || {})]}
                    >
                        {(itm.name && itm.name.toUpperCase()) || "Unknown"}
                    </Text>
                ))
            }
        </View>
    )
}

export default PokeTypeList

PokeTypeList.propTypes = {
    dataTypes: PropTypes.array.isRequired,
}