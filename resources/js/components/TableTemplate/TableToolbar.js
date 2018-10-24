import React, { Component } from 'react';
import { observer } from 'mobx-react';

import {
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Toolbar,
  Typography,
} from '@material-ui/core';

// Import Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

@observer
class TableToolbar extends Component {
  render() {
    const { routing, store, t, tableStore } = this.props;
    return (
      <Toolbar disableGutters>
        {tableStore.selectedRows.length === 0 ? (
          <Grid
            container
            alignContent="flex-end"
            justify="flex-end"
            direction="row"
            spacing={0}
          >
            <FormControl>
              <Input
                onChange={tableStore.handleFilter}
                id="adornment-password"
                placeholder={t('common:forms.search')}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        ) : (
          <Grid container direction="row" spacing={0} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                {tableStore.selectedRows.length}{' '}
                {t('common:forms.selectedItems')}
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              {tableStore.selectedRows.length === 1 ? (
                <IconButton
                  aria-label="Edit"
                  onClick={() =>
                    routing.push(
                      `${store.routeFront}/edit/${
                        tableStore.selectedRows[0].id
                      }`
                    )
                  }
                >
                  <EditIcon />
                </IconButton>
              ) : null}
              <IconButton aria-label="Delete" onClick={tableStore.handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    );
  }
}

export default TableToolbar;
