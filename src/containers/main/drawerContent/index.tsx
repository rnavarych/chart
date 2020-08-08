import React from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../actions/auth';
import * as I18n from '../../../I18n';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const DrawerContent = (props: any) => {
  const dispatch = useDispatch();

  const showLogoutAlert = () =>
    Alert.alert(
      I18n.strings('logout.title'),
      I18n.strings('logout.description'),
      [
        { text: I18n.strings('buttons.cancel'), onPress: () => {} },
        {
          text: I18n.strings('buttons.confirm'),
          style: 'destructive',
          onPress: () => dispatch(signOut()),
        },
      ],
      { cancelable: true },
    );

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={I18n.strings('buttons.logout')}
        onPress={showLogoutAlert}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
