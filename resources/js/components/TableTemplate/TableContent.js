import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Checkbox, TableCell, TableBody, TableRow } from '@material-ui/core';

@observer
class TableContent extends Component {
  render() {
    const { classes, disableActions, store, tableStore } = this.props;
    if (store.orderedItems.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell colSpan={Object.keys(store.fields).length + 1}>
              Não há itens
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return (
      <TableBody>
        {_.slice(store.orderedItems, this.min, this.max).map(row => (
          <TableRow
            hover
            onClick={event => tableStore.handleClick(event, row)}
            role={!disableActions ? '' : 'checkbox'}
            aria-checked={_.includes(tableStore.selectedRows, row)}
            tabIndex={-1}
            key={row.id}
            selected={_.includes(tableStore.selectedRows, row)}
            className={classes.tableRow}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={_.includes(tableStore.selectedRows, row)} />
            </TableCell>
            {Object.keys(store.fields).map(col => {
              if (store.fields[col].tableVisible === false) {
                return null;
              }
              if (
                store.fields[col].type === 'model' ||
                store.fields[col].type === 'modelAutoComplete'
              ) {
                return (
                  <TableCell key={store.fields[col].id}>
                    {
                      row[store.fields[col].relationName][
                        store.fields[col].displayField
                      ]
                    }
                  </TableCell>
                );
              }
              return (
                <TableCell key={store.fields[col].id}>{row[col]}</TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

export default TableContent;
