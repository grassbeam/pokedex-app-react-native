import React from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';

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

const ListItemContainer = ({item}) => (

  <PokemonListItem
    itemData={item}
    onClick={()=>{}}
    style={styles}
    backgroundColor={"#000"}
  />
);

const PokemonList = ({ onRefreshingList, isRefreshing, ListData, onClickItem, }) => (
  <FlatList
    horizontal={false}
    numColumns={2}
    data={ListData}
    renderItem={ListItemContainer}
    refreshing={isRefreshing}
    onRefresh={onRefreshingList}
    keyExtractor={item => item.id}
  />
);

export default PokemonList;