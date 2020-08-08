import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';

import ActivityIndicator from '../../activityIndicator';

import styles from './styles';

interface Props {
  fetching?: boolean;
  disabled?: boolean;
  text: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

// TODO: delete when not needed
function Button(props: Props): JSX.Element {
  const { fetching = false, text, onPress, containerStyle, disabled = false } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={fetching ? () => {} : onPress}
      style={[styles.container, containerStyle, disabled && { backgroundColor: 'grey' }]}>
      {fetching ? <ActivityIndicator /> : <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
}

export default Button;
