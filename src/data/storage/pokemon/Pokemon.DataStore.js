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
      /**
       * Format ListPokeID
       * {
       *    id: 1,
       *    name: "bulbasaur",
       *    detailURL: "https://pokeapi.co/api/v2/pokemon/1/"
       * }
       */
      ListPokeID: [], // List ID Pokemon Ascending
      NextUpdateURL: "",
      TotalCount: 0,
    },
    [STORAGE_POKE_DATA]: { 
      /**
       *  isError: false, // For retry mechanism
       *  data: { },
       */
     }, // pokemon data, object key using PokemonID
    [STORAGE_POKE_SPECIES]: { }, // pokemon species object
    [STORAGE_POKE_COMPARE]: {  }, // index = pokemonID, value 0/1/99 => 0=failed or not found, 1=success, 99=waiting
}

export const PokemonSlice = createSlice({
  name: STORAGE_NAME_POKEMON,
  initialState,
  reducers: {
      resetAllData: _ => initialState,
      updatePokeListData: (state, action) => {
        state[STORAGE_POKE_LIST].ListPokeID.push(...action.payload.ListPokeID)
        state[STORAGE_POKE_LIST].NextUpdateURL = action.payload.NextUpdateURL
        state[STORAGE_POKE_LIST].TotalCount = action.payload.TotalCount
        state[STORAGE_LAST_ACTION] = "updatePokeListData"
      },
      setPokeDetailData: (state, action) => {
        state[STORAGE_POKE_DATA] = {
          ...state[STORAGE_POKE_DATA],
          ...action.payload,
        }
        state[STORAGE_LAST_ACTION] = "setPokeDetailData"
      },
      setPokeSpeciesData: (state, action) => {
        state[STORAGE_POKE_SPECIES] = {
          ...state[STORAGE_POKE_SPECIES],
          ...action.payload,
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
  updatePokeListData,
  setPokeDetailData,
  setPokeSpeciesData,
} = PokemonSlice.actions;


// ======= GENERATOR FUNCTION ======= //


export function generatePokeDataFromRemote(response) {
    return ({
        id: response.id,
        name: response.name,
        image: {
          front_default: response.sprites.front_default,
          other: {
            official_artwork: response.sprites.other && response.sprites.other["official-artwork"] && response.sprites.other["official-artwork"]["front_default"],
          }
        },
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

export const generatePokeListData = (id, name, detailURL) => ({
  id, name, detailURL,
});

export const generatePokeDataSavingStorage = (pokeID, data, isError=false) => ({
  [pokeID]: { data, isError, }
});

// ======= END OF GENERATOR FUNCTION ======= //




// ======= GETTER FUNCTION ======= //

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
  if (!Util.isNullOrUndefined(props[STORAGE_POKE_DATA])) {

    if (!Util.isNullOrUndefined(props[STORAGE_POKE_DATA])) {
      result = props[STORAGE_POKE_DATA][PokeID];
    }
    
  } 
  return result;
}


// ======= END OF GETTER FUNCTION ======= //



// ======= REDUX STATE FUNCTION ======= //

export const getStorageByName = (state, storageName) => (state[STORAGE_NAME_POKEMON] && state[STORAGE_NAME_POKEMON][storageName])

export const getDataListRedux = (state) => state && state[STORAGE_NAME_POKEMON] && state[STORAGE_NAME_POKEMON][STORAGE_POKE_LIST]


// ======= END OF REDUX STATE FUNCTION ======= //