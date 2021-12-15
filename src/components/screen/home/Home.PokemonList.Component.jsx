import React from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';

import { COLOR_POKE_TYPE } from '_styles/js/ColorStyle'

import PokemonListItem from '_components/screen/home/Home.PokemonList.Item';

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'flex-end',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
  },
  titleThumbnail: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    textTransform: 'capitalize',
    color: 'white',
  },
});

const ListItemContainer = ({item, onClick}) => {
  const objStyle = COLOR_POKE_TYPE[item && item.types && item.types[0] && item.types[0].name];
  return (

    <PokemonListItem
      {...objStyle}
      itemData={item}
      onClick={()=>onClick(item.id)}
      style={styles}
      // backgroundColor={"#0F0F0F"}
    />
  )
}

const PokemonList = ({ onRefreshingList, isRefreshing, ListData, onListEndReached, onClickItem, }) => (
  <FlatList
    horizontal={false}
    numColumns={2}
    data={ListData}
    renderItem={({item})=> <ListItemContainer item={item} onClick={onClickItem} />}
    refreshing={isRefreshing}
    onRefresh={onRefreshingList}
    keyExtractor={item => `pokemon-${item.id}`}
    onEndReached={onListEndReached}
  />
);

export default PokemonList;