import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Import custom components
import { Crud } from '../../components';

@inject('permissionStore')
@observer
class Permission extends Component {
  render() {
    const { match, permissionStore } = this.props;

    return <Crud store={permissionStore} match={match} />;
  }
}

export default Permission;
