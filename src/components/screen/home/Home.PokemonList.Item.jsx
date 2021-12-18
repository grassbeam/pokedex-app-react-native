import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import * as Colors from '_styles/Colors'

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

const PokemonListItem = ({ itemData, onClick, backgroundColor }) => (
    <>
        {
            itemData.isLoading ?
            <LoadingItem style={styles} />
            :
            <TouchableOpacity onPress={onClick} style={[styles.itemContainer, { backgroundColor }]}>
                <Text style={styles.titleThumbnail}>{itemData.name}</Text>
                <View style={styles.detailContainer}>
                    <View style={styles.detailTextContainer}>
                        {
                            itemData && itemData.types.map((itm,idx)=>(
                                <Text 
                                    key={`poke-${itemData.id}-types-${idx}`}
                                    style={[styles.textPokeType, Colors.COLOR_POKE_TYPE[itm.name || '']]}
                                >
                                    {(itm.name && itm.name.toUpperCase()) || "Unknown"}
                                </Text>
                            ))
                        }
                    </View>
                    <Image
                        style={styles.imagePoke}
                        source={{ uri: itemData.image }}
                    />
                </View>
            </TouchableOpacity>
        }
    </>
)


export default PokemonListItem;


