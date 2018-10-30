import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { compose } from 'recompose';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import { withStyles } from '@material-ui/core';

// Import components
import { AppBar, Drawer, Loading, Notification } from './components';

// Import Routes
import { protectedRoutes, publicRoutes } from './pages/routes';

// Import styles
import styles from './styles';

// TODO separate theme settings
// Theme Settings
const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
  // palette: {
  //   primary: {
  //     light: '#a7ffcd',
  //     main: '#74D29C',
  //     dark: '#41a16e',
  //   },
  //   secondary: {
  //     light: '#82e9de',
  //     main: '#4db6ac',
  //     dark: '#00867d',
  //   },
  // },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
  // palette: {
  //   primary: {
  //     light: '#a7ffcd',
  //     main: '#74D29C',
  //     dark: '#41a16e',
  //   },
  //   secondary: {
  //     light: '#82e9de',
  //     main: '#4db6ac',
  //     dark: '#00867d',
  //   },s
  // },
});

@inject('commonStore', 'drawerStore', 'uiStore', 'userStore')
@withRouter
@observer
class App extends Component {
  componentDidMount() {
    const { commonStore, i18n, userStore } = this.props;
    i18n.changeLanguage('pt');
    if (commonStore.getToken) {
      userStore.pullUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }

  render() {
    const {
      classes,
      commonStore,
      drawerStore,
      uiStore,
      userStore,
    } = this.props;

    if (!commonStore.appLoaded) {
      return <Loading />;
    }

    if (userStore.currentUser) {
      return (
        <MuiThemeProvider theme={!uiStore.themeType ? theme : darkTheme}>
          <Notification />
          <section>
            <AppBar />
            <Drawer />
            <main
              className={classNames(classes.content, classes['content-left'], {
                [classes.contentShift]: drawerStore.isOpen,
                [classes['contentShift-left']]: drawerStore.isOpen,
              })}
            >
              {protectedRoutes()}
            </main>
          </section>
        </MuiThemeProvider>
      );
    }
    return (
      <section>
        <Notification />
        {publicRoutes()}
      </section>
    );
  }
}

export default compose(
  translate('common'),
  withStyles(styles)
)(App);
