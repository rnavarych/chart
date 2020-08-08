import React, { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

// import Text from '../../text';

import NeomorphWrapper from '../../neomorphWrapper';

import Colors from '../../../configs/colors';
import styles from './styles';

interface RadioButtonProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
}

const RadioButton = (props: RadioButtonProps) => {
  const { title, onPress, isSelected } = props;
  const [pressedDown, setPressedDown] = useState(false);

  const onPressIn = useCallback(() => {
    setPressedDown(true);
  }, [setPressedDown]);

  const onPressOut = useCallback(() => {
    setPressedDown(false);
  }, [setPressedDown]);

  return (
    <TouchableOpacity
      {...{ onPress, onPressIn, onPressOut }}
      activeOpacity={1}
      delayLongPress={15000}
      style={styles.container}>
      <NeomorphWrapper
        inner={pressedDown}
        width={30}
        height={30}
        style={{ borderRadius: 15 }}>
        <View style={isSelected ? styles.selected : styles.notSelected}></View>
      </NeomorphWrapper>
      <Text
        style={[styles.label, { color: isSelected ? Colors.accent1 : Colors.black }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
