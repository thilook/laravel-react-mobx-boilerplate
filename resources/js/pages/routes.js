import React from "react";
import {Redirect, Route} from "react-router-dom";

// Import Pages


// Import Stores
import UserStore from '../stores/UserStore';

const userStore = new UserStore();

const PrivateRoute = ({component: Component, isAuth, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      if (userStore.currentUser) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {from: props.location}
          }}
        />
      );
    }}
  />
);

const protectedRoutes = () => (
  [

  ]
);

const publicRoutes = () => (
  [

  ]
);

export {protectedRoutes, publicRoutes};
