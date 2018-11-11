import { create } from 'apisauce';

import StorageHelper from '../StorageHelper';

console.group = console.group || (() => {});
console.groupEnd = console.groupEnd || (() => {});

// Constants
const ROOT = process.env.MIX_APP_URL;
const API_ROOT = process.env.MIX_APP_API_URL;
const WEB_CLIENT_ID = process.env.MIX_CLIENT_ID;
const WEB_CLIENT = process.env.MIX_CLIENT_SECRET;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content'),
};

const axiosAuth = create({
  baseUrl: ROOT,
  timeout: 25000,
  headers,
});

if (StorageHelper.localGetItem('token')) {
  headers.Authorization = `Bearer ${StorageHelper.localGetItem('token')}`;
}

const axiosApi = create({
  baseUrl: ROOT,
  timeout: 25000,
  headers,
});

const preparePromise = (call, resolve, reject, isAxios) => {
  if (StorageHelper.localGetItem('token')) {
    axiosApi.setHeader(
      'Authorization',
      `Bearer ${StorageHelper.localGetItem('token')}`
    );
  }
  return call
    .then(response => {
      if (response.ok || isAxios) {
        console.group(
          `Request ${response.config.method.toUpperCase()} SUCCESS on [${
            response.config.baseUrl
          }${response.config.url}]:`
        );
        console.log('Raw Data', response);
        console.log('Data', response.data);
        console.log('HTTP Status', response.status);
        console.log('Success', response.ok);
        console.groupEnd();
        resolve(response.data);
      } else {
        console.group(
          `Request ${response.config.method.toUpperCase()} ERROR on [${
            response.config.baseUrl
          }${response.config.url}]:`
        );
        console.log('Raw Data', response);
        console.log('Data', response.data);
        console.log('HTTP Status', response.status);
        console.log('Success', response.ok);
        console.groupEnd();
        // const error = RequestErrorHelper.translateError(response);
        reject(response.data);
      }
    })
    .catch(response => {
      console.group(
        `Request ${response.config.method.toUpperCase()} ERROR on [${
          response.config.baseUrl
        }${response.config.url}]:`
      );
      console.log('Raw Data', response);
      console.log('Data', response.data);
      console.log('HTTP Status', response.status);
      console.log('Success', response.ok);
      console.groupEnd();
      // const error = RequestErrorHelper.translateError(response);
      reject(response.data);
    });
};

const requests = {
  del: url =>
    new Promise((resolve, reject) =>
      preparePromise(axiosApi.delete(url), resolve, reject)
    ),

  get: url =>
    new Promise((resolve, reject) =>
      preparePromise(
        axiosApi.get(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${StorageHelper.localGetItem('token')}`,
            },
          }
        ),
        resolve,
        reject
      )
    ),

  post: (url, data) =>
    new Promise((resolve, reject) =>
      preparePromise(axiosApi.post(url, data), resolve, reject)
    ),

  put: (url, data) =>
    new Promise((resolve, reject) =>
      preparePromise(axiosApi.put(url, data), resolve, reject)
    ),
};

const auth = {
  login: (email, password) =>
    new Promise((resolve, reject) =>
      preparePromise(
        axiosAuth.post('/oauth/token', {
          grant_type: 'password',
          client_id: WEB_CLIENT_ID,
          client_secret: WEB_CLIENT,
          username: email,
          password,
          scope: '*',
        }),
        resolve,
        reject
      )
    ).then(
      res =>
        // axiosApi.setHeader('Authorization', `Bearer ${res.access_token}`)
        res
    ),

  getCurrentUser: () => requests.get('/api/user'),
};

export default { auth, requests };
