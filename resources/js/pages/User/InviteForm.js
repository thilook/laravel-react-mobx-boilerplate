import React, { Component } from 'react';
import { observable, toJS } from 'mobx';
import { compose } from 'recompose';
import { withNamespaces } from 'react-i18next';
import { inject, observer } from 'mobx-react';
import {
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ReactMultiEmail } from 'react-multi-email';

// Import Helpers
import { RequestHelper } from '../../helpers';

const styles = {
  multiEmail: {
    '& > input': {
      border: 'none',
      outline: 'none',
    },
    borderBottom: '1px solid black',
  },

  paperContainer: {
    marginTop: 20,
  },
};

@inject('notificationStore', 'routing', 'userListStore')
@observer
class InviteForm extends Component {
  @observable
  emails = [];

  goBack = () => {
    const { routing } = this.props;
    routing.goBack();
  };

  sendInvites = () => {
    const { notificationStore, t } = this.props;
    RequestHelper.requests
      .post('/api/users/invite', { emails: toJS(this.emails) })
      .then(res => {
        notificationStore.setNotificationSettings({
          message: `${t('common:notifications.createSuccess')}`,
          variant: 'success',
        });
        notificationStore.setOpen(true);
        this.goBack();
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  render() {
    const { classes, t } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Typography variant="h5">User</Typography>
        </Grid>
        <Grid item xs={12} className={classes.paperContainer}>
          <Paper style={{ padding: 20 }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Enter emails:</Typography>
              </Grid>
              <Grid item xs={12}>
                <ReactMultiEmail
                  className={classes.multiEmail}
                  emails={this.emails}
                  onChange={_emails => {
                    this.emails = _emails;
                  }}
                  getLabel={(email, index, removeEmail) => (
                    <Grid key={index} item xs={4}>
                      <Chip
                        key={index}
                        label={email}
                        onDelete={() => removeEmail(index)}
                      />
                    </Grid>
                  )}
                />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 20 }}>
              <Grid item xs={6}>
                <Button
                  onClick={this.goBack}
                  size="small"
                  color="primary"
                  variant="text"
                  disableFocusRipple
                  disableRipple
                >
                  {t('common:forms.cancel')}
                </Button>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <Button
                  onClick={this.sendInvites}
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    textTransform: 'none',
                  }}
                >
                  Send Invites
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  withStyles(styles),
  withNamespaces('common')
)(InviteForm);
