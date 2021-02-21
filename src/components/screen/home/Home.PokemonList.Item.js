import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";


const PokemonListItem = ({ itemData, onClick, style, backgroundColor }) => (
    <TouchableOpacity onPress={onClick} style={[style.itemContainer, { backgroundColor }]}>
        <Text style={style.titleThumbnail}>{itemData.name}</Text>
        <Image
            style={style.imageThumbnail}
            source={{ uri: itemData.image }}
        />
    </TouchableOpacity>
)


export default PokemonListItem;


