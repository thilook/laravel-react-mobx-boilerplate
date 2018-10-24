import AuthStore from './AuthStore';
import CommonStore from './CommonStore';
import DrawerStore from './DrawerStore';
import UiStore from './UiStore';
import UserStore from './UserStore';

const authStore = new AuthStore();
const commonStore = new CommonStore();
const drawerStore = new DrawerStore();
const uiStore = new UiStore();
const userStore = new UserStore();

const customStores = {
  authStore,
  commonStore,
  drawerStore,
  uiStore,
  userStore,
};

export default customStores;
