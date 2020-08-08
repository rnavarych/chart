import { createLogger } from 'redux-logger';

import * as types from '../../constants/actionTypes';

const createReduxLogger = () => {
  return createLogger({
    // logger skips the action if we return false from predicate
    predicate: (getState, action) => {
      switch (action.type) {
        // TODO: add cases here to filter out other actions
        case types.UPDATE_USER_LAST_ACTIVITY_DATE:
          return false;
        default:
          return true;
      }
    },
  });
};

export default createReduxLogger;
