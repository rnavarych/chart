import React from 'react';
import { View, Image, ViewStyle, ImageSourcePropType } from 'react-native';

import Text from '../text';

import styles from './styles';

interface Props {
  label: string;
  counter: string | number;
  image: ImageSourcePropType;
  containerStyle?: ViewStyle;
}

function RewardBadge(props: Props): JSX.Element {
  const { label, counter, image: imageSrc, containerStyle } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.counterOuterBorder}>
        <View style={styles.counterContainer}>
          <Text style={styles.counter}>{counter}</Text>
        </View>
      </View>
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

export default RewardBadge;
