import { observable } from 'mobx';
import { i18n } from '../../config/MainConfigs';

import BaseStore from '../BaseStore';

class PermissionStore extends BaseStore {
  // General Settings
  route = 'permissions';

  @observable
  inProgress = false;

  // Backend Api route
  routeFront = 'permissions';

  // Frontend url
  title = i18n.t('common:titles.permission'); // Title for table and Form
  // End General Settings

  @observable
  dataList = [];

  @observable
  values = {
    name: '',
  };

  // Table Settings
  @observable
  orderingDirection = true;

  @observable
  fieldSort = 'name';

  @observable
  filter = '';

  fields = {
    id: { id: 1, label: 'Id', type: 'string' },
    name: { id: 2, label: 'Nome', type: 'string' },
  };
  // End Table Settings

  // Form Settings
  @observable
  formInfo = {
    name: {
      id: 1,
      label: 'E-mail',
      type: 'string',
      variant: 'text',
      required: true,
    },
  };
  // End Form Settings
}

export default PermissionStore;
