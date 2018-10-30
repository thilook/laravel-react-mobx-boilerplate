import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Import custom components
import { FormTemplate, TableTemplate } from '../../components';

@inject('permissionStore', 'routing')
@observer
class Permission extends Component {
  render() {
    const { permissionStore, routing } = this.props;
    switch (routing.location.pathname) {
      case '/permissions/add':
        return <FormTemplate store={permissionStore} addButtons />;
      default:
        return <TableTemplate store={permissionStore} />;
    }
  }
}

export default Permission;
