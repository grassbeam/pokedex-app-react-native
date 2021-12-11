import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const LoadingItem = ({style}) => {
    const { width, height } = Dimensions.get("window");
    return(
        <SkeletonPlaceholder>
            <View style={[style.itemContainer, { alignItems: 'center', borderColor: 'transparent' }]}>
                <View style={{ height: 100, width: ( width * 0.5 - 24), borderRadius: 10,}} />
            </View>
        </SkeletonPlaceholder>
    );
};

const PokemonListItem = ({ itemData, onClick, style, backgroundColor }) => (
    <>
        {
            itemData.isLoading ?
            <LoadingItem style={style} />
            :
            <TouchableOpacity onPress={onClick} style={[style.itemContainer, { backgroundColor }]}>
                <Text style={style.titleThumbnail}>{itemData.name}</Text>
                <Image
                    style={style.imageThumbnail}
                    source={{ uri: itemData.image }}
                />
            </TouchableOpacity>
        }
    </>
)


export default PokemonListItem;


