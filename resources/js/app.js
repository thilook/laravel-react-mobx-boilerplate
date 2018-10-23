import React, { Component } from 'react';
import {  toJS } from 'mobx';
import { inject, observer } from 'mobx-react';


// Import components
import { Drawer } from './components';

// Import Routes
import { protectedRoutes, publicRoutes } from "./pages/routes";

@inject('userStore')
@observer
class App extends Component {

  render() {
    const { userStore } = this.props;
    console.log('currentStore', userStore.currentUser);
    if (userStore.currentUser){
      return (
        <section>
          <Drawer />
          {protectedRoutes()}
        </section>
      );
    }
    return (
      <section>
        {publicRoutes()}
      </section>
    );
  }
}

export default App;
