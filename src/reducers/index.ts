import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

import auth from './auth';
import settings from './settings';
import app from './app';
import connectivity from './connectivity';
import wheel from './wheel';
import notifications from './notifications';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['onStartShouldBlockCheckCompleted', 'timeSection'],
};

const wheelPersistConfig = {
  key: 'wheel',
  storage: AsyncStorage,
};

export default combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  settings,
  app: persistReducer(appPersistConfig, app),
  connectivity,
  wheel: persistReducer(wheelPersistConfig, wheel),
  notifications,
});
