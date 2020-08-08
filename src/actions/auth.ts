import * as types from '../constants/actionTypes';

// WARNING: the action used for signing out the users from the app AND unlock the app right after that
// It's done because we always want to unlock the app when the user is being signed out.
export const signOut = () => ({
  type: types.SIGN_OUT,
});

export const signIn = (email: string) => ({
  type: types.SIGN_IN,
  email,
});

export const saveToken = (token: string) => ({
  type: types.SAVE_TOKEN,
  token,
});

export const saveUserId = (userId: string) => ({
  type: types.SAVE_USERID,
  userId,
});

// TODO: remove after verification flow changes
export const saveRegistrationEmail = (email: string) => ({
  type: types.SAVE_REGISTRATION_EMAIL,
  regEmail: email,
});
// TODO: remove after verification flow changes
export const deleteRegistrationEmail = () => ({
  type: types.DELETE_REGISTRATION_EMAIL,
});

export const credentialsSaved = () => ({
  type: types.CREDENTIALS_SAVED,
});

export const credentialsDeleted = () => ({
  type: types.CREDENTIALS_DELETED,
});
