import React from 'react';
import { View, StyleSheet, } from 'react-native';
import PokeStats from '_components/pokemon/stats';
import PokeInfo from '_components/pokemon/info';

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: '#30a7d7',
        borderColor: '#30a7d7',
        marginBottom: 15,
    },
    infoItemLabel: {

    },
    infoItemValue: {
        color: '#000',
    },
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
            <PokeInfo 
                style={styles.infoContainer}
                styleLabel={styles.infoItemLabel}
                styleValue={styles.infoItemValue}
                pokeID={pokeID}
            />

            <PokeStats 
                pokeID={pokeID} 
                colorActiveBar={"#49DF21"}
                style={styles.statsContainer}
            />
        </View>
    )
}

export default PokeDetailBody