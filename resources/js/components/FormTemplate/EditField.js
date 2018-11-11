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
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';

// Import Custom components
import { IfComponent } from '..';

// TODO add prop-types
@observer
class EditField extends Component {
  @observable
  isDisabled = true;

  constructor(props) {
    super(props);
    this.variant = props.item.variant;
  }

  handleValueChange = e => {
    const { fieldName, store } = this.props;
    store.setValue(fieldName, e.target.value);
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  toggleEdit = () => {
    this.isDisabled = !this.isDisabled;
  };

  render() {
    const { item, fieldName, store } = this.props;
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="role">
          {`${item.label} ${item.required ? '*' : ''}`}
        </InputLabel>
        <Input
          id={fieldName}
          disabled={item.editable || this.isDisabled}
          error={!!item.error}
          type={this.variant}
          value={store.values[fieldName] || ''}
          multiline={item.multiline || false}
          rows={item.multiline ? 4 : 1}
          onChange={this.handleValueChange}
          endAdornment={
            <IfComponent condition={item.editable === undefined}>
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.toggleEdit}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.isDisabled ? <EditIcon /> : <CheckIcon />}
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

export default EditField;
