import React, { useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';

import Colors from '../../../../configs/colors';
import images from '../../../../configs/images';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import styles from './styles';
import log from '../../../../utils/log';
import * as I18n from '../../../../I18n';

import SwipeableRow from '../../../../components/swipeableRow';
import Separator from '../../../../components/separator';

import { GetDeviceDTO } from '../../../../dto/device';

export interface Props {
  devicesData: GetDeviceDTO[];
  onRemoveHandler: (item, index) => void;
}

function DevicesList(props: Props): JSX.Element {
  const { devicesData, onRemoveHandler } = props;

  const onRemoveDevicePressed = (itemToRemove, index) => {
    Alert.alert(
      I18n.strings('screens.devices.removeDialog.title'),
      I18n.strings('screens.devices.removeDialog.text'),
      [
        { text: I18n.strings('buttons.cancel'), onPress: () => {} },
        {
          text: I18n.strings('buttons.confirm'),
          style: 'destructive',
          onPress: () => onRemoveHandler(itemToRemove, index),
        },
      ],
      { cancelable: true },
    );
  };

  const ListRow = ({ item, index }) => {
    return (
      <SwipeableRow
        actionName="Remove"
        actionColor={Colors.accent1}
        onActionPressed={() => onRemoveDevicePressed(item, index)}>
        <RectButton style={styles.rectButton}>
          <Text style={styles.rowText}>{item.device_name}</Text>
          <Image source={images.arrowRightBrowse} style={styles.icon} />
        </RectButton>
      </SwipeableRow>
    );
  };

  return (
    <View style={styles.devicesListInnerContainer}>
      <FlatList
        data={devicesData}
        ItemSeparatorComponent={() => <Separator style={styles.separator} />}
        renderItem={({ item, index }) => <ListRow item={item} index={index} />}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
}

export default DevicesList;
