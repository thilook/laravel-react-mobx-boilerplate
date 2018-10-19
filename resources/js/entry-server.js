/* eslint-disable no-undef,react/style-prop-object */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { StaticRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './app';

require('./bootstrap');

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const stores = Object.assign({ routing: routingStore}, {});
const history = syncHistoryWithStore(browserHistory, routingStore);

// Compile an initial state
const { packages } = context;

const html = ReactDOMServer.renderToString(
  <div id="root" style="height: 100%">
    <Provider {...stores}>
      <StaticRouter location={context.url} history={history}>
        <App packages={packages} />
      </StaticRouter>
    </Provider>
  </div>,
);

dispatch(html);
