import { action, observable } from 'mobx';
import { i18n, yup } from '../../config/MainConfigs';

import BaseStore from '../BaseStore';
import PermissionStore from '../PermissionStore';

class RoleStore extends BaseStore {
  @observable
  values;

  @observable
  formInfo;

  constructor() {
    super();
    // Table Fields
    this.fields = {
      id: { id: 1, label: 'Id', type: 'string' },
      name: { id: 2, label: 'Nome', type: 'string' },
    };

    // Backend Api route
    this.route = 'roles';
    // Frontend url
    this.routeFront = 'roles';
    // Title for Table and Form
    this.title = i18n.t('common:titles.roles'); // Title for table and Form
    // Form Validation Schema
    this.formValidation = yup.object().shape({
      name: yup.string().required(),
      permissions: yup.array().required(),
    });
    // Form Values and Settings
    this.initialize();
  }

  @action
  initialize() {
    // Form Values
    this.values = { name: '', permissions: [] };

    // Form Settings
    this.formInfo = {
      name: {
        id: 1,
        label: 'Name',
        type: 'string',
        variant: 'text',
        required: true,
      },
      permissions: {
        id: 2,
        label: 'Permissions',
        type: 'select',
        variant: 'multiple',
        relatedStore: new PermissionStore(),
        relatedPair: { value: 'id', label: 'name' },
        required: true,
      },
    };
  }
}

export default RoleStore;
