import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import {
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import { translate } from 'react-i18next';

// Import Custom Components
import { FormTemplate, IfComponent } from '../../components';

// Import Styles
import styles from './styles';

@inject('authStore', 'routing', 'uiStore', 'userStore')
@observer
class Login extends Component {
  handleSubmitForm = e => {
    const { authStore, routing, userStore } = this.props;
    e.preventDefault();
    authStore
      .login()
      .then(() => {
        userStore
          .pullUser()
          .then(() => routing.replace('/'))
          .catch(err => console.log('errPullUser', err));
      })
      .catch(err => console.log('erroLogin', err));
  };

  render() {
    const { authStore, classes, t, uiStore } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={0}
            className={classes.innerGrid}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={1} sm={2} md={3} lg={4} />
            <Grid item xs={10} sm={8} md={6} lg={4}>
              <IfComponent condition={authStore.inProgress}>
                <LinearProgress />
              </IfComponent>
              <Paper className={classes.paper} elevation={4}>
                <Grid
                  container
                  direction="column"
                  spacing={16}
                  alignItems="center"
                >
                  <Grid item>
                    <img
                      alt="logo"
                      src="https://via.placeholder.com/350x150"
                      width={150}
                    />
                  </Grid>
                  <Grid item style={{ textAlign: 'center' }}>
                    <Typography variant="h5">
                      {t('common:forms.enter')}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      {t('common:forms.continue')} {process.env.MIX_APP_NAME}
                    </Typography>
                  </Grid>
                  <FormTemplate formStore={authStore}>
                    <Grid container>
                      <Grid item xs={6} className={classes.alignLeft}>
                        <Button
                          size="small"
                          color="primary"
                          variant="text"
                          disableFocusRipple
                          disableRipple
                          className={classes.btnForget}
                        >
                          {t('common:forms.forgetPassword')}
                        </Button>
                      </Grid>
                      <Grid item xs={6} className={classes.alignRight}>
                        <Button
                          onClick={this.handleSubmitForm}
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{
                            textTransform: 'none',
                          }}
                          disabled={authStore.inProgress}
                        >
                          {t('common:forms.logIn')}
                        </Button>
                      </Grid>
                    </Grid>
                  </FormTemplate>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={1} sm={2} md={3} lg={4} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  withStyles(styles),
  translate('common')
)(Login);
