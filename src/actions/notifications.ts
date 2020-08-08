import * as types from '../constants/actionTypes';
import { MainNotification } from 'src/interfaces/entities';

export const addMainNotification = (notification: MainNotification) => ({
  type: types.ADD_MAIN_NOTIFICATION,
  notification,
});

export const eraseMainNotification = () => ({
  type: types.ERASE_MAIN_NOTIFICATION,
});
