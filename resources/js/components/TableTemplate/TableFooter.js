import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {
  Button,
  Grid,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
} from '@material-ui/core';

// Import Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

@observer
class TableFooterComponent extends Component {
  render() {
    const { store, tableStore } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TableCell colSpan={Object.keys(store.fields).length + 1}>
            <Grid container spacing={8} alignItems="center">
              <Grid item md={3}>
                <Typography variant="body1" style={{ color: '#949494' }}>
                  Página {tableStore.page} de{' '}
                  {tableStore.calcTotal(store.orderedItems.length)}
                </Typography>
              </Grid>
              <Grid item md={6} style={{ textAlign: 'center' }}>
                <Button
                  size="small"
                  disabled={tableStore.page === 1}
                  onClick={() => tableStore.handleChangePage(false, true)}
                >
                  <FirstPageIcon />
                </Button>
                <Button
                  size="small"
                  disabled={tableStore.page === 1}
                  onClick={() => tableStore.handleChangePage(false)}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  size="small"
                  disabled={
                    tableStore.page ===
                      tableStore.calcTotal(store.dataList.length) ||
                    tableStore.calcTotal(store.dataList.length) === 0
                  }
                  onClick={() => tableStore.handleChangePage(true)}
                >
                  <ChevronRightIcon />
                </Button>
                <Button
                  size="small"
                  disabled={
                    tableStore.page ===
                      tableStore.calcTotal(store.dataList.length) ||
                    tableStore.calcTotal(store.dataList.length) === 0
                  }
                  onClick={() => tableStore.handleChangePage(true, true)}
                >
                  <LastPageIcon />
                </Button>
              </Grid>
              <Grid item md={3} />
            </Grid>
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  }
}

export default TableFooterComponent;
