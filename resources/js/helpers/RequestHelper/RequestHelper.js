import axios from 'axios';

import StorageHelper from '../StorageHelper';


console.group = console.group || (() => {
});
console.groupEnd = console.groupEnd || (() => {
});

// Constants
const ROOT = process.env.MIX_APP_URL;
const API_ROOT = process.env.MIX_APP_API_URL;
const WEB_CLIENT_ID = process.env.MIX_WEB_CLIENT_ID;
const WEB_CLIENT = process.env.MIX_CLIENT_SECRET;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const axiosAuth = axios.create({
  baseUrl: ROOT,
  timeout: 5000,
  headers,
});

if (StorageHelper.localGetItem('token')){
  headers.Authorization = `Bearer ${StorageHelper.localGetItem('token')}`;
}

const axiosApi = axios.create({
  baseUrl: API_ROOT,
  timeout: 5000,
  headers,
});


class RequestHelper {

  preparePromise = ( call, resolve, reject ) =>
    call
      .then( response => {
        console.group(
          `Request ${response.config.method.toUpperCase()} SUCCESS on [${
            response.config.url
          }]:`
        );
        console.log("Raw Data", response);
        console.log("Data", response.data);
        console.log("HTTP Status", response.status);
        console.log("Success", response.ok);
        console.groupEnd();
        resolve(response.data);
      })
      .catch( error => {
        console.group(
          `Request ${response.config.method.toUpperCase()} ERROR on [${
            response.config.url
          }]:`
        );
        console.log("Raw Data", response);
        console.log("Data", response.data);
        console.log("HTTP Status", response.status);
        console.log("Success", response.ok);
        console.groupEnd();
        // const error = RequestErrorHelper.translateError(response);
        reject(error);
      });

  del = url =>
    new Promise((resolve, reject) =>
      this.preparePromise(axiosApi.delete(url), resolve, reject)
    );

  get = url =>
    new Promise((resolve, reject) =>
      this.preparePromise(axiosApi.get(url), resolve, reject)
    );

  post = (url, data) =>
    new Promise((resolve, reject) =>
      this.preparePromise(axiosApi.post(url, data), resolve, reject)
    );

  put = (url, data) =>
    new Promise((resolve, reject) =>
      this.preparePromise(axiosApi.put(url, data), resolve, reject)
    );

  login = (email, password) =>
    new Promise((resolve, reject) =>
      this.preparePromise(axiosAuth.post(
        "oauth/token", {
          grant_type: "password",
          client_id: WEB_CLIENT_ID,
          client_secret: WEB_CLIENT,
          username: email,
          password,
          scope: ""
        }),
      resolve,
      reject
      ));

}
