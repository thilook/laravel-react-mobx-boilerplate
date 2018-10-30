import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { FormTemplate, TableTemplate } from '../../components';

@inject('permissionStore')
@observer
class Home extends Component {
  render() {
    const { permissionStore } = this.props;
    return <FormTemplate addButtons store={permissionStore} />;
    //return <TableTemplate store={permissionStore} />;
  }
}

export default Home;
