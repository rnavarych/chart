import React, { ReactNode } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

import styles from './styles';

type Props = {
  style?: TextStyle | TextStyle[];
  children?: ReactNode;
  props?: TextProps;
  numberOfLines?: number;
};

// TODO: apply global font-face later
function TextComponent({ style, children, numberOfLines }: Props): JSX.Element {
  return (
    <Text style={{ ...styles.mainStyle, ...style }} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export default TextComponent;
