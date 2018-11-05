import React, { Component } from 'react';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import i18n from 'i18next';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';

// Import Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const DialogComponent = props => (
  <div>
    <Dialog
      open={props.isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.dialogClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {i18n.t('common:dialogs.confirmDeleteTitle')}
      </DialogTitle>
      <DialogContent />
      <DialogActions>
        <Button onClick={props.dialogClose} color="primary">
          {i18n.t('common:forms.cancel')}
        </Button>
        <Button onClick={props.onDelete} color="primary">
          {i18n.t('common:forms.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

@inject('notificationStore')
@observer
class TableToolbar extends Component {
  @observable
  isOpen = false;

  @action
  dialogClose = () => {
    this.isOpen = false;
  };

  @action
  dialogOpen = () => {
    this.isOpen = true;
  };

  @action
  delete = () => {
    const { notificationStore, tableStore } = this.props;
    this.dialogClose();
    Promise.all(tableStore.handleDelete())
      .then(() => {
        notificationStore.setNotificationSettings({
          message: `${i18n.t('common:notifications.deleteSuccess')}`,
          variant: 'success',
        });
        notificationStore.setOpen(true);
      })
      .catch(() => {
        notificationStore.setNotificationSettings({
          message: `${i18n.t('common:notifications.deleteError')}`,
          variant: 'error',
        });
        notificationStore.setOpen(true);
      });
  };

  render() {
    const { routing, store, t, tableStore } = this.props;
    return (
      <Toolbar disableGutters>
        <DialogComponent
          isOpen={this.isOpen}
          dialogClose={this.dialogClose}
          onDelete={this.delete}
        />
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
              <IconButton aria-label="Delete" onClick={this.dialogOpen}>
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
