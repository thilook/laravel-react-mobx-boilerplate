import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Import custom components
import { Crud } from '../../components';

@inject('userListStore')
@observer
class User extends Component {
  render() {
    const { userListStore } = this.props;
    return <Crud store={userListStore} />;
  }
}

export default User;
