import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { translate } from 'react-i18next';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import {
  Button,
  Grid,
  Paper,
  Table,
  Typography,
  withStyles,
} from '@material-ui/core';

// Import Icons
import AddIcon from '@material-ui/icons/Add';

// Import Custom components
import { IfComponent, Loading } from '..';

// Import Table Components
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';

// Import Style
import styles from './styles';
import TableContent from './TableContent';

@inject('routing', 'tableStore')
@observer
class TableTemplate extends Component {
  static propTypes = {
    disableAdd: PropTypes.bool,
    disableActions: PropTypes.bool,
  };

  static defaultProps = {
    disableAdd: false,
    disableActions: false,
  };

  componentDidMount() {
    const { store, tableStore } = this.props;
    tableStore.startLoading();
    store.list().then(() => {
      tableStore.setStore(store);
      tableStore.stopLoading();
    });
  }

  goToCreate = () => {
    const { routing, store } = this.props;
    routing.push(`/${store.routeFront}/add`);
  };

  render() {
    const { classes, disableAdd, store, t, tableStore } = this.props;

    if (tableStore.isLoading) {
      return <Loading />;
    }

    return (
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Typography variant="h5">{store.title}</Typography>
        </Grid>
        <Grid item xs={6} className={classes.buttonAddContainer}>
          <IfComponent condition={!disableAdd}>
            <Button size="large" variant="outlined" onClick={this.goToCreate}>
              <AddIcon className={classes.addIcon} />
              {t('common:forms.add')}
            </Button>
          </IfComponent>
        </Grid>
        <Grid item xs={12} className={classes.tableContainerStyle}>
          <Paper elevation={1} style={{ padding: 20 }}>
            <TableToolbar {...this.props} />
            <Table>
              <TableHeader {...this.props} />
              <TableContent {...this.props} />
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  translate('common'),
  withStyles(styles)
)(TableTemplate);
