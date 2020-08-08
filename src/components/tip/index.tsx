import React from 'react';
import { View, Image, ViewStyle, ImageSourcePropType } from 'react-native';

import Text from '../text';

import images from '../../configs/images';
import styles from './styles';

interface Props {
  text: string;
  imageSrc?: ImageSourcePropType;
  containerStyle?: ViewStyle;
  charPosition?: 'left' | 'right';
}

function Tip(props: Props): JSX.Element {
  const {
    text,
    imageSrc = images.lenaLogin,
    containerStyle,
    charPosition = 'left',
  } = props;
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { flexDirection: charPosition === 'right' ? 'row-reverse' : 'row' },
      ]}>
      <Image source={imageSrc} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default Tip;
