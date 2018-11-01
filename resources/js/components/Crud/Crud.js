import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Import custom components
import { FormTemplate, TableTemplate } from '..';

@inject('routing')
@observer
class Permission extends Component {
  render() {
    const { match, routing, store } = this.props;

    switch (routing.location.pathname) {
      case `/${store.route}/add`:
        return <FormTemplate store={store} addButtons />;
      case `/${store.route}/edit/${match.params.id}`:
        return <FormTemplate id={match.params.id} store={store} addButtons />;
      default:
        return <TableTemplate store={store} />;
    }
  }
}

export default Permission;
