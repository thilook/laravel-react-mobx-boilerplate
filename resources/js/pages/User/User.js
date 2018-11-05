import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Import custom components
import { FormTemplate, TableTemplate } from '../../components';
import InviteForm from './InviteForm';

@inject('routing', 'userListStore')
@observer
class User extends Component {
  render() {
    const { match, routing, userListStore } = this.props;

    switch (routing.location.pathname) {
      case `/${userListStore.route}/add`:
        return <InviteForm />;
      case `/${userListStore.route}/edit/${match.params.id}`:
        return (
          <FormTemplate id={match.params.id} store={userListStore} addButtons />
        );
      default:
        return <TableTemplate store={userListStore} addButtonText="Invite" />;
    }
  }
}

export default User;
