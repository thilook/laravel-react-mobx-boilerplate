import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";

// Import Icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

@inject('drawerStore', 'routing')
@observer
class DrawerItem extends Component {


  render() {
    const { classes, drawerStore, isSub, item, routing } = this.props;
    if (item.hasSublist) {
      return(
        <section>
          <Tooltip title={item.label} placement="right">
            <ListItem
              button
              onClick={() => drawerStore.collapse(item.id)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                inset
                primary={item.label}
                primaryTypographyProps={{ variant: "subtitle1" }}
              />
              {item.isOpen ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
          </Tooltip>
          <Divider/>
          <Collapse in={item.isOpen}>
            <List component="div" disablePadding>
              {item.subList.map( subItem => (
                <DrawerItem key={subItem.id} item={subItem} isSub classes={classes} />
              ))}
            </List>
          </Collapse>
          <Divider/>
        </section>
      );
    }

    return(
      <section>
        <Tooltip title={item.label} placement="right">
          <ListItem
            button
            className={isSub? classes.nested : ""}
            onClick={() => routing.push(item.routing) }
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ variant: "subtitle1" }}
            />
          </ListItem>
        </Tooltip>
        <Divider/>
      </section>
    );
  }
}

export default DrawerItem;
