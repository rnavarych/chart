import { PermissionsAndroid, PermissionStatus } from 'react-native';
import log from './log';

export const checkCoarseLocationPermission = (): Promise<boolean> => {
  return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
};

export const requestCoarseLocationPermission = async (
  onGranted: () => void,
  onDenied?: (errorResult: PermissionStatus) => void,
) => {
  try {
    log.debug('requestFineLocation');
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location permission',
        message: 'CVS Health needs location permission to access Bluetooth devices',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      log.debug('BLE permission granted');
      onGranted();
    } else {
      log.debug('BLE permission denied:', result);
      if (onDenied) {
        onDenied(result);
      }
    }
  } catch (err) {
    console.warn(err);
  }
};
