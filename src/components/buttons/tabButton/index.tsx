import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import Text from '../../text';
import NeomorphWrapper from '../../neomorphWrapper';

import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';

interface TabIconOptions {
  focused: boolean;
  color: string;
  size: number;
}

const TAB_BUTTON_HEIGHT = 50;

const TabButton = (
  props: TabIconOptions,
  label: string,
  icon: ImageSourcePropType,
  iconSelected: ImageSourcePropType,
) => {
  return (
    <NeomorphWrapper
      width={TAB_BUTTON_HEIGHT}
      height={TAB_BUTTON_HEIGHT}
      inner={props.focused}>
      <Image source={props.focused ? iconSelected : icon} style={styles.icon} />
      <Text
        style={{
          ...styles.text,
          color: EStyleSheet.value(props.focused ? '$textAccent' : '$textPrimary'),
        }}>
        {label}
      </Text>
    </NeomorphWrapper>
  );
};

export default TabButton;
