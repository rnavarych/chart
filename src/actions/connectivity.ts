import * as types from '../constants/actionTypes';

export const updateConnectivityAction = (internetConnected: boolean) => ({
  type: types.UPDATE_CONNECTIVITY,
  internetConnected,
});

export const setBleManagerStarted = (started: boolean) => ({
  type: types.SET_BLE_MANAGER_STARTED,
  bleManagerStarted: started,
});
