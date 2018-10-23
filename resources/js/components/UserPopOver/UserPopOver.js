import React, { Component } from "react";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";

import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
  withStyles
} from "@material-ui/core";

// Import Styles
import styles from "./styles";

@inject("authStore", "routing", "userStore")
@observer
class UserPopOver extends Component {
    @observable
    popIsOpen = false;

    handleChange = () => {
      this.popIsOpen = !this.popIsOpen;
    };

    handleLogout = () =>
      this.props.authStore.logout().then(() => {
        this.props.userStore.forgetUser();
        this.props.routing.push("/");
      });

    render() {
      const { classes, userStore } = this.props;

      return (
        <Grid container direction="row" justify="flex-end">
          <Typography
            className={classes.marginAppBar}
            variant="subtitle1"
            color="inherit"
          >
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
                backgroundColor: "#d3d3d3"
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
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            <div className={classes.popOverContainer}>
              <List disablePadding>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={userStore.currentUser.name}
                      className={classes.imageAvatar}
                      style={{ backgroundColor: "#d3d3d3" }}
                    >
                      {userStore.currentUser.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={userStore.currentUser.name}
                    primaryTypographyProps={{
                      variant: "subtitle1"
                    }}
                    secondary={userStore.currentUser.email}
                    secondaryTypographyProps={{
                      variant: "caption"
                    }}
                  />
                </ListItem>
                <Divider />
                <ListItem className={classes.listSignout}>
                  <Button
                    style={{ textTransform: "none" }}
                    variant="outlined"
                    size="small"
                    component="span"
                    onClick={this.handleLogout}
                  >
                                    Sair
                  </Button>
                </ListItem>
              </List>
            </div>
          </Popover>
        </Grid>
      );
    }
}

export default withStyles(styles)(UserPopOver);
