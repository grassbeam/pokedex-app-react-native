import React, { useReducer, useEffect } from 'react';
import { SafeAreaView, View, ActivityIndicator, StyleSheet} from 'react-native';

import { Log, } from '_helpers';
import PokemonList from '_components/screen/home/Home.PokemonList.Component';
import * as PokeDS from '_data/source/pokemon/Pokemon.DataSource';
import * as PokeStorage from '_data/storage/pokemon/Pokemon.DataStore';

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
            isRefreshing: action.data,
          });
        case 'initUpdateData' :
          return ({
            ...prevState,
            ...action.data,
          });
        default:
          return prevState;
      }
    },
    {
      isRefreshing: false,
      isLoadingData: true,
      pokeListData: [
        // {id: "001", isLoading: true},
        // {id: "001", name: "bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",},
        // {id: "002", name: "ivysaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",},
        // {id: "003", name: "venusaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",},
        // {id: "004", name: "charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",},
        // {id: "005", name: "charmeleon", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",},
        // {id: "006", name: "charizard", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",}
      ],
      currentPage: 1,
      itemPerPage: 10,
      totalData: 0,
      nextPageURL: "",
    }
  );

  useEffect(()=>{
    fetchList();
  });


  const fetchList = (overrideURL="") => {
    PokeDS.getListPokemon(20, overrideURL)
        .then((res) => res.data)
        .then((response)=>{
          const mapResult = response.results.map((itm,idx)=>{
              const pokeID = PokeStorage.getPokeIdFromDetailURL(itm.url);
              return PokeStorage.getDataListPageItem(itm.name.toUpperCase(), pokeID, (state.totalData+idx)
                          , itm.url, true, false, null);
          });
          dispatch({ type: 'initUpdateData', data: { pokeListData: [ ...state.pokeListData, ...mapResult], isLoadingData: false } })
        })
        .catch(ex=>{
          Log.error(ex);
        })
  };

  const onRefreshPokeList = React.useCallback(()=>{
    dispatch({ type: 'refreshing', data: true });
    fetchList();
  },[]);

  const onClickItemList = (selectedItemData)=>{
    Log.error("something clicked");
  };

  const onListEndReached = React.useCallback(()=>{
    dispatch({ type: 'initUpdateData', data: { isLoadingData: true, }})
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: (state.pokeListData.length > 0?10:0), justifyContent: 'center' }}>
        <PokemonList
          onRefreshingList={onRefreshPokeList}
          isRefreshing={state.isRefreshing}
          ListData={state.pokeListData}
          onClickItem={onClickItemList}
          onListEndReached={onListEndReached}
        />
      </View>
      {
        state.isLoadingData && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" animating={state.isLoadingData}/>
        </View>
        )
      }
    </SafeAreaView>
  );
};

export default HomeScreen;