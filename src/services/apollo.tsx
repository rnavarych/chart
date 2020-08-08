import ApolloClient from 'apollo-boost';

import { BASE_URL } from '../configs';
import log from '../utils/log';

export const configureApollo = (store: any) => {
  return new ApolloClient({
    uri: BASE_URL,
    onError: (error) => log.debug('_APOLLO CLIENT ERROR_: ', error),
    request: (operation) => {
      log.debug('_APOLLO CLIENT REQUEST_: ', operation);
      operation.setContext({
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        },
      });
    },
  });
};
