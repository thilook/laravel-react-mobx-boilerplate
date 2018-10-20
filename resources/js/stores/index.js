import AuthStore from './AuthStore';
import DrawerStore from './DrawerStore';
import UserStore from './UserStore';

const authStore = new AuthStore();
const drawerStore = new DrawerStore();
const userStore = new UserStore();

const customStores = {
  authStore,
  drawerStore,
  userStore,
};

export default customStores;