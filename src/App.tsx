import React, { useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { ApolloProvider } from '@apollo/react-hooks';
import codePush from 'react-native-code-push';
import ReactNativeBiometrics from 'react-native-biometrics';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

import { configureStore } from './store';
import { configureApollo } from './services/apollo';
import PushNotificationManager from './services/push';
import { updateBiometricsAvailability } from './actions/settings';
import rudderClient, {
  RUDDER_LOG_LEVEL,
} from '@rudderstack/rudder-sdk-react-native';

import AppStateTracker from './services/appstate';
import InactivityTracker from './services/inactivity';
import Navigation from './nav';
import { log } from './utils';
import { updateConnectivityAction } from './actions/connectivity';
import './configs/stylesheet';

interface BiometricsResultObject {
  available: boolean;
  biometryType?: string;
  error?: string;
}

const { store, persistor } = configureStore();

const apolloClient = configureApollo(store);

// RudderStack initialization
(async function () {
  // initialization
  /* TODO: replace Config.RUDDER_DATA_PLANE_URL and Config.RUDDER_WRITE_KEY
     in envs to proper ones when server is ready */
  const config = {
    dataPlaneUrl: Config.RUDDER_DATA_PLANE_URL,
    trackAppLifecycleEvents: true,
    logLevel: RUDDER_LOG_LEVEL.WARN,
  };
  log.debug('RUDDERSTACK Initialization:', config);
  await rudderClient.setup(Config.RUDDER_WRITE_KEY, config);
  // additional identification
  // TODO: replace with proper data
  const deviceUniqueId = DeviceInfo.getUniqueId();
  const idParams = { stubExtraId: 'extraId' };
  log.debug('RUDDERSTACK Identify:', deviceUniqueId, idParams);
  await rudderClient.identify(
    deviceUniqueId ? deviceUniqueId : 'testUser_no_deviceId',
    idParams,
  );
})();

const App = (): JSX.Element => {
  const dispatch = store.dispatch;

  useEffect(() => {
    SplashScreen.hide();

    ReactNativeBiometrics.isSensorAvailable().then(
      (resultObject: BiometricsResultObject) => {
        const { available, error } = resultObject;
        error && Alert.alert(error);
        dispatch(updateBiometricsAvailability(available));
      },
    );
  }, []);

  // network state callback
  const onNetworkStateChange = useCallback((networkState: NetInfoState) => {
    const prevInternetState = store.getState()?.connectivity.internetConnected;
    log.trace('Network state', networkState);
    log.trace('Old internetConnected state === ', prevInternetState);
    const isInternetReachable = networkState?.isInternetReachable;
    if (
      isInternetReachable !== null &&
      isInternetReachable !== undefined &&
      isInternetReachable !== prevInternetState
    ) {
      store.dispatch(updateConnectivityAction(isInternetReachable));
    }
  }, []);

  // network state subcription
  useEffect(() => {
    // Subscribe
    log.debug('Subscribe to network state events');
    const unsubscribeFunction = NetInfo.addEventListener(onNetworkStateChange);
    // return cleanup function
    return () => {
      log.debug('Unsubscribe from network state events');
      unsubscribeFunction();
    };
  }, [onNetworkStateChange]);

  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PushNotificationManager>
            <PersistGate loading={null} persistor={persistor}>
              <AppStateTracker>
                <InactivityTracker>
                  <Navigation />
                </InactivityTracker>
              </AppStateTracker>
            </PersistGate>
          </PushNotificationManager>
        </Provider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default codePush()(App);
