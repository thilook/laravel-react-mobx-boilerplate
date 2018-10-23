import AuthStore from './AuthStore';
import CommonStore from './CommonStore';
import DrawerStore from './DrawerStore';
import UserStore from './UserStore';

const authStore = new AuthStore();
const commonStore = new CommonStore();
const drawerStore = new DrawerStore();
const userStore = new UserStore();

const customStores = {
  authStore,
  commonStore,
  drawerStore,
  userStore,
};

export default customStores;