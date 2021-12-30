import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {  shallowEqual, useSelector  } from "react-redux";
import { View, Dimensions, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import * as Colors from '_styles/Colors'




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

const PokeTypeList = ({ style, dataTypes }) => {

    return (
        <View style={style}>
            {
                dataTypes && dataTypes.map((itm,idx)=>(
                    <Text 
                        key={`poke-types-${idx}`}
                        style={[styles.textPokeType, Colors.COLOR_POKE_TYPE[itm.name || '']]}
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