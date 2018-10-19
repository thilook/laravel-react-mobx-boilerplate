/* eslint-disable array-callback-return */
import React from 'react';
import { action, observable } from 'mobx';
import ProductsIcon from '@material-ui/icons/ImportantDevices';


class DrawerStore {

  @observable isOpen = false;

  @observable drawerItems = [
    { id:1, label: 'Test', routing: '/test', icon: <ProductsIcon /> },
    {
      id: 2,
      label: 'Test SubList',
      hasSublist: true,
      icon: <ProductsIcon />,
      isOpen: false,
      subList: [
        { id: 1, label: 'Sub1', routing: '/sub1', icon: <ProductsIcon /> },
        { id: 2, label: 'Sub2', routing: '/sub2', icon: <ProductsIcon /> },
      ],
    },
    {
      id: 3,
      label: 'Test SubList 2',
      hasSublist: true,
      icon: <ProductsIcon />,
      isOpen: false,
      subList: [
        { id: 1, label: 'Sub1', routing: '/sub1', icon: <ProductsIcon /> },
        { id: 2, label: 'Sub2', routing: '/sub2', icon: <ProductsIcon /> },
      ],
    },
    { id: 4, label: 'Test', routing: '/test', icon: <ProductsIcon /> },

  ];

 @action collapse = (id) => {
   this.drawerItems.map( item => {
     if (item.id === id) {
       item.isOpen = !item.isOpen;
     }
   })
 };

  @action toogleOpen = () => {
    this.isOpen = !this.isOpen;
  }

}

export default DrawerStore;
