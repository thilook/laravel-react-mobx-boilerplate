/* eslint-disable no-undef,no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Provider } from 'mobx-react';
import { I18nextProvider } from 'react-i18next';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './app';
import customStores from './stores';
import { i18n } from './config/MainConfigs';

require('./bootstrap');

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = Object.assign({ routing: routingStore }, customStores);
const history = syncHistoryWithStore(browserHistory, routingStore);

if (document.getElementById('root')) {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider {...stores}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </I18nextProvider>,
    document.getElementById('root')
  );
}
