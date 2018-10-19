import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from "classnames";
import {
  ButtonBase,
  ClickAwayListener,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
  withStyles,
} from '@material-ui/core';

// Import Icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// Import Custom Components
import DrawerItem from './DrawerItem';

// Import Styles
import styles from './styles';

@inject('drawerStore', 'routing')
@observer
class CustomDrawer extends  Component {
  componentDidMount(){
    const { drawerStore } = this.props;
    console.log('drawer', drawerStore.collapsableItems);
  }

  renderChevron() {
    const { drawerStore } = this.props;
    if (drawerStore.isOpen) {
      return <ChevronLeftIcon />;
    }
    return <ChevronRightIcon />;
  }

  render() {
    const { classes, drawerStore, routing } = this.props;
    return (
      <Drawer
        variant="permanent"
        anchor="left"
        open={drawerStore.isOpen}
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !drawerStore.isOpen && classes.drawerPaperClose
          )
        }}
      >
        <ClickAwayListener onClickAway={() => {}}>
          <section>
            <ButtonBase
              onClick={() => routing.push("/")}
              className={classes.divContainer}
            >
              <Typography variant="h6">
                <img
                  alt="logo"
                  src="https://via.placeholder.com/350x150"
                  height={30}
                />
              </Typography>
            </ButtonBase>
            <Divider/>
            <List component="nav" disablePadding>
              {drawerStore.drawerItems.map(item => (
                <DrawerItem key={item.id} item={item} classes={classes}/>
              ))}
            </List>
            <div className={classes.drawerHeader}>
              <IconButton onClick={drawerStore.toogleOpen}>
                {this.renderChevron()}
              </IconButton>
            </div>
          </section>
        </ClickAwayListener>
      </Drawer>
    );
  }
}

export default withStyles(styles) (CustomDrawer);
