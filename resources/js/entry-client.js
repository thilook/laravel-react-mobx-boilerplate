/* eslint-disable no-undef,no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Provider } from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './app';
import customStores from './stores';

require('./bootstrap');


const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = Object.assign({ routing: routingStore}, customStores);
const history = syncHistoryWithStore(browserHistory, routingStore);

if (document.getElementById('root')) {
  ReactDOM.render(
    <Provider {...stores}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
}
