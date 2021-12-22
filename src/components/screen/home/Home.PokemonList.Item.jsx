import React, { memo, useEffect } from 'react';
import {  shallowEqual, useSelector  } from "react-redux";
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import PokeTypeList from '_components/pokemon/typelist'
import * as Colors from '_styles/Colors'
import * as PokeStorage from '_data/storage/pokemon/Pokemon.DataStore';
import { Log, } from '_helpers';

const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
    //   alignItems: 'flex-end',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 10,
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    titleThumbnail: {
      width: '100%',
      textAlign: 'center',
      fontSize: 24,
      textTransform: 'capitalize',
      color: 'white',
    },
    detailContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', //Centered vertically
    },
    imagePoke: {
      width: '50%',
      height: 100,
    },
    detailTextContainer: {
        width: '50%',
    },
    textPokeType: {
        textAlign: 'center',
        color: '#FFFFFF',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        margin: 5,
    }
  });

const LoadingItem = memo(({style}) => {
    const { width, height } = Dimensions.get("window");
    return(
        <SkeletonPlaceholder>
            <View style={[style.itemContainer, { alignItems: 'center', borderColor: 'transparent' }]}>
                <View style={{ height: 100, width: ( width * 0.5 - 24), borderRadius: 10,}} />
            </View>
        </SkeletonPlaceholder>
    );
});

const PokemonListItem = memo((props) => {

    const { itemData, onClick } = props;

    
    // const pokeData = useSelector((state) => state[PokeStorage.STORAGE_NAME_POKEMON][PokeStorage.STORAGE_POKE_DATA][itemData.id], shallowEqual);
    const pokeData = useSelector((state)=>PokeStorage.selectorPokemonDataByID(state,itemData.id), shallowEqual);
    // const pokeData = PokeStorage.getPokemonDataByID(props, itemData.id);

    const pokeTypeColor = Colors.COLOR_POKE_TYPE[pokeData && pokeData.data.types && pokeData.data.types[0] && pokeData.data.types[0].name];



    useEffect(()=>{
        Log.debugStr(`Re-Render finished on ${itemData.id}`)

        const unmounted = ()=> {
            Log.debugStr(`Component unmounted on ${itemData.id}`)
        }

        return unmounted
    })

    return (
        <>
            {
                pokeData && !pokeData.isError && pokeData.data ?
                <TouchableOpacity onPress={onClick} style={[styles.itemContainer, { ...pokeTypeColor }]}>
                    <Text style={styles.titleThumbnail}>{pokeData.data.name}</Text>
                    <View style={styles.detailContainer}>
                        <PokeTypeList 
                            style={styles.detailTextContainer}
                            dataTypes={pokeData.data.types}
                        />
                        <Image
                            style={styles.imagePoke}
                            source={{ uri: (pokeData.data.image.other.official_artwork || pokeData.data.image.front_default) }}
                        />
                    </View>
                </TouchableOpacity>
                :
                <LoadingItem style={styles} />
                
            }
        </>
    )
})

export default PokemonListItem

// const mapStateToProps = state => ({
//     [PokeStorage.STORAGE_POKE_DATA]: PokeStorage.getStorageByName(state, PokeStorage.STORAGE_POKE_DATA),
// })
  
// export default connect(mapStateToProps)(PokemonListItem);


