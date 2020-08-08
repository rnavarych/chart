import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface Props {
  navigation: any;
}

function GoalsScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>GoalsScreen</Text>
    </View>
  );
}

export default GoalsScreen;
