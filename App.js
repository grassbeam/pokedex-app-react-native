import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from './src/store';
import AppContainer from './src/AppContainer';


function App (props) {
    
    const {persistor,store}=configureStore();

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
            <AppContainer />
            </PersistGate>
        </Provider>
    );
}

export default App;
