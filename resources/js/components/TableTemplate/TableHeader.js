import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

// Import Custom components
import { IfComponent } from '..';

@observer
class TableHeader extends Component {
  render() {
    const { actions, store, tableStore } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={
                tableStore.selectedRows > 0 &&
                tableStore.selectedRows < store.orderedItems.length
              }
              checked={
                tableStore.selectedRows.length === store.orderedItems.length
              }
              onChange={tableStore.handleSelectAll}
            />
          </TableCell>
          {Object.keys(store.fields).map(item => {
            if (store.fields[item].tableVisible === false) {
              return null;
            }
            return (
              <TableCell
                key={store.fields[item].id}
                sortDirection={store.orderingDirection ? 'asc' : 'desc'}
              >
                <TableSortLabel
                  active={store.fieldSort === item}
                  onClick={() => tableStore.handleOrder(item)}
                  direction={store.orderingDirection ? 'asc' : 'desc'}
                >
                  {store.fields[item].label}
                </TableSortLabel>
              </TableCell>
            );
          })}
          <IfComponent condition={actions}>
            <TableCell>Actions</TableCell>
          </IfComponent>
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
