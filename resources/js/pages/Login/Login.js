import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";

// Import Custom Components
import { FormTemplate, IfComponent } from '../../components';

// Import Styles
import styles from './styles';

@inject('authStore', 'routing', 'userStore')
@observer
class Login extends Component {

  handleSubmitForm = e => {
    const { authStore, routing, userStore } = this.props;
    e.preventDefault();
    authStore.login().then(() => routing.replace("/"));
  };

  render() {
    const { authStore, classes } = this.props;
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
              <Paper className={classes.paper} elevation={4} >
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
                  <Grid item style={{ textAlign: "center" }}>
                    <Typography variant="h5">
                      Entrar
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Para continuar em{" "}
                      {process.env.MIX_APP_NAME}
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
                          className={
                            classes.btnForget
                          }
                        >
                          Esqueceu a senha?
                        </Button>
                      </Grid>
                      <Grid item xs={6} className={classes.alignRight}>
                        <Button
                          onClick={this.handleSubmitForm}
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{
                            textTransform:
                              "none"
                          }}
                          disabled={
                            authStore.inProgress
                          }
                        >
                          Entrar
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

export default withStyles(styles) (Login);