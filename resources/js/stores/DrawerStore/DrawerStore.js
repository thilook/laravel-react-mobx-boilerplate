/* eslint-disable array-callback-return */
import React from 'react';
import { action, observable } from 'mobx';

// Import Icons
import PeopleIcon from '@material-ui/icons/People';
import PermissionIcon from '@material-ui/icons/Security';
import PersonIcon from '@material-ui/icons/Person';
import ProductsIcon from '@material-ui/icons/ImportantDevices';
import RoleIcon from '@material-ui/icons/AssignmentInd';

class DrawerStore {
  @observable
  isOpen = false;

  @observable
  drawerItems = [
    {
      id: 1,
      label: 'Manage Users',
      hasSublist: true,
      icon: <PeopleIcon />,
      isOpen: false,
      subList: [
        {
          id: 1,
          label: 'Permissions',
          routing: '/permissions',
          icon: <PermissionIcon />,
        },
        { id: 2, label: 'Roles', routing: '/roles', icon: <RoleIcon /> },
        { id: 3, label: 'Users', routing: '/users', icon: <PersonIcon /> },
      ],
    },
    { id: 2, label: 'Test', routing: '/test', icon: <ProductsIcon /> },
  ];

  @action
  collapse = id => {
    this.drawerItems.map(item => {
      if (item.id === id) {
        item.isOpen = !item.isOpen;
      }
    });
  };

  @action
  toogleOpen = () => {
    this.isOpen = !this.isOpen;
  };
}

export default DrawerStore;
