import { AnyAction } from 'redux';
import * as types from '../constants/actionTypes';

import { MainNotification } from '../interfaces/entities';

interface State {
  main: MainNotification | null;
}

let initialState: State = {
  main: null,
};

const notifications = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.ADD_MAIN_NOTIFICATION: {
      return {
        ...state,
        main: action.notification,
      };
    }
    case types.ERASE_MAIN_NOTIFICATION: {
      return {
        ...state,
        main: null,
      };
    }
    default:
      return state;
  }
};

export default notifications;
