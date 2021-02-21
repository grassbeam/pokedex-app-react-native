import React, { useReducer } from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import { Log, } from '_helpers';


import PokemonList from '_components/screen/home/Home.PokemonList.Component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  scrollView: {
    flex: 1,
  },
});

const HomeScreen = (props) => {
  const {navigation} = props;

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch(action.type) {
        case 'refreshing': 
        return ({
          ...prevState,
          ...(action.data??{}),
          isRefreshing: !prevState,
        });
        default:
          return prevState;
      }
    },
    {
      isRefreshing: false,
      pokeListData: [
        {id: "001", name: "bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",},
        {id: "002", name: "ivysaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",},
        {id: "003", name: "venusaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",},
        {id: "004", name: "charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",},
        {id: "005", name: "charmeleon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",},
        {id: "006", name: "charizard", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",}
      ],
    }
  );

  const onRefreshPokeList = React.useCallback(()=>{
    dispatch({ type: 'refreshing' });
  },[]);

  const onClickItemList = (selectedItemData)=>{
    Log.debugStr("Clicking Item");
  };

  return (
    <SafeAreaView style={styles.container}>
      <PokemonList
        onRefreshingList={onRefreshPokeList}
        isRefreshing={state.isRefreshing}
        ListData={state.pokeListData}
        onClickItem={onClickItemList}
      />
    </SafeAreaView>
  )
};

export default HomeScreen;