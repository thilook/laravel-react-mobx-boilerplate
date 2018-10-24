import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { TableTemplate } from '../../components';

@inject('permissionStore')
@observer
class Home extends Component {
  render() {
    const { permissionStore } = this.props;
    return <TableTemplate store={permissionStore} />;
  }
}

export default Home;
