import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

// Import components
import { Drawer, Loading } from './components';

// Import Routes
import { protectedRoutes, publicRoutes } from "./pages/routes";


@inject('commonStore', 'userStore')
@observer
class App extends Component {

  componentDidMount() {
    const { commonStore, userStore } = this.props;
    if (commonStore.getToken) {
      userStore.pullUser()
        .finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }

  render() {
    const { commonStore, userStore } = this.props;

    if (!commonStore.appLoaded) {
      return <Loading/>;
    }

    if (userStore.currentUser) {
      return (
        <section>
          <Drawer />
          {protectedRoutes()}
        </section>
      );
    }
    return (
      <section>
        {publicRoutes()}
      </section>
    );
  }
}

const AppRouter = withRouter(App);
export default AppRouter;
