import React, { useCallback, useState } from 'react';
import { View, Linking, Alert } from 'react-native';

import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useFocusEffect } from '@react-navigation/native';

import ActivityIndicator from '../../../../components/activityIndicator';
import DevicesList from './devicesList';
import Button from '../../../../components/buttons/button';

import { useShallowSelector } from '../../../../hooks';
import { GET_PROVISIONED_USER, PROVISION_USER } from '../../../../requests/deviceQL';
import { GET_DEVICES, DELETE_DEVICE } from '../../../../requests/profileQL';
import log from '../../../../utils/log';
import * as I18n from '../../../../I18n';
import * as routes from '../../../../nav/routes';
import { GetDeviceDTO } from '../../../../dto/device';

import styles from './styles';
import { ApolloError } from 'apollo-boost';

interface Props {
  navigation: any;
}

function DevicesScreen(props: Props) {
  const { navigation } = props;
  const { userId } = useShallowSelector(({ auth: { userId } }) => ({
    userId,
  }));
  const [devices, setDevices] = useState<GetDeviceDTO[]>([]);
  const [provisionedUserData, setProvisionedUserData] = useState<any>(null);

  // getDevices query
  const [loadDevicesQL, { loading: fetchingDevices }] = useLazyQuery(GET_DEVICES, {
    variables: { user_id: userId },
    fetchPolicy: 'no-cache',
    onCompleted: (devicesResult) => {
      log.debug('getDevices result: ', devicesResult);
      onDevicesLoaded(devicesResult);
    },
    onError: (error: ApolloError) => {
      log.debug('getDevices error:', error);
      Alert.alert('Error fetching devices:', error.message);
    },
  });

  // deleteDevice mutation
  const [deleteDeviceQL, { loading: loadingDeleteDevice }] = useMutation(DELETE_DEVICE);

  useFocusEffect(
    useCallback(() => {
      log.debug('fetching devices');
      loadDevicesQL();
      return () => {
        log.debug('Leaving devices screen');
      };
    }, [loadDevicesQL]),
  );

  const onDevicesLoaded = (devicesData) => {
    log.debug('Devices list loaded: ', devicesData.getDevices);
    setDevices(devicesData.getDevices);
  };

  const [getProvisionedUser, { loading: fetchingProvisionedUser }] = useLazyQuery(
    GET_PROVISIONED_USER,
    {
      variables: { user_id: userId },
      fetchPolicy: 'no-cache',
      onCompleted: (provisionedUserResult) => {
        log.debug('getProvisionedUser result: ', provisionedUserResult);
        setProvisionedUserData(provisionedUserResult);
      },
      onError: (error: ApolloError) => {
        log.debug('getProvisionedUser error:', error);
        Alert.alert('Error fetching provisioned user:', error.message);
      },
    },
  );

  const [provisionUser, { loading: inProgressProvisioningUser }] = useMutation(
    PROVISION_USER,
    {
      variables: { user_id: userId },
      onCompleted: (provisionUserResult) => {
        log.debug('provisionUser (for Validic) result: ', provisionUserResult);
        setProvisionedUserData(provisionUserResult);
      },
      onError: (error: ApolloError) => {
        log.debug('provisionUser (for Validic) error:', error);
        Alert.alert('Error provisioning user:', error.message);
      },
    },
  );

  const openMarketplace = useCallback(async (url: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      log.debug(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const onGetUserClicked = () => {
    getProvisionedUser();
  };

  const onProvisionUserClicked = () => {
    provisionUser();
  };

  const onOpenMarketplaceClick = () => {
    log.debug('Provisioned user data:', provisionedUserData);
    const url = provisionedUserData.getProvisionedUser.marketplace_url;
    if (url) {
      log.debug('url', url);
      openMarketplace(url);
    }
  };

  const onAddDevicePressed = () => {
    navigation.navigate(routes.ADD_DEVICE, { currentDevices: devices });
  };

  const removeDevice = (itemToRemove: GetDeviceDTO, index: number) => {
    log.debug('Remove device', index, itemToRemove);
    //TODO: we have to convert it here because getDevices returns string id, but deleteDevice expects int
    //TODO: poke Romi about that
    const idToRemove = parseInt(itemToRemove.id, 10);
    if (!isNaN(idToRemove)) {
      log.debug('Remove id', idToRemove);
      deleteDeviceQL({
        variables: { user_id: userId, id: idToRemove },
      })
        .then(() => {
          const filteredData = devices.filter((item) => item.id !== itemToRemove.id);
          setDevices(filteredData);
        })
        .catch((error) => Alert.alert(`${error.message}`));
    }
  };

  return (
    <View style={styles.container}>
      <DevicesList devicesData={devices} onRemoveHandler={removeDevice} />
      {(fetchingDevices || loadingDeleteDevice) && <ActivityIndicator />}
      <Button text={I18n.strings('buttons.deviceAdd')} onPress={onAddDevicePressed} />
      <View>
        <Button
          text="Provision user"
          onPress={onProvisionUserClicked}
          fetching={inProgressProvisioningUser}
        />
        <Button
          text="Get provisioned user"
          onPress={onGetUserClicked}
          fetching={fetchingProvisionedUser}
        />
        <Button
          text="Open marketplace"
          disabled={!provisionedUserData}
          onPress={onOpenMarketplaceClick}
        />
      </View>
    </View>
  );
}

export default DevicesScreen;
