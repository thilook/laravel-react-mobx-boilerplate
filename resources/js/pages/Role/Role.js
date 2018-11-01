import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// Import custom components
import { Crud } from '../../components';

@inject('roleStore')
@observer
class Role extends Component {
  render() {
    const { roleStore } = this.props;
    return <Crud store={roleStore} />;
  }
}

export default Role;
