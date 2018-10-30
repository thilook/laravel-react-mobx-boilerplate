import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Import Pages
import HomePage from './Home';
import LoginPage from './Login';
import PermissionPage from './Permission';

// Import Helper
import { StorageHelper } from '../helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (StorageHelper.localGetItem('token')) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

const protectedRoutes = () => [
  <PrivateRoute key={0} exact path="/" component={HomePage} />,
  <PrivateRoute key={1} exact path="/permissions" component={PermissionPage} />,
  <PrivateRoute
    key={2}
    exact
    path="/permissions/add"
    component={PermissionPage}
  />,
];

const publicRoutes = () => [
  <Route key={0} exact path="/" component={LoginPage} />,
];

export { protectedRoutes, publicRoutes };
