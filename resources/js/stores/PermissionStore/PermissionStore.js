import { action, observable } from 'mobx';
import { i18n, yup } from '../../config/MainConfigs';

import BaseStore from '../BaseStore';

class PermissionStore extends BaseStore {
  @observable
  values;

  @observable
  formInfo;

  constructor() {
    super();
    // Table Fields
    this.fields = {
      name: { id: 2, label: 'Nome', type: 'string' },
    };

    this.fieldSort = 'name';

    // Backend Api route
    this.route = 'permissions';
    // Frontend url
    this.routeFront = 'permissions';
    // Title for Table and Form
    this.title = i18n.t('common:titles.permissions'); // Title for table and Form
    // Form Validation Schema
    this.formValidation = yup.object().shape({
      name: yup.string().required(),
    });
    // Form Values and Settings
    this.initialize();
  }

  @action
  initialize() {
    // Form Values
    this.values = { name: '' };

    // Form Settings
    this.formInfo = {
      name: {
        id: 1,
        label: 'Name',
        type: 'string',
        variant: 'text',
        required: true,
      },
    };
  }
}

export default PermissionStore;
