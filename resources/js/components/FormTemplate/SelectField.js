/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import Select from 'react-select';
import {
  Chip,
  MenuItem,
  Paper,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';

// Import Icons
import CancelIcon from '@material-ui/icons/Cancel';

// Import Custom Components
import Loading from '../Loading';

// Import styles
import styles from './styles';

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      color="primary"
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

@observer
class SelectField extends Component {
  @observable
  suggestions = null;
  @observable
  isLoading = true;

  componentDidMount() {
    const { item } = this.props;
    item.relatedStore
      .list()
      .then(() => {
        this.suggestions = item.relatedStore.dataList.map(suggestion => ({
          value: suggestion.id,
          label: suggestion.name,
        }));
        this.isLoading = false;
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  handleChange = value => {
    const { fieldName, store } = this.props;
    store.setValue(fieldName, value);
  };

  render() {
    const { classes, fieldName, item, store, theme } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    if (this.isLoading) {
      return <Loading />;
    }

    return (
      <Select
        classes={classes}
        styles={selectStyles}
        textFieldProps={{
          label: `${item.label}`,
          InputLabelProps: {
            shrink: store.values[fieldName].length > 0,
          },
          disabled: item.disabled || false,
          error: item.error,
          required: item.required,
        }}
        options={this.suggestions}
        components={components}
        value={store.values[fieldName]}
        onChange={this.handleChange}
        placeholder=""
        isMulti
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(SelectField);
