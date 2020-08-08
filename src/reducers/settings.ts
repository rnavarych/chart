import { AnyAction } from 'redux';
import * as types from '../constants/actionTypes';

interface State {
  biometricsAvailable: boolean;
}

let initialState = {
  biometricsAvailable: false,
};

// TODO: maybe change naming? Settings is like something the user can set in the app (status maybe?)
const settings = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.UPDATE_BIOMETRICS_AVAILABILITY: {
      return {
        ...state,
        biometricsAvailable: action.isAvailable,
      };
    }

    default:
      return state;
  }
};

export default settings;
