import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import {
  Icon,
  IconButton,
  Snackbar,
  SnackbarContent,
  withStyles,
} from '@material-ui/core';

// Import Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

// Import styles
import styles from './styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

@inject('notificationStore')
@observer
class Notification extends Component {
  handleClose = (event, reason) => {
    const { notificationStore } = this.props;
    if (reason === 'clickaway') {
      return;
    }
    notificationStore.setOpen(false);
  };

  render() {
    const { classes, notificationStore } = this.props;
    const { notificationSettings } = notificationStore;
    const Icon = variantIcon[notificationSettings.variant];
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={notificationStore.open}
        autoHideDuration={4000}
        onClose={(event, reason) => this.handleClose(event, reason)}
      >
        <SnackbarContent
          className={classes[notificationSettings.variant]}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {notificationSettings.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={(event, reason) => this.handleClose(event, reason)}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(Notification);
