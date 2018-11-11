import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { translate } from 'react-i18next';

import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Popover,
  Switch,
  Typography,
  withStyles,
} from '@material-ui/core';

// Import Icons
import CloseIcon from '@material-ui/icons/Close';
import ColorIcon from '@material-ui/icons/Colorize';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import { yup } from '../../config/MainConfigs';

// Import Components
import { FormTemplate } from '..';

// Import Helpers
import { RequestHelper } from '../../helpers';

// Import Styles
import styles from './styles';

@inject('authStore', 'routing', 'uiStore', 'userStore')
@observer
class UserPopOver extends Component {
  @observable
  popIsOpen = false;

  @observable
  modalIsOpen = false;

  @observable
  modalOption = 0;

  @observable
  storePassword = {
    formInfo: {
      oldPassword: {
        id: 1,
        label: 'Old Password',
        type: 'string',
        variant: 'password',
        required: true,
      },
      newPassword: {
        id: 2,
        label: 'New Password',
        type: 'string',
        variant: 'password',
        required: true,
      },
      confirmPassword: {
        id: 3,
        label: 'Confirm New Password',
        type: 'string',
        variant: 'password',
        required: true,
      },
    },
    values: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    setValue: (option, value) => {
      this.storePassword.formInfo[option].error = null;
      this.storePassword.values[option] = value;
    },
    formValidation: yup.object().shape({
      oldPassword: yup.string().required(),
      newPassword: yup.string().required(),
      confirmPassword: yup
        .string()
        .equalTo(yup.ref('newPassword'))
        .required(),
    }),
  };

  @action
  handleChange = () => {
    this.popIsOpen = !this.popIsOpen;
  };

  @action
  handleClose = () => {
    this.modalIsOpen = false;
  };

  @action
  handleOpen = () => {
    this.modalIsOpen = true;
  };

  @action
  setModalOption = val => {
    this.modalOption = val;
  };

  handlePasswordChange = () => {
    this.storePassword.formValidation
      .validate(this.storePassword.values, { abortEarly: false })
      .then(() =>
        RequestHelper.requests
          .post('/api/users/change_password', this.storePassword.values)
          .then(res => {
            console.log('res', res);
          })
          .catch(err => console.log('err', err))
      )
      .catch(err => {
        err.inner.map(item => {
          this.storePassword.formInfo[item.params.path].error = item.message;
        });
        console.log('err', err);
      });
  };

  handleLogout = () => {
    const { authStore, routing, userStore } = this.props;
    authStore.logout().then(() => {
      userStore.forgetUser();
      routing.push('/');
    });
  };

  modalRender() {
    const { classes, t } = this.props;

    return (
      <Modal open={this.modalIsOpen} onClose={this.handleClose}>
        <div className={classes.paper}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6" id="modal-title">
                User Settings
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <List component="nav">
                <ListItem
                  button
                  selected={this.modalOption === 0}
                  onClick={() => this.setModalOption(0)}
                >
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="My info" />
                </ListItem>
                <ListItem
                  button
                  selected={this.modalOption === 1}
                  onClick={() => this.setModalOption(1)}
                >
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Password" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={8} style={{ paddingLeft: 50 }}>
              <FormTemplate basicLayout={false} store={this.storePassword}>
                <Grid container>
                  <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <Button onClick={this.handlePasswordChange}>
                      {t('common:forms.save')}
                    </Button>
                  </Grid>
                </Grid>
              </FormTemplate>
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }

  render() {
    const { classes, t, uiStore, userStore } = this.props;

    return (
      <Grid container direction="row" justify="flex-end">
        {this.modalRender()}
        <Typography variant="subtitle1" color="inherit">
          {userStore.currentUser.name}
        </Typography>
        <IconButton
          buttonRef={node => {
            this.anchorEl = node;
          }}
          color="primary"
          component="span"
          onClick={this.handleChange}
          className={classes.avatarStyle}
        >
          <Avatar
            alt={userStore.currentUser.name}
            style={{
              backgroundColor: '#d3d3d3',
            }}
          >
            {userStore.currentUser.name[0]}
          </Avatar>
        </IconButton>
        <Popover
          open={this.popIsOpen}
          anchorEl={this.anchorEl}
          anchorReference="anchorEl"
          onClose={this.handleChange}
          anchorOrigin={{
            vertical: 50,
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div className={classes.popOverContainer}>
            <List disablePadding>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    alt={userStore.currentUser.name}
                    className={classes.imageAvatar}
                    style={{ backgroundColor: '#d3d3d3' }}
                  >
                    {userStore.currentUser.name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={userStore.currentUser.name}
                  primaryTypographyProps={{
                    variant: 'subtitle1',
                  }}
                  secondary={userStore.currentUser.email}
                  secondaryTypographyProps={{
                    variant: 'caption',
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <ColorIcon />
                </ListItemIcon>
                <ListItemText primary={t('common:forms.darkTheme')} />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={uiStore.setThemeType}
                    checked={uiStore.themeType}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem className={classes.listSignout}>
                <Grid container>
                  <Grid item xs={6}>
                    <Button
                      style={{ textTransform: 'none' }}
                      variant="outlined"
                      size="small"
                      component="span"
                      onClick={this.handleOpen}
                    >
                      {t('common:forms.userSettings')}
                    </Button>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Button
                      style={{ textTransform: 'none', textAlign: 'right' }}
                      variant="outlined"
                      size="small"
                      component="span"
                      onClick={this.handleLogout}
                    >
                      {t('common:forms.logOut')}
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </div>
        </Popover>
      </Grid>
    );
  }
}

export default compose(
  translate('common'),
  withStyles(styles)
)(UserPopOver);
