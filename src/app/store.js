import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from "redux"; 
import { persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import thunk from 'redux-thunk';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Config from '_constants/Config';

import PokemonReducer, { STORAGE_NAME_POKEMON } from '_data/storage/pokemon/Pokemon.DataStore';

const reducers = combineReducers({
  [STORAGE_NAME_POKEMON]: PokemonReducer,
})

const persistConfig = {
  key: 'primary',
  keyPrefix: 'pokemon', // the redux-persist default `persist:` doesn't work with some file systems
  storage: AsyncStorage,
  version: 1,
  transforms: Config.IS_DEBUG?[]:
  [
    encryptTransform({
      secretKey: Config._ENCRYPT,
      onError: function (err) {
        // Handle the error.
        //   Log.debugGroup("encryptor error", error);
      },
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 5000,
      },
  }),
});

const persistor = persistStore(store);

export {
  store,
  persistor,
}

