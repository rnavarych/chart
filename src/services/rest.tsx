import { BASE_URL } from '../configs';
import { REQUEST_TIMEOUT } from '../configs';
import { globalStore } from '../store';
import { log } from '../utils';
import * as I18n from '../I18n';

const NO_CONTENT = 204;

const getToken = (): string | undefined => {
  let token;
  const store = globalStore.store;
  if (store) {
    token = store.getState().auth.token;
  }
  return token;
};

async function getFetchAction(endpoint: string, method: string, body?: any) {
  const headers: string[][] = [['Content-Type', 'application/json']];
  const token = getToken();
  if (token) {
    headers.push(['Authorization', `Bearer ${token}`]);
  }
  let request = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };
  let url = `${BASE_URL}${endpoint}`;
  log.debug('REQUEST Endpoint:', method, url);
  log.debug('REQUEST:', request);
  return fetch(url, request);
}

const timeoutAction = (reject: Function) =>
  setTimeout(() => reject(new Error('request timeout')), REQUEST_TIMEOUT);

export function callApi(endpoint: string, method: string, body?: any) {
  const internetConnected = globalStore.store?.getState().connectivity
    .internetConnected;
  log.debug('request: is internet connected: ', internetConnected);
  if (internetConnected) {
    return Promise.race([
      getFetchAction(endpoint, method, body),
      new Promise((resolve, reject) => timeoutAction(reject)),
    ])
      .then((response: any) => {
        log.debug('RESPONSE:', response);
        if (response.status === NO_CONTENT) {
          return { json: {}, response };
        }
        return response.json().then((json: any) => {
          return { json, response };
        });
      })
      .then(({ json, response }) => {
        log.debug('RESPONSE JSON:', json);
        if (!response.ok || !json) {
          json.code = response.status;
          return Promise.reject(json);
        }
        return json;
      });
  } else {
    return new Promise((resolve, reject) => {
      log.debug(`Trying to call ${endpoint} without Internet connection`);
      reject({
        title: I18n.strings('errors.error'),
        detail: I18n.strings('errors.noInternet.title'),
      });
    });
  }
}
