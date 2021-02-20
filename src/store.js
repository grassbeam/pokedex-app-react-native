import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as Config from '_constants/Config';
import DataStoreReducer from '_data/DataStore';
import {persistStore, persistCombineReducers} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import AsyncStorage from '@react-native-async-storage/async-storage';



const encryptor = encryptTransform({
    secretKey: Config._ENCRYPT,
  
    onError: function(error) {
      // Handle the error.
    //   Log.debugGroup("encryptor error", error);
    }
});

const configNorm = {
    key: Config.STOR_KEY.RootAllStorage,
    storage: AsyncStorage
  }
  
const configEncrypted = {
    key: Config.STOR_KEY.RootAllStorage,
    storage: AsyncStorage,
    transforms: [encryptor]
}
  

const rootPersistConfig = Config.IS_DEBUG? configNorm: configEncrypted;


let persitedReducer= persistCombineReducers(rootPersistConfig, DataStoreReducer);
// let persitedReducer= ReducerStorage;

export default function configureStore(initialState={}) {
  let store = createStore(persitedReducer, applyMiddleware(thunk)); 
  let persistor= persistStore(store);
  return {store,persistor};
}