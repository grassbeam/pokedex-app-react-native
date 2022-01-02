import React, { memo, useEffect, } from 'react';
import {  shallowEqual, useSelector,  } from "react-redux";
import { Image, ActivityIndicator, } from "react-native";
import * as PokeStorage from '_data/storage/pokemon/Pokemon.DataStore';


const PokePreviewImage = memo((props) => {

    const { style, pokeID } = props

    const pokeData = useSelector((state)=>PokeStorage.selectorPokemonDataByID(state, pokeID), shallowEqual)
    

    useEffect(()=>{
    }, [pokeData])


    return(

        pokeData && !pokeData.isError && pokeData.data ?
        <Image
            style={style}
            source={{ uri: (pokeData.data.image.other.official_artwork || pokeData.data.image.front_default) }}
        />
        :
        <ActivityIndicator size="large" color="#0000ff" animating={ true }/>
    )

})


export default PokePreviewImage