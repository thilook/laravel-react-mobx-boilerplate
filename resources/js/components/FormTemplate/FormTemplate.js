/* eslint-disable indent */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { translate } from 'react-i18next';
import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core';

// Import Field Types
import SelectField from './SelectField';
import TextField from './TextField';

// Import styles
import styles from './styles';

@inject('routing', 'notificationStore')
@observer
class FormTemplate extends Component {
  static propTypes = {
    addButtons: PropTypes.bool,
    basicLayout: PropTypes.bool,
    id: PropTypes.string,
  };

  static defaultProps = {
    addButtons: false,
    basicLayout: true,
    id: null,
  };

  componentDidMount() {
    const { id, store } = this.props;
    if (id) {
      store.detail(id);
    }
  }

  goBack = () => {
    const { routing, store } = this.props;
    store.resetValues();
    routing.goBack();
  };

  handleSubmitAdd = e => {
    const { notificationStore, routing, store, t } = this.props;
    e.preventDefault();
    store
      .add(store.values)
      .then(res => {
        if (res.success) {
          notificationStore.setNotificationSettings({
            message: `${store.title} ${t(
              'common:notifications.createSuccess'
            )}`,
            variant: 'success',
          });
          notificationStore.setOpen(true);
          routing.goBack();
        } else if (!res.success && !res.name) {
          notificationStore.setNotificationSettings({
            message: `${store.title} ${t(
              'common:notifications.createError'
            )} - ${res.message}`,
            variant: 'error',
          });
          notificationStore.setOpen(true);
        }
      })
      .catch(err => {
        console.log('error', err);
        notificationStore.setNotificationSettings({
          message: `${store.title} ${t('common:notifications.createError')}`,
          variant: 'error',
        });
        notificationStore.setOpen(true);
      });
  };

  handleSubmitUpdate = e => {
    const { id, notificationStore, routing, store, t } = this.props;
    e.preventDefault();
    store
      .update(id, store.values)
      .then(res => {
        if (res.success) {
          notificationStore.setNotificationSettings({
            message: `${store.title} ${t(
              'common:notifications.updateSuccess'
            )}`,
            variant: 'success',
          });
          notificationStore.setOpen(true);
          routing.goBack();
        } else if (!res.success && !res.name) {
          notificationStore.setNotificationSettings({
            message: `${store.title} ${t(
              'common:notifications.updateError'
            )} - ${res.message}`,
            variant: 'error',
          });
          notificationStore.setOpen(true);
        }
      })
      .catch(err => {
        console.log('error', err);
        notificationStore.setNotificationSettings({
          message: `${store.title} ${t('common:notifications.updateError')}`,
          variant: 'error',
        });
        notificationStore.setOpen(true);
      });
  };

  selectFieldType(fieldName) {
    const { store } = this.props;
    const item = store.formInfo[fieldName];
    switch (item.type) {
      case 'string': {
        return (
          <TextField
            key={item.id}
            item={item}
            fieldName={fieldName}
            store={store}
          />
        );
      }
      case 'select': {
        return (
          <SelectField
            key={item.id}
            item={item}
            fieldName={fieldName}
            store={store}
          />
        );
      }
      default:
        return null;
    }
  }

  renderDefaultButtons() {
    const { addButtons, children, id, store, t } = this.props;
    if (addButtons) {
      return (
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={6}>
            <Button
              onClick={this.goBack}
              size="small"
              color="primary"
              variant="text"
              disableFocusRipple
              disableRipple
            >
              {t('common:forms.cancel')}
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button
              onClick={id ? this.handleSubmitUpdate : this.handleSubmitAdd}
              variant="contained"
              color="primary"
              type="submit"
              style={{
                textTransform: 'none',
              }}
              disabled={store.inProgress}
            >
              {id ? t('common:forms.update') : t('common:forms.save')}
            </Button>
          </Grid>
        </Grid>
      );
    }
    return children;
  }

  render() {
    const { basicLayout, classes, store } = this.props;

    if (basicLayout) {
      return (
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="h5">{store.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {Object.keys(store.formInfo).map(item =>
                this.selectFieldType(item)
              )}
              {this.renderDefaultButtons()}
            </Paper>
          </Grid>
        </Grid>
      );
    }

    return (
      <form>
        {Object.keys(store.formInfo).map(item => this.selectFieldType(item))}
        {this.renderDefaultButtons()}
      </form>
    );
  }
}

export default compose(
  translate('common'),
  withStyles(styles)
)(FormTemplate);
