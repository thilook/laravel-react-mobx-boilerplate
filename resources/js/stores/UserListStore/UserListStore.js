import { action, observable } from 'mobx';
import { i18n, yup } from '../../config/MainConfigs';

import BaseStore from '../BaseStore';
import RoleStore from '../RoleStore';

class UserListStore extends BaseStore {
  @observable
  values;

  @observable
  formInfo;

  constructor() {
    super();
    // Table Fields
    this.fields = {
      name: { id: 2, label: 'Nome', type: 'string' },
      email: { id: 3, label: 'Email', type: 'string' },
      roles: { id: 4, label: 'Roles', type: 'array', fieldDisplay: 'name' },
    };

    // Backend Api route
    this.route = 'users';
    // Frontend url
    this.routeFront = 'users';
    // Title for Table and Form
    this.title = i18n.t('common:titles.users'); // Title for table and Form
    // Form Validation Schema
    this.formValidation = yup.object().shape({
      name: yup.string().required(),
      roles: yup.array().required(),
    });
    // Form Values and Settings
    this.initialize();
  }

  @action
  initialize() {
    // Form Values
    this.values = { name: '', email: '', roles: [] };

    // Form Settings
    this.formInfo = {
      name: {
        id: 1,
        label: 'Name',
        type: 'string',
        variant: 'text',
        required: true,
      },
      email: {
        id: 2,
        label: 'Email',
        type: 'string',
        variant: 'email',
        required: true,
      },
      roles: {
        id: 3,
        label: 'Roles',
        type: 'select',
        variant: 'multiple',
        relatedStore: new RoleStore(),
        relatedPair: { value: 'id', label: 'name' },
        required: true,
      },
    };
  }
}

export default UserListStore;
