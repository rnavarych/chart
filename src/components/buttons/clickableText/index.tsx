import React from 'react';
import { Text, ViewStyle } from 'react-native';

import styles from './styles';

interface Props {
  onPress: () => void;
  text: string;
  fetching?: boolean;
  style?: ViewStyle;
}

function ClickableText(props: Props): JSX.Element {
  const { onPress, fetching, text, style } = props;
  return (
    <Text style={[styles.text, style]} onPress={fetching ? () => {} : onPress}>
      {fetching ? 'Loading...' : text}
    </Text>
  );
}

export default ClickableText;
