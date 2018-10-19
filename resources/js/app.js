import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


// Import components
import { Drawer } from './components';


@observer
class App extends Component {
  render(){
    return <Drawer/>;
  }
}

export default App;
