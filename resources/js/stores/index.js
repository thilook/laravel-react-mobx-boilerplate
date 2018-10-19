import DrawerStore from './DrawerStore';
import UserStore from './UserStore';

const drawerStore = new DrawerStore();
const userStore = new UserStore();

const customStores = {
  drawerStore,
  userStore,
};

export default customStores;