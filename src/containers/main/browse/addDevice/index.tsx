import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Platform,
  Alert,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { useShallowSelector } from '../../../../hooks';
import { useMutation } from '@apollo/react-hooks';
import BleManager, { Peripheral } from 'react-native-ble-manager';

import ActivityIndicator from '../../../../components/activityIndicator';
import Button from '../../../../components/buttons/button';

import { setBleManagerStarted } from '../../../../actions/connectivity';
import {
  requestCoarseLocationPermission,
  checkCoarseLocationPermission,
} from '../../../../utils/permissions';
import { isValidDevice } from '../../../../utils/validation';
import { GetDeviceDTO } from '../../../../dto/device';

import { UPSERT_DEVICE } from '../../../../requests/profileQL';
import log from '../../../../utils/log';
import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';

interface Route {
  params: {
    currentDevices: GetDeviceDTO[];
  };
}

interface Props {
  navigation: any;
  route: Route;
}

class DeviceAddListItem {
  device: Peripheral;
  canBeAdded: boolean;

  constructor(device: Peripheral, canBeAdded: boolean) {
    this.device = device;
    this.canBeAdded = canBeAdded;
  }
}

const BLE_SCAN_TIME = 15;
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function AddDeviceScreen(props: Props) {
  const { navigation } = props;
  const { currentDevices } = props.route.params;
  log.debug('AddDeviceScreen: received devices from use profile:', currentDevices);
  const dispatch = useDispatch();
  const { userId, bleManagerStarted: isBleManagerStarted } = useShallowSelector(
    ({ auth: { userId }, connectivity: { bleManagerStarted } }) => ({
      userId,
      bleManagerStarted,
    }),
  );
  const [bleManagerReady, setBleManagerReady] = useState(isBleManagerStarted);
  const [bluetoothOn, setBluetoothOn] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(Platform.OS === 'ios');
  const [scanInProgress, setScanInProgress] = useState(false);
  const init: DeviceAddListItem[] = [];
  const [availableDevices, setAvaliableDevices] = useState(init);
  const scannedDevices = useRef<Peripheral[]>([]);

  // addDevice mutation
  const [addDeviceQL, { loading: addingDevice }] = useMutation(UPSERT_DEVICE);

  useEffect(() => {
    // TODO: Bluetooth manager initialization should be moved to App.tsx? Also: global state listener?
    if (!bleManagerReady) {
      log.debug('BleManager not started yet. Starting...');
      BleManager.start({ showAlert: false })
        .then(() => {
          // Success code
          log.debug('BleManager started');
          setBleManagerReady(true);
          BleManager.checkState();
          dispatch(setBleManagerStarted(true));
        })
        .catch((error) => {
          log.error('Error initializing BleManager:', error);
        });
    } else {
      log.debug('BleManager already started');
    }
    // Ble events listeners
    const handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      onPeripheralDiscovered,
    );
    const handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      onPeripheralsScanStopped,
    );
    const handlerStateUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateState',
      onBleStateUpdated,
    );
    log.debug('check BLE permissions');
    if (Platform.OS === 'android') {
      checkCoarseLocationPermission()
        .then((value) => {
          log.debug('location permission result:', value);
          if (value) {
            log.debug('BLE permission already granted');
            setPermissionsGranted(true);
          }
        })
        .catch((error) => {
          log.debug('location permission error:', error);
        });
    }
    BleManager.checkState();
    return () => {
      log.debug('Clean up BLE listeners');
      handlerDiscover.remove();
      handlerStop.remove();
      handlerStateUpdate.remove();
    };
  }, []);

  const addDeviceToArray = (newDevice: Peripheral): void => {
    const array = scannedDevices.current;
    let device: Peripheral;
    for (device of array) {
      if (newDevice.id === device.id) {
        return;
      }
    }
    log.debug('Adding device to list:', newDevice);
    // TODO: need to add synchronization here! Otherwise we lose values sometimes
    scannedDevices.current.push(newDevice);
    log.debug('New devices list:', scannedDevices);
  };

  const isDeviceAlreadyAdded = (device: Peripheral) => {
    log.debug('new device isDeviceAlreadyAdded: ', device);
    log.debug('current devices: ', currentDevices);
    if (currentDevices) {
      for (let i = 0; i < currentDevices.length; i++) {
        log.debug(
          `new device id == ${device.id}', curDevice${i} == ${currentDevices[i].device_id}`,
        );
        if (currentDevices[i].device_id === device.id) {
          return true;
        }
      }
    }
    return false;
  };

  const setDevicesArray = (devices: Peripheral[]) => {
    setAvaliableDevices(
      devices
        // TODO: return proper filter after testing is over
        // .filter((value) => isValidDevice(value.name))
        .filter((value) => value.name)
        .map((value, index) => {
          return new DeviceAddListItem(value, !isDeviceAlreadyAdded(value));
        }),
    );
  };

  const getConnecteDevices = () => {
    log.debug('Getting connected BLE devices');
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
      log.debug('Connected peripherals: ', peripheralsArray);
      if (peripheralsArray.length > 0) {
        setDevicesArray(peripheralsArray);
      }
      setScanInProgress(false);
    });
    setScanInProgress(true);
  };

  const onBleStateUpdated = (bleState) => {
    log.debug('Ble state: ', bleState);
    if (bleState?.state) {
      bleState.state === 'on' ? setBluetoothOn(true) : setBluetoothOn(false);
    }
  };

  const onPeripheralDiscovered = (peripheral: Peripheral) => {
    if (peripheral && peripheral.name) {
      addDeviceToArray(peripheral);
    }
  };

  const onPeripheralsScanStopped = () => {
    log.debug('BLE scan is stopped');
    if (scannedDevices.current) {
      setDevicesArray(scannedDevices.current);
    }
    setScanInProgress(false);
  };

  const stopScan = () => {
    BleManager.stopScan().then(() => {
      setScanInProgress(false);
    });
  };

  const requestAndroidPermissions = () => {
    if (Platform.OS === 'android') {
      requestCoarseLocationPermission(
        () => {
          setPermissionsGranted(true);
        },
        (deniedResult) => {
          Alert.alert(
            'Error getting Bluetooth access',
            `Permission needed for Bluetooth was denied with status: ${deniedResult}`,
          );
        },
      );
    }
  };

  const startScan = () => {
    if (scannedDevices.current.length > 0) {
      scannedDevices.current.length = 0;
    }
    log.debug('Start scanning BLE');
    BleManager.scan([], BLE_SCAN_TIME).then(() => {
      log.debug('Scanning BLE...');
      setScanInProgress(true);
    });
  };

  const addDevice = (device: DeviceAddListItem) => {
    log.debug('Add device:', device.device);
    addDeviceQL({
      variables: {
        user_id: userId,
        device_name: device.device.name,
        device_id: device.device.id,
      },
    })
      .then((response) => {
        log.debug('Device was successfully added: ', response);
        Alert.alert('Device was successfully added');
        // disable add button for that item
        setAvaliableDevices(
          availableDevices.map((value, index) => {
            if (value.device.id === device.device.id) {
              value.canBeAdded = false;
            }
            return value;
          }),
        );
      })
      .catch((error) => {
        log.debug(`Error adding device: ${error.message}`);
        Alert.alert(`${error.message}`);
      });
  };

  const ListRow = ({ item }) => {
    return (
      <View style={styles.listRowContainer}>
        <Text style={styles.listRowText}>{item.device.name}</Text>
        <Button text="Add" disabled={!item.canBeAdded} onPress={() => addDevice(item)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.devicesList}
        data={availableDevices}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => <ListRow item={item} />}
        keyExtractor={(item, index) => item.device.id}
      />
      {scanInProgress && <ActivityIndicator size="large" style={styles.scanIndicator} />}
      {!permissionsGranted && (
        <Button
          text="Request permissions"
          disabled={permissionsGranted}
          onPress={requestAndroidPermissions}
        />
      )}

      {bluetoothOn ? (
        <>
          <Button
            text="Show connected devices"
            disabled={!bleManagerReady || !permissionsGranted || scanInProgress}
            onPress={getConnecteDevices}
          />
          <View style={styles.scanButtonsContainer}>
            <Button
              text="Start scan"
              disabled={!bleManagerReady || !permissionsGranted || scanInProgress}
              onPress={startScan}
            />
            <Button text="Stop scan" disabled={!scanInProgress} onPress={stopScan} />
          </View>
        </>
      ) : (
        <View style={styles.bluetoothOffContainer}>
          <Text style={styles.bluetoothOffText}>
            Bluetooth is off.{'\n'}Please turn on the Bluetooth to look for more devices
          </Text>
        </View>
      )}
    </View>
  );
}

export default AddDeviceScreen;
