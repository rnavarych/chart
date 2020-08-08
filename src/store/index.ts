import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import { persistStore, Persistor } from 'redux-persist';

import rootReducer from '../reducers';
import rudderEventTracker from './middleware/rudderTracker';
import createReduxLogger from './middleware/reduxLogger';
export const globalStore: { store?: Store } = {};

export const configureStore = (): { store: Store; persistor: Persistor } => {
  const middlewares: Middleware[] = [rudderEventTracker];
  if (__DEV__) {
    middlewares.push(createReduxLogger());
  }
  middlewares.push();
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  globalStore.store = store;
  const persistor = persistStore(store);
  return { store, persistor };
};
