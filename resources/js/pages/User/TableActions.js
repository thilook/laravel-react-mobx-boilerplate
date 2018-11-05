import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { toJS } from 'mobx';
import { compose } from 'recompose';
import { withNamespaces } from 'react-i18next';

import { Button, withStyles } from '@material-ui/core';

// Import Helpers
import { RequestHelper } from '../../helpers';

@inject('notificationStore', 'routing', 'tableStore')
class TableActions extends Component {
  handleClick = () => {
    const { row, notificationStore, t, tableStore } = this.props;
    RequestHelper.requests
      .post('/api/users/invite', { emails: [row.email] })
      .then(res => {
        tableStore.reset(true);
        notificationStore.setNotificationSettings({
          message: `${t('common:notifications.sentSuccess')}`,
          variant: 'success',
        });
        notificationStore.setOpen(true);
      })
      .catch(err => {
        notificationStore.setNotificationSettings({
          message: `${t('common:notifications.sentError')}`,
          variant: 'error',
        });
        notificationStore.setOpen(true);
      });
  };

  render() {
    return (
      <Button
        onClick={this.handleClick}
        style={{ textTransform: 'none', textAlign: 'left', padding: 0 }}
      >
        Resend Invite
      </Button>
    );
  }
}

export default compose(withNamespaces('common'))(TableActions);
