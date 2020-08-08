import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Input from '../../inputNeomorph';

import styles from './styles';

interface InputishButtonProps {
  value: string;
  label: string;
  onPress: () => void;
}

const InputishButton = (props: InputishButtonProps) => {
  const { value, label, onPress } = props;
  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} {...{ onPress }}>
      <Input
        {...{ label }}
        disabled={true}
        text={value}
        onChange={() => {}}
        layoutType="full-line"
      />
    </TouchableOpacity>
  );
};

export default InputishButton;
