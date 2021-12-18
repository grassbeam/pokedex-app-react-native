import React, { Component } from 'react';
import { connect } from "react-redux";
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

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state =( 
      {
        isRefreshing: false,
        isLoadingData: (props.PokeListData && props.PokeListData.ListPokeID && props.PokeListData.ListPokeID.length < 1),
        isError: false,
        itemPerPage:20,
      }
    );

    this.toogleLoadingdata = this.toogleLoadingdata.bind(this);
    this.toogleRefreshing = this.toogleRefreshing.bind(this);
    this.removeAllSpinnerLoading = this.removeAllSpinnerLoading.bind(this);
  }

  componentDidMount() {    
    if (this.props.PokeListData && this.props.PokeListData.ListPokeID && this.props.PokeListData.ListPokeID.length < 1) {
      this.fetchList("");
    }
  }

  toogleLoadingdata = (isLoadingData) =>{
    this.setState({ ...this.state, isLoadingData, })
  }

  toogleRefreshing = (isRefreshing) => {
    this.setState({ ...this.state, isRefreshing, })
  }

  removeAllSpinnerLoading = (additionalState = {}) => {
    this.setState({
      ...this.state,
      ...additionalState,
      isLoadingData: false,
      isRefreshing: false,
    })
  }


  fetchList = (overrideURL="") => {
    Log.debugStr("Fetching API")
    this.toogleLoadingdata(true);
    PokeDS.getListPokemon(this.state.itemPerPage, overrideURL)
        .then((res) => res.data)
        .then((response)=>{
          const mapResult = response.results.map((itm,idx)=>{
              const pokeID = PokeStorage.getPokeIdFromDetailURL(itm.url);
              this.fetchDetailPokemon(pokeID)
              return PokeStorage.generatePokeListData(pokeID, itm.name, itm.url);
          });
          Log.debugStr(`Response mapResult ${mapResult.length}`)
          this.props.updatePokeListData({
            ListPokeID: mapResult,
            NextUpdateURL: response.next,
            TotalCount: response.count,
          })
          this.removeAllSpinnerLoading();
        })
        .catch(ex=>{
          Log.error(ex);
          this.removeAllSpinnerLoading({ isError: true });
        })
  };

  fetchDetailPokemon = (pokeID) => {
    PokeDS.getDetailPokemonByID(pokeID)
      .then((res) => res.data)
      .then((response) => {
        Log.debugStr(`Get Detail Pokemon ${response.name}`)
        const pokeDetailData = PokeStorage.generatePokeDataFromRemote(response)
        this.props.setPokeDetailData(PokeStorage.generatePokeDataSavingStorage(pokeID, pokeDetailData))
      })
      .catch(ex=>{
        Log.error(ex);
      })
  }

  // const fetchSpeciesPokemon = 

  onRefreshPokeList = ()=>{
    this.toogleRefreshing(true);
    // this.fetchList("");
  }

  onClickItemList = (selectedItemID)=>{
    Log.debugStr(`something clicked on ${selectedItemID}`);
  };

  onListEndReached = ()=>{
    if(!this.state.isLoadingData) {
      Log.debugStr(`List reach end`)
      this.fetchList(this.props.PokeListData.NextUpdateURL)
    }
  }

  render() {

    return (
      <SafeAreaView style={styles.container}>
        {
          this.props.PokeListData && this.props.PokeListData.ListPokeID && this.props.PokeListData.ListPokeID.length > 0 &&   
          <View style={{ flex: (this.props.PokeListData.ListPokeID > 0?10:0), justifyContent: 'center' }}>
            <PokemonList
              onRefreshingList={this.onRefreshPokeList}
              isRefreshing={this.state.isRefreshing}
              ListData={ this.props.PokeListData.ListPokeID }
              onClickItem={this.onClickItemList}
              onListEndReached={this.onListEndReached}
            />
          </View>
        }
        {
          (this.state.isLoadingData || this.props.PokeListData && this.props.PokeListData.ListPokeID && this.props.PokeListData.ListPokeID.length  < 1) && (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" animating={ this.state.isLoadingData }/>
            </View>
          )
        }
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  PokeListData: PokeStorage.getStorageByName(state, PokeStorage.STORAGE_POKE_LIST),
  [PokeStorage.STORAGE_POKE_DATA]: PokeStorage.getStorageByName(state, PokeStorage.STORAGE_POKE_DATA),
})


export default connect(mapStateToProps, {
  updatePokeListData: PokeStorage.updatePokeListData,
  setPokeDetailData: PokeStorage.setPokeDetailData,
})(HomeScreen);