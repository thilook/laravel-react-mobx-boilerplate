import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import TextField from './TextField';

@observer
class FormTemplate extends Component {


  selectFieldType(fieldName) {
    const { formStore } = this.props;
    const item = formStore.formInfo[fieldName];
    switch (item.type) {
    case 'string': {
      return (
        <TextField
          key={item.id}
          item={item}
          fieldName={fieldName}
          formStore={formStore}
        />
      );
    }
    default:
      return null;
    }
  }

  render() {
    const { children, formStore } = this.props;
    return(
      <form>
        {Object.keys(formStore.formInfo).map( item => this.selectFieldType(item))}
        {children}
      </form>
    );
  }
}

export default FormTemplate;