import * as React from 'react';
import { Text, View, ViewStyle } from 'react-native';

import styles from './styles';

interface WidgetProps {
  title: string;
  value: string;
  style: ViewStyle;
}

const Widget = (props: WidgetProps) => {
  const { title, value, style } = props;
  return (
    <View style={[styles.container, style]}>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      <Text numberOfLines={1} style={styles.value}>{value}</Text>
    </View>
  );
};

export default Widget;
