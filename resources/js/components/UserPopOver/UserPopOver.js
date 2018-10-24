import React, { Component } from 'react';
import { observable } from 'mobx';
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
  Popover,
  Switch,
  Typography,
  withStyles,
} from '@material-ui/core';

// Import Icons
import ColorIcon from '@material-ui/icons/Colorize';

// Import Styles
import styles from './styles';

@inject('authStore', 'routing', 'uiStore', 'userStore')
@observer
class UserPopOver extends Component {
  @observable
  popIsOpen = false;

  handleChange = () => {
    this.popIsOpen = !this.popIsOpen;
  };

  handleLogout = () => {
    const { authStore, routing, userStore } = this.props;
    authStore.logout().then(() => {
      userStore.forgetUser();
      routing.push('/');
    });
  };

  render() {
    const { classes, t, uiStore, userStore } = this.props;

    return (
      <Grid container direction="row" justify="flex-end">
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
                <Button
                  style={{ textTransform: 'none' }}
                  variant="outlined"
                  size="small"
                  component="span"
                  onClick={this.handleLogout}
                >
                  {t('common:forms.logOut')}
                </Button>
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
