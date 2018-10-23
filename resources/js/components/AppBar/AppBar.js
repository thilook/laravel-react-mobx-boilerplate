import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";

import UserPopOver from "../UserPopOver";

// Import styles
import styles from './styles';

@inject('drawerStore')
@observer
class AppBarCustom extends Component {
  render() {
    const { classes, drawerStore } = this.props;
    return(
      <AppBar
        color="default"
        elevation={0}
        className={classNames(classes.appBar, {
          [classes.appBarShift]: drawerStore.isOpen,
          [classes["appBarShift-left"]]: drawerStore.isOpen
        })}
      >
        <Toolbar disableGutters>
          <Grid container direction="row">
            <Typography
              variant="h6"
              color="inherit"
              className={classes.flex}
            />
            <UserPopOver />
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles) (AppBarCustom);