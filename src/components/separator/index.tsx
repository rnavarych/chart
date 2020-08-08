import React from 'react';
import { View, ViewStyle } from 'react-native';

import styles from './styles';

type Props = {
  style?: ViewStyle;
};

function Separator({ style }: Props): JSX.Element {
  return <View style={{ ...styles.separator, ...style }} />;
}

export default Separator;
