// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});


// // src/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
// import authReducer from './Slices/AuthSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);
