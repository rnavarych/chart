import React from 'react';
import { View, Text } from 'react-native';

import RadioButton from '../radioButton';

import styles from './styles';

interface RadioButtonGroupProps {
  value: boolean;
  label: string;
  positiveTitle: string;
  negativeTitle: string;
  onChange: (value: boolean) => void;
}

// TODO: RENAME / ADAPT FOR OTHER VALUES MAYBE?
//  (not just true/false as it is now)
const RadioButtonGroup = (props: RadioButtonGroupProps) => {
  const { value, label, onChange, positiveTitle, negativeTitle } = props;
  return (
    <View>
      <Text style={{ fontSize: 14, paddingStart: 10, fontWeight: '500' }}>{label}</Text>
      <View style={{ paddingStart: 10 }}>
        <RadioButton
          isSelected={value}
          title={positiveTitle}
          onPress={() => onChange(true)}
        />
        <RadioButton
          isSelected={!value}
          title={negativeTitle}
          onPress={() => onChange(false)}
        />
      </View>
    </View>
  );
};

export default RadioButtonGroup;
