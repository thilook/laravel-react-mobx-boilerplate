import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Import Pages
import HomePage from './Home';
import LoginPage from './Login';
import PermissionPage from './Permission';
import RolePage from './Role';
import UserPage from './User';

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
  <PrivateRoute
    key={3}
    exact
    path="/permissions/edit/:id"
    component={PermissionPage}
  />,
  <PrivateRoute key={4} exact path="/roles" component={RolePage} />,
  <PrivateRoute key={5} exact path="/roles/add" component={RolePage} />,
  <PrivateRoute key={6} exact path="/roles/edit/:id" component={RolePage} />,
  <PrivateRoute key={7} exact path="/users" component={UserPage} />,
  <PrivateRoute key={8} exact path="/users/add" component={UserPage} />,
  <PrivateRoute key={9} exact path="/users/edit/:id" component={UserPage} />,
];

const publicRoutes = () => [
  <Route key={0} exact path="/" component={LoginPage} />,
];

export { protectedRoutes, publicRoutes };
