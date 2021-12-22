import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

const PokeDetail = ({ route, navigation, }) => (
  <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Detail Pokemon { route.params.PokeID }</Text>
  </SafeAreaView>
);

export default PokeDetail;