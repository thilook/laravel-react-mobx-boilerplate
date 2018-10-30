import AuthStore from './AuthStore';
import CommonStore from './CommonStore';
import DrawerStore from './DrawerStore';
import NotificationStore from './NotificationStore';
import PermissionStore from './PermissionStore';
import TableStore from './TableStore';
import UiStore from './UiStore';
import UserStore from './UserStore';

const authStore = new AuthStore();
const commonStore = new CommonStore();
const drawerStore = new DrawerStore();
const notificationStore = new NotificationStore();
const permissionStore = new PermissionStore();
const tableStore = new TableStore();
const uiStore = new UiStore();
const userStore = new UserStore();

const customStores = {
  authStore,
  commonStore,
  drawerStore,
  notificationStore,
  permissionStore,
  tableStore,
  uiStore,
  userStore,
};

export default customStores;
