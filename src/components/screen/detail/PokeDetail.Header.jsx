import React from 'react';
import { shallowEqual, useSelector, } from "react-redux";
import { View, Text, StyleSheet, useWindowDimensions, } from 'react-native';
import * as PokeStorage from '_data/storage/pokemon/Pokemon.DataStore';
import PokePreviewImage from '_components/pokemon/preview/PokePreview.Image';
import PokeTypeList from '_components/pokemon/typelist';

const styles = StyleSheet.create({
    containerView: {
        padding: 10,
        alignItems: 'center',
    },
    pokeImage: {
        width: '50%',
        height: 200,
    },
    pokeNameText: {
        fontSize: 28,
        textTransform: 'capitalize',
    },
    pokeTypesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
    },
    pokeTypesText: {
        fontSize: 17,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
})


const PokeDetailHeader = ({ pokeID, }) => {

    const { height, width } = useWindowDimensions()
    const pokeData = useSelector((state)=>PokeStorage.selectorPokemonDataByID(state, pokeID), shallowEqual)
    

    return (
        <View style={styles.containerView}>
            <PokePreviewImage
                style={[styles.pokeImage, { height: (width*50/100), }, ]}
                pokeID={pokeID}
            />
            <Text style={styles.pokeNameText}>{ `${pokeData.data && pokeData.data.name} #${(pokeID.length > 2? pokeID : (pokeID.length > 1? '0'+pokeID:'00'+pokeID ))}` }</Text>

            <PokeTypeList 
                style={styles.pokeTypesContainer}
                styleText={styles.pokeTypesText}
                pokeID={pokeID}
            />

        </View>
    )
}

export default PokeDetailHeader