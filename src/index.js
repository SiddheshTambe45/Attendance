import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from 'react-redux';
import { store, persistor } from './Store/Store';
import { PersistGate } from 'redux-persist/integration/react';



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );


const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

