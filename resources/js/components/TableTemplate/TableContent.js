import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Checkbox, TableCell, TableBody, TableRow } from '@material-ui/core';

// Import Helper
import { FieldFormatHelper } from '../../helpers';

// Import Custom components
import { IfComponent } from '..';

@observer
class TableContent extends Component {
  // TODO create a separated component
  renderCells(row, col) {
    const { store } = this.props;
    if (store.fields[col].tableVisible === false) {
      return null;
    }

    switch (store.fields[col].type) {
      case 'array':
        return row[col].map(
          item => `${item[store.fields[col].fieldDisplay]} / `
        );
      case 'date':
        return FieldFormatHelper.dateFormat(row[col], 'MM/DD/YYYY');
      case 'model' || 'modelAutoComplete':
        return row[store.fields[col].relationName][
          store.fields[col].displayField
        ];
      default:
        return row[col];
    }
  }

  render() {
    const { actions, classes, disableActions, store, tableStore } = this.props;

    var Action = actions;

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
        {_.slice(store.orderedItems, tableStore.min, tableStore.max).map(
          row => (
            <TableRow
              hover
              onClick={event =>
                !actions ? tableStore.handleClick(event, row) : null
              }
              role={!disableActions ? '' : 'checkbox'}
              aria-checked={_.includes(tableStore.selectedRows, row)}
              tabIndex={-1}
              key={row.id}
              selected={_.includes(tableStore.selectedRows, row)}
              className={classes.tableRow}
            >
              <TableCell
                padding="checkbox"
                onClick={event =>
                  actions ? tableStore.handleClick(event, row) : null
                }
              >
                <Checkbox checked={_.includes(tableStore.selectedRows, row)} />
              </TableCell>
              {Object.keys(store.fields).map(col => (
                <TableCell key={store.fields[col].id}>
                  {this.renderCells(row, col)}
                </TableCell>
              ))}
              <IfComponent condition={actions}>
                <TableCell>
                  {actions ? React.cloneElement(actions, { row }) : null}
                </TableCell>
              </IfComponent>
            </TableRow>
          )
        )}
      </TableBody>
    );
  }
}

export default TableContent;
