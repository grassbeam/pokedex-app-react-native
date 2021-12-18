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
        case 'loadingNewData':
          return ({
            ...prevState,
            ...action.data,
            isLoadingData: true,
          })
        case 'initUpdateData' :
          return ({
            ...prevState,
            ...action.data,
          });
        case 'updatePokemonDetail':
          const pokelist = [ ...prevState.pokeListData ]
          pokelist[action.data.index] = {
            ...pokelist[action.data.index],
            ...action.data.detail,
          }

          return ({
            ...prevState,
            pokeListData: pokelist,
          })
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
      currentPage: 0,
      itemPerPage: 20,
      currentTotalData: 0,
      totalData: 0,
      nextPageURL: "",
    }
  );

  useEffect(()=>{
    if (state.totalData < 1) {
      fetchList("", true);
    }
  });

  const createDispatcher = (type, data) => ({ type, data })


  const fetchList = (overrideURL="", isNewRefresh=false) => {
    Log.debugStr("Fetching API")
    PokeDS.getListPokemon(state.itemPerPage, overrideURL)
        .then((res) => res.data)
        .then((response)=>{
          const mapResult = response.results.map((itm,idx)=>{
              const pokeID = PokeStorage.getPokeIdFromDetailURL(itm.url);
              fetchDetailPokemon(pokeID, (state.currentTotalData+idx))
              return PokeStorage.getDataListPageItem(itm.name.toUpperCase(), pokeID, (state.currentTotalData+idx)
                          , itm.url, true, false, null);
          });
          dispatch(  
            createDispatcher('initUpdateData', { 
                pokeListData: isNewRefresh? mapResult: [ ...state.pokeListData, ...mapResult], 
                currentTotalData: isNewRefresh? mapResult.length : state.currentTotalData+mapResult.length, 
                totalData: response.count,
                nextPageURL: response.next,
                currentPage: isNewRefresh? 1 : state.currentPage+1,
                isLoadingData: false,
                isRefreshing: false,
            })
          )
        })
        .catch(ex=>{
          Log.error(ex);
        })
  };

  const fetchDetailPokemon = (pokeID, arrayIndex) => {
    PokeDS.getDetailPokemonByID(pokeID)
      .then((res) => res.data)
      .then((response) => {
        Log.debugStr(`Get Detail Pokemon ${response.name}`)
        const pokeDetail = PokeStorage.generatePokeDataFromRemote(response)
        pokeDetail.isLoading = false;
        dispatch(
          createDispatcher('updatePokemonDetail', 
            {
              index: arrayIndex,
              detail: pokeDetail,
            }
          )
        )
      })
      .catch(ex=>{
        Log.error(ex);
      })
  }

  // const fetchSpeciesPokemon = 

  const onRefreshPokeList = React.useCallback(()=>{
    dispatch({ type: 'refreshing', data: true });
    fetchList("", true);
  },[]);

  const onClickItemList = (selectedItemID)=>{
    Log.debugStr(`something clicked on ${selectedItemID}`);
  };

  const onListEndReached = ()=>{
    dispatch({ type: 'loadingNewData', data: { isLoadingData: true, }})
    Log.debugStr(`List reach end`)
    fetchList(state.nextPageURL)
  }
  

  return (
    <SafeAreaView style={styles.container}>
      {
        state.pokeListData.length > 0 &&   
        <View style={{ flex: (state.pokeListData.length > 0?10:0), justifyContent: 'center' }}>
          <PokemonList
            onRefreshingList={onRefreshPokeList}
            isRefreshing={state.isRefreshing}
            ListData={state.pokeListData}
            onClickItem={onClickItemList}
            onListEndReached={onListEndReached}
          />
        </View>
      }
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