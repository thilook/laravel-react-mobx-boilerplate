class StorageHelper {

  // Local Storage
  static localSetItem = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
  };

  static localGetItem = (key) => JSON.parse(localStorage.getItem(key));

  static localRemoveItem = (key) => {
    localStorage.removeItem(key);
  };

  // Session Storage
  static sessionSetItem = (key, val) => {
    sessionStorage.setItem(key, JSON.stringify(val))
  };

  static sessionGetItem = (key) => JSON.parse(sessionStorage.getItem(key));

  static sessionRemoveItem = (key) => {
    sessionStorage.removeItem(key);
  }

}

export default StorageHelper;