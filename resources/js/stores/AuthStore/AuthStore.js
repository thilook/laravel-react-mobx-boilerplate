import { observable, action } from 'mobx';
import * as yup from 'yup';

// Import Helpers
import { RequestHelper } from '../../helpers';

// Import Stores
import CommonStore from '../CommonStore';
import UserStore from '../UserStore';

const commonStore = new CommonStore();
const userStore = new UserStore();

class AuthStore {
  @observable inProgress = false;

  @observable values = {
    email: '',
    password: '',
  };

  valuesValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  formInfo = {
    email: { id: 1, label: 'E-mail', type: 'string', variant: 'email', required: true },
    password: { id: 2, label: 'Password', type: 'string', variant: 'password', required: true }
  };

  @action setValue (option, value) {
    this.values[option] = value;
  };

  @action resetValues = () => {
    Object.keys(this.values).map( option => {
      this.values[option] = '';
      return null;
    })
  }


}

export default AuthStore;