import { observable, action, reaction } from 'mobx';

// Import Helpers
import { StorageHelper } from '../../helpers';

class CommonStore {
  @observable appName = 'Qccert';

  @observable token = StorageHelper.localGetItem('token');

  @observable appLoaded = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          StorageHelper.localSetItem('token', token);
        } else {
          StorageHelper.localRemoveItem('token');
        }
      }
    );
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

  @action getToken(){
    return this.token;
  }
}

export default CommonStore;
