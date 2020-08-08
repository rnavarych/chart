import React from 'react';
import { Image, ViewStyle } from 'react-native';

import Text from '../../components/text';
import NeomorphWrapper from '../../components/neomorphWrapper';

import styles from './styles';
import images from '../../configs/images';

interface Props {
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}

const PointsCounter = (props: Props) => {
  const { containerStyle, contentStyle } = props;
  return (
    <NeomorphWrapper
      width={120}
      height={40}
      inner={true}
      style={{ ...styles.container, ...containerStyle }}
      contentContainerStyle={{ ...styles.contentContainer, ...contentStyle }}>
      <Image source={images.icTrophy} style={styles.icon} resizeMode="contain" />
      <Text style={styles.text}>12,3456</Text>
    </NeomorphWrapper>
  );
};

export default PointsCounter;
