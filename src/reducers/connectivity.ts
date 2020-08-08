import { AnyAction } from 'redux';
import * as types from '../constants/actionTypes';

interface State {
  internetConnected: boolean;
  bleManagerStarted: boolean;
}

let initialState: State = {
  internetConnected: true,
  bleManagerStarted: false,
};

const connectivity = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.UPDATE_CONNECTIVITY: {
      return {
        ...state,
        internetConnected: action.internetConnected,
      };
    }

    case types.SET_BLE_MANAGER_STARTED: {
      return {
        ...state,
        bleManagerStarted: action.bleManagerStarted,
      };
    }

    default:
      return state;
  }
};

export default connectivity;
