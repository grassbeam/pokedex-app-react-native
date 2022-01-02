import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PokeDetailHeader from '_components/screen/detail/PokeDetail.Header'
import PokeDetailBody from '_components/screen/detail/PokeDetail.Body'

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
})

const PokeDetail = ({ route, navigation, }) => (
  <SafeAreaView style={{ flex: 1, }}>
    <ScrollView style={ styles.scrollContainer } >
      <PokeDetailHeader pokeID={route.params.PokeID} />
      <PokeDetailBody pokeID={route.params.PokeID} />
    </ScrollView>
  </SafeAreaView>
);

export default PokeDetail;