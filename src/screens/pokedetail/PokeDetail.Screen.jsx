import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';
import PokeDetailHeader from '_components/screen/detail/PokeDetail.Header'

const PokeDetail = ({ route, navigation, }) => (
  <SafeAreaView style={{ flex: 1, }}>
    <PokeDetailHeader pokeID={route.params.PokeID} />
  </SafeAreaView>
);

export default PokeDetail;