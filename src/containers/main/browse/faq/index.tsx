import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface Props {
  navigation: any;
}

function FAQScreen(props: Props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>FAQ</Text>
    </View>
  );
}

export default FAQScreen;
