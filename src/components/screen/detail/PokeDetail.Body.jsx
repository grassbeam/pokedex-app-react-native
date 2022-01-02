import React from 'react';
import { View, StyleSheet, } from 'react-native';
import PokeStats from '_components/pokemon/stats';

const styles = StyleSheet.create({
    statsContainer: {
        borderColor: '#3F3F3F',
        borderRadius: 5,
        borderWidth: 2,
        padding: 2,
    },
})

const PokeDetailBody = ({ pokeID, }) => {

    return(
        <View>
            <PokeStats 
                pokeID={pokeID} 
                colorActiveBar={"#49DF21"}
                style={styles.statsContainer}
            />
        </View>
    )
}

export default PokeDetailBody