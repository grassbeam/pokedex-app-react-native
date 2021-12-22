import React from 'react';
import {FlatList } from 'react-native';

import PokemonListItem from '_components/screen/home/Home.PokemonList.Item';

const PokemonList = ({ onRefreshingList, isRefreshing, ListData, onListEndReached, onClickItem, }) => (
  <FlatList
    horizontal={false}
    numColumns={2}
    initialNumToRender={10}
    // bounces={false}
    onEndReachedThreshold={0.1}
    data={ListData}
    renderItem={({item})=> <PokemonListItem itemData={item} onClick={()=>onClickItem(item.id)} />}
    // refreshing={isRefreshing}
    // onRefresh={onRefreshingList}
    keyExtractor={item => `pokemon-${item.id}`}
    onEndReached={onListEndReached}
    removeClippedSubviews={true}
  />
);

export default PokemonList;