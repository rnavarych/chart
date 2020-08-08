import React from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';

import styles from './styles';

type Props = {
  style?: ViewStyle;
  color?: string;
  size?: number | 'small' | 'large' | undefined;
};

const ActivityIndicatorDefault = (props: Props): JSX.Element => {
  const { style, color = styles.$DEFAULT_COLOR, size } = props;
  return <ActivityIndicator style={style} color={color} size={size} />;
};

export default ActivityIndicatorDefault;
