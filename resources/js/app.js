import React, { Component } from 'react';
import {  toJS } from 'mobx';
import { inject, observer } from 'mobx-react';


// Import components
import { Drawer } from './components';

// Import Routes
import { protectedRoutes, publicRoutes } from "./pages/routes";


@observer
class App extends Component {

  render(){
    return (
      <section>
        {publicRoutes()}
      </section>
    );
  }
}

export default App;
