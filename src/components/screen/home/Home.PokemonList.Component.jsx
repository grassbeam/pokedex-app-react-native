import React, { memo } from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';

import PokemonListItem from '_components/screen/home/Home.PokemonList.Item';


const ListItemContainer = memo(({item, onClick}) => {
    // const objStyle = Colors.COLOR_POKE_TYPE[item && item.types && item.types[0] && item.types[0].name];
    return (

      <PokemonListItem
        // {...objStyle}
        itemData={item}
        onClick={()=>onClick(item.id)}
        // backgroundColor={"#0F0F0F"}
      />
    )
  }
)

const PokemonList = ({ onRefreshingList, isRefreshing, ListData, onListEndReached, onClickItem, }) => (
  <FlatList
    horizontal={false}
    numColumns={2}
    bounces={false}
    onEndReachedThreshold={0.1}
    data={ListData}
    renderItem={({item})=> <ListItemContainer item={item} onClick={onClickItem} />}
    refreshing={isRefreshing}
    onRefresh={onRefreshingList}
    keyExtractor={item => `pokemon-${item.id}`}
    onEndReached={onListEndReached}
    removeClippedSubviews={true}
  />
);

export default PokemonList;