import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from './src/app/store';
import AppContainer from './src/AppContainer';


function App (props) {

    return (
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </PersistGate>
    );
}

export default App;
