import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { inject, observer } from 'mobx-react';

// Import Pages
import HomePage from './Home';
import LoginPage from './Login';


@inject('userStore', 'commonStore')
@observer
class PrivateRoute extends Component {

  render() {
    const { userStore, ...restProps } = this.props;
    if (userStore.currentUser) return <Route {...restProps} />;
    return <Redirect to="/" />;
  }
}

const protectedRoutes = () => (
  [
    <PrivateRoute key={0} exact path="/" component={HomePage}/>,
  ]
);

const publicRoutes = () => (
  [
    <Route key={0} exact path="/" component={LoginPage}/>,
  ]
);

export { protectedRoutes, publicRoutes };
