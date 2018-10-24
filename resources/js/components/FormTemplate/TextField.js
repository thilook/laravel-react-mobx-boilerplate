import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';

// Import Icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Import Component
import IfComponent from '../IfComponent';

// TODO add prop-types
@observer
class Textitem extends Component {
  @observable
  variant = 'text';

  constructor(props) {
    super(props);
    this.variant = props.item.variant;
  }

  handleValueChange = e => {
    const { fieldName, formStore } = this.props;
    formStore.setValue(fieldName, e.target.value);
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  showPassword = () => {
    if (this.variant === 'password') {
      this.variant = 'text';
    } else {
      this.variant = 'password';
    }
  };

  render() {
    const { item, fieldName, formStore } = this.props;
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="role">
          {`${item.label} ${item.required ? '*' : ''}`}
        </InputLabel>
        <Input
          id={fieldName}
          disabled={item.disabled || false}
          error={item.error ? true : false}
          type={this.variant}
          value={formStore.values[fieldName] || ''}
          multiline={item.multiline || false}
          rows={item.multiline ? 4 : 1}
          onChange={this.handleValueChange}
          endAdornment={
            <IfComponent condition={item.variant === 'password'}>
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.showPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.variant !== 'password' ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            </IfComponent>
          }
        />
        <FormHelperText id="role-error-text">{item.error}</FormHelperText>
      </FormControl>
    );
  }
}

export default Textitem;
