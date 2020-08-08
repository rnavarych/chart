import { AnyAction } from 'redux';
import * as types from '../constants/actionTypes';

interface State {
  signedIn: boolean;

  token: string | null;
  userId: string | null;
  email: string | null;

  credentialsSaved: boolean;
}

let initialState = {
  signedIn: false,

  token: null,
  userId: null,
  email: null,

  credentialsSaved: false,
};

const auth = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.SIGN_IN: {
      return {
        ...state,
        signedIn: true,
        email: action.email,
      };
    }

    case types.SIGN_OUT:
      return {
        ...state,
        signedIn: false,
        token: null,
        userId: null,
        email: null,
      };

    case types.SAVE_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case types.SAVE_USERID:
      return {
        ...state,
        userId: action.userId,
      };

    case types.CREDENTIALS_SAVED:
      return {
        ...state,
        credentialsSaved: true,
      };

    case types.CREDENTIALS_DELETED:
      return {
        ...state,
        credentialsSaved: false,
      };
    // TODO: remove after verification flow changes
    case types.SAVE_REGISTRATION_EMAIL:
      return {
        ...state,
        regEmail: action.regEmail,
      };
    // TODO: remove after verification flow changes
    case types.DELETE_REGISTRATION_EMAIL:
      return {
        ...state,
        regEmail: null,
      };

    default:
      return state;
  }
};

export default auth;
