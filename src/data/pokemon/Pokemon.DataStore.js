import { DataStoreType } from '_constants';



export const STORAGE_LAST_ACTION = "LastAction";
export const STORAGE_POKE_DATA = "PokeData";
export const STORAGE_POKE_SPECIES = "PokeSpecies";
export const STORAGE_POKE_COMPARE = "PokeCompareStatus";



const PokeInitialState = {
    [STORAGE_LAST_ACTION]: null, // for logging last component updating this storage
    [STORAGE_POKE_DATA]: {  }, // pokemon data, object key using PokemonID
    [STORAGE_POKE_SPECIES]: { }, // pokemon species object
    [STORAGE_POKE_COMPARE]: {  }, // index = pokemonID, value 0/1/99 => 0=failed or not found, 1=success, 99=waiting
}


export default function PokemonStorage(state=PokeInitialState, action) {
    if (action.type == DataStoreType.POKE_STORAGE) {
      if (action.strloc === STORAGE_POKE_DATA) {
        return {
            ...state,
            [STORAGE_LAST_ACTION]: action.payload,
            [action.strloc]: {
                ...state[action.strloc],
                ...action.value
            }
        };
      } else if (action.strloc === STORAGE_POKE_SPECIES) {
        return {
            ...state,
            [STORAGE_LAST_ACTION]: action.payload,
            [action.strloc]: {
                ...state[action.strloc],
                ...action.value
            }
        };
      } else if (action.strloc === STORAGE_POKE_COMPARE) {
        return {
            ...state,
            [STORAGE_LAST_ACTION]: action.payload,
            [action.strloc]: {
                ...state[action.strloc],
                ...action.value
            }
        };
      } else
          return {
              ...state,
              [STORAGE_LAST_ACTION]: action.payload,
              [action.strloc]: action.value
          };

    } else return state;
  }