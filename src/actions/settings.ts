import * as types from '../constants/actionTypes';

export const updateBiometricsAvailability = (isAvailable: boolean) => ({
  type: types.UPDATE_BIOMETRICS_AVAILABILITY,
  isAvailable
});
