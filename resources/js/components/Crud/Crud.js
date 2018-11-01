import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Import custom components
import { FormTemplate, TableTemplate } from '..';

@inject('routing')
@observer
class Permission extends Component {
  render() {
    const { routing, store } = this.props;
    switch (routing.location.pathname) {
      case `/${store.route}/add`:
        return <FormTemplate store={store} addButtons />;
      default:
        return <TableTemplate store={store} />;
    }
  }
}

export default Permission;
