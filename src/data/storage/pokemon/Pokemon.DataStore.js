import { createSlice } from '@reduxjs/toolkit';
import { Config } from '_constants';
import * as Util from '_helpers/Util';

export const STORAGE_NAME_POKEMON = Config.IS_DEBUG? "PokeStorage" : "_PKS"

export const STORAGE_LAST_ACTION = "LastAction";
export const STORAGE_POKE_LIST = "PokeListId";
export const STORAGE_POKE_DATA = "PokeData";
export const STORAGE_POKE_SPECIES = "PokeSpecies";
export const STORAGE_POKE_COMPARE = "PokeCompareStatus";



const initialState = {
    [STORAGE_LAST_ACTION]: null, // for logging last component updating this storage
    [STORAGE_POKE_LIST]: {
      ListPokeID: [], // List ID Pokemon Ascending
      NextUpdateURL: "",
      TotalCount: 0,
    },
    [STORAGE_POKE_DATA]: {  }, // pokemon data, object key using PokemonID
    [STORAGE_POKE_SPECIES]: { }, // pokemon species object
    [STORAGE_POKE_COMPARE]: {  }, // index = pokemonID, value 0/1/99 => 0=failed or not found, 1=success, 99=waiting
}

export const PokemonSlice = createSlice({
  name: STORAGE_NAME_POKEMON,
  initialState,
  reducers: {
      resetAllData: _ => initialState,
      setPokeData: (state, action) => {
        state[STORAGE_POKE_DATA] = {
          ...state[STORAGE_POKE_DATA],
          ...action.value,
        }
        state[STORAGE_LAST_ACTION] = "setPokeData"
      },
      setPokeSpeciesData: (state, action) => {
        state[STORAGE_POKE_SPECIES] = {
          ...state[STORAGE_POKE_SPECIES],
          ...action.value,
        }
        state[STORAGE_LAST_ACTION] = "setPokeSpeciesData"
      },

  }
})

// Reducer Storage
export default PokemonSlice.reducer;

// Action Dispatcher
export const {
  resetAllData,
  setPokeData,
  setPokeSpeciesData,
} = PokemonSlice.actions;

  export function generatePokeDataFromRemote(response) {
    return ({
        id: response.id,
        name: response.name,
        image: response.sprites.front_default,
        abilities: response.abilities,
        base_experience: response.base_experience,
        held_items: response.held_items,
        height: response.height,
        weight: response.weight,
        types: response.types.map((itm)=>({ slot: itm.slot, name: itm.type.name , url: itm.type.url})),
        stats: response.stats,
        species: response.species,
        moves: response.moves,
    });
  };





// ======= GETTER FUNCTION ======= //

export const getDataListPageItem = (name, pokeID, idx, detailURL, isLoading=true, isError=false, data=null) => ({
    id: `${pokeID}`,
    name,
    pokeID,
    idx,
    detailURL,
    isLoading,
    isError,
    data,
});

export function getPokeIdFromDetailURL(detailURL) {
    
    if (!Util.isNullOrEmpty(detailURL)) {
      const tmparr = detailURL.split("/");
      if (!Util.isNullOrEmpty(tmparr[tmparr.length-1])) {
        return tmparr[tmparr.length-1];
      } else {
        return tmparr[tmparr.length-2];
      }
    } return 0
}

export function getPokemonDataByID(props, PokeID) {
  var result = null;
  if (!Util.isNullOrUndefined(props[DataStorageType.POKE_STORAGE])) {

    if (!Util.isNullOrUndefined(props[DataStorageType.POKE_STORAGE][STORAGE_POKE_DATA])) {
      result = props[DataStorageType.POKE_STORAGE][STORAGE_POKE_DATA][PokeID];
    }
    
  } 
  return result;
}

