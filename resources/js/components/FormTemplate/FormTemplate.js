/* eslint-disable indent */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { translate } from 'react-i18next';
import { Button, Grid } from '@material-ui/core';

// Import Field Types
import SelectField from './SelectField';
import TextField from './TextField';

@inject('routing', 'notificationStore')
@observer
class FormTemplate extends Component {
  static propTypes = {
    addButtons: PropTypes.bool,
  };

  static defaultProps = {
    addButtons: false,
  };

  goBack = () => {
    const { routing } = this.props;
    routing.goBack();
  };

  handleSubmitAdd = e => {
    const { notificationStore, store, t } = this.props;
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
    const { addButtons, children, store, t } = this.props;
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
              onClick={this.handleSubmitAdd}
              variant="contained"
              color="primary"
              type="submit"
              style={{
                textTransform: 'none',
              }}
              disabled={store.inProgress}
            >
              {t('common:forms.save')}
            </Button>
          </Grid>
        </Grid>
      );
    }
    return children;
  }

  render() {
    const { store } = this.props;
    return (
      <form>
        {Object.keys(store.formInfo).map(item => this.selectFieldType(item))}
        {this.renderDefaultButtons()}
      </form>
    );
  }
}

export default compose(translate('common'))(FormTemplate);
