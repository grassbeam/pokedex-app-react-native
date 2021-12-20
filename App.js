import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from './src/app/store';
import AppContainer from './src/AppContainer';


function App (props) {

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppContainer />
            </PersistGate>
        </Provider>
    );
}

export default App;
