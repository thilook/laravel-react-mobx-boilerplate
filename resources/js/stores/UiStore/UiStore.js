import { action, observable } from 'mobx';

class UiStore {
  @observable
  themeType = false;

  @action
  setThemeType = () => {
    this.themeType = !this.themeType;
  };
}

export default UiStore;
