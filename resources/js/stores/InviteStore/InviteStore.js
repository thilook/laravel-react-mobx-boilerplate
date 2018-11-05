import { action, observable } from 'mobx';
import { i18n, yup } from '../../config/MainConfigs';

import BaseStore from '../BaseStore/BaseStore';

class InviteStore extends BaseStore {
  @observable
  values;

  @observable
  formInfo;

  constructor() {
    super();
    // Table Fields
    this.fields = {
      email: { id: 2, label: 'Email', type: 'string' },
      updated_at: { id: 3, label: 'Sent Date', type: 'date' },
      expires_at: { id: 4, label: 'Expiration Date', type: 'date' },
    };

    // Backend Api route
    this.route = 'users/invites';
    // Frontend url
    this.routeFront = 'users';
    // Title for Table and Form
    this.title = i18n.t('common:titles.users'); // Title for table and Form
    // Form Validation Schema
    this.formValidation = yup.object().shape({
      email: yup.string().required(),
    });
    // Form Values and Settings
    this.initialize();
  }

  @action
  initialize() {
    // Form Values
    this.values = { email: '' };

    // Form Settings
    this.formInfo = {
      email: {
        id: 1,
        label: 'Name',
        type: 'string',
        variant: 'text',
        required: true,
      },
    };
  }
}

export default InviteStore;
