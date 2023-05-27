import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from 'redux-persist/integration/react';          // PersistGate is used to render the app only after the state is rehydrated.

/* The code above does the following, explained in English:

1. Import the storage library from the redux-persist library we installed earlier.
2. Create a constant called persistConfig. This object is the configuration object for redux-persist.
3. In the persistConfig object, we can pass in a key, version, and storage.
    The key is the key we want to use to store our data.
    The version is the current version of our data. It is optional, but if you change the data you are storing,
    you can change the version number to ensure the data is persisted correctly.
    The storage is the storage method we want to use. We imported the storage method from redux-persist in step 1.
4. Export the persistConfig object. 

*/


const persistConfig = {                                                // This is the configuration for the redux-persist library.
  key: 'root',
  version: 1,
  storage,
};


/* The code above does the following, explained in English:
1. Get the default middleware.
2. Ignore a few actions (FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER).
3. Use the default middleware. */

const persistedReducer = persistReducer(persistConfig, authReducer);   // This is the persisted reducer.
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],   // These actions are ignored by the serializableCheck middleware.    
    },
  }),
});

/* The code above does the following, explained in English:
1. Import the store from the store file.
2. Import the persistStore function from redux-persist.
3. Import the PersistGate component from redux-persist.
4. Wrap the App component with the PersistGate component.
5. Pass the persistStore function as a prop to the PersistGate component.
6. Pass the store as a prop to the persistStore function.
7. Import the Provider component from react-redux.
8. Wrap the App component with the Provider component.
9. Pass the store as a prop to the Provider component. */


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>        {/* The PersistGate component is used to render the app only after the state is rehydrated. */} 
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);


