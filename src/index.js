/* eslint-disable react/jsx-filename-extension */
// libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
// stores
import {
  cardStore, usersStore, errorsStore, requestStore,
} from 'stores';
// views
import App from 'views/App';
// styles
import 'index.scss';

const renderMethod = ReactDOM.render;

renderMethod(
  <Provider
    cardStore={cardStore}
    errorsStore={errorsStore}
    requestStore={requestStore}
    usersStore={usersStore}
  >
    <App />
  </Provider>,
  document.getElementById('root'),
);
