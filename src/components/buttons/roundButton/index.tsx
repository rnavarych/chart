import React, { useCallback, useState } from 'react';
import { Image, View, TouchableOpacity, ViewStyle } from 'react-native';

import * as Animatable from 'react-native-animatable';
import NeomorphWrapper from '../../neomorphWrapper';

import styles from './styles';
import images from '../../../configs/images';

interface RoundButtonProps {
  containerStyle: ViewStyle;
  onPress: () => void;
  animated: boolean;
}

const RoundButton = (props: RoundButtonProps) => {
  const { containerStyle, onPress, animated } = props;
  const [pressedDown, setPressedDown] = useState(false);

  const onPressIn = useCallback(() => {
    setPressedDown(true);
  }, [setPressedDown]);

  const onPressOut = useCallback(() => {
    setPressedDown(false);
  }, [setPressedDown]);

  return (
    <Animatable.View
      animation={animated ? 'pulse' : undefined}
      useNativeDriver={true}
      duration={800}
      iterationCount="infinite"
      style={[styles.container, containerStyle]}>
      <NeomorphWrapper
        width={60}
        height={60}
        style={styles.shadowWrapper}
        inner={pressedDown}>
        <TouchableOpacity
          activeOpacity={1}
          {...{ onPress, onPressIn, onPressOut }}
          style={[styles.button]}>
          <Image source={images.plus} style={styles.icon} />
        </TouchableOpacity>
      </NeomorphWrapper>
    </Animatable.View>
  );
};

export default RoundButton;
