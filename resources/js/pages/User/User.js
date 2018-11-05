import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';

// Import custom components
import { FormTemplate, TableTemplate } from '../../components';
import InviteForm from './InviteForm';
import TableActions from './TableActions';

@inject('inviteStore', 'routing', 'userListStore')
@observer
class User extends Component {
  @observable
  value = 0;

  handleChange = (event, value) => {
    this.value = value;
  };

  render() {
    const { inviteStore, match, routing, t, userListStore } = this.props;

    switch (routing.location.pathname) {
      case `/${userListStore.route}/add`:
        return <InviteForm />;
      case `/${userListStore.route}/edit/${match.params.id}`:
        return (
          <FormTemplate id={match.params.id} store={userListStore} addButtons />
        );
      default:
        return (
          <div>
            <Tabs
              textColor="primary"
              value={this.value}
              onChange={this.handleChange}
              style={{ marginBottom: 20 }}
            >
              <Tab label={t('common:titles.allUsers')} />
              <Tab label={t('common:titles.pendingUsers')} />
            </Tabs>
            {this.value === 0 && (
              <TableTemplate store={userListStore} addButtonText="Invite" />
            )}
            {this.value === 1 && (
              <TableTemplate
                actions={<TableActions />}
                store={inviteStore}
                disableAdd
              />
            )}
          </div>
        );
    }
  }
}

export default withNamespaces('common')(User);
