import { action, observable } from 'mobx';

class NotificationStore {
  @observable
  notificationSettings = {
    message: '',
    variant: 'warning',
  };

  @observable
  open = false;

  // Setters
  @action
  setNotificationSettings = obj => {
    this.notificationSettings = obj;
  };

  @action
  setOpen = open => {
    this.open = open;
  };
}

export default NotificationStore;
