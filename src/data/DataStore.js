import { combineReducers } from 'redux';
import { DataStoreType } from '_constants';
import PokeStore from './pokemon/Pokemon.DataStore';


let DataStoreReducer;
export default DataStoreReducer = {
    [DataStoreType.POKE_STORAGE]: PokeStore,
}