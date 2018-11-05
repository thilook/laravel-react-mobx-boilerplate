import AuthStore from './AuthStore';
import CommonStore from './CommonStore';
import DrawerStore from './DrawerStore';
import InviteStore from './InviteStore';
import NotificationStore from './NotificationStore';
import PermissionStore from './PermissionStore';
import RoleStore from './RoleStore';
import TableStore from './TableStore';
import UiStore from './UiStore';
import UserListStore from './UserListStore';
import UserStore from './UserStore';

const authStore = new AuthStore();
const commonStore = new CommonStore();
const drawerStore = new DrawerStore();
const inviteStore = new InviteStore();
const notificationStore = new NotificationStore();
const permissionStore = new PermissionStore();
const roleStore = new RoleStore();
const tableStore = new TableStore();
const uiStore = new UiStore();
const userListStore = new UserListStore();
const userStore = new UserStore();

const customStores = {
  authStore,
  commonStore,
  drawerStore,
  inviteStore,
  notificationStore,
  permissionStore,
  roleStore,
  tableStore,
  uiStore,
  userListStore,
  userStore,
};

export default customStores;
