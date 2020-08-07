import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

function ChartDateSwitcher(props) {
  const {nextDate, prevDate, title, containerStyle } = props;

  const button = React.useCallback( (onPress) => (
    <TouchableOpacity
      style={ styles.button }
      activeOpacity={!!onPress ? 0.5 : 1}
      onPress={ onPress }
    />
  ), []);

  return (
    <View style={ containerStyle }>
      {button(prevDate)}
      <Text style={styles.description}>{title}</Text>
      {button(nextDate)}

    </View>
  );
}

export default ChartDateSwitcher;
