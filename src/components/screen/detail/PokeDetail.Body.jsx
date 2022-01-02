import React from 'react';
import { View, } from 'react-native';
import PokeStats from '_components/pokemon/stats';

const PokeDetailBody = ({ pokeID, }) => {

    return(
        <View>
            <PokeStats pokeID={pokeID} />
        </View>
    )
}

export default PokeDetailBody