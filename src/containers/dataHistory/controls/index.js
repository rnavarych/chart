import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {CHART_TYPES, CHART_INTERVALS} from '../../../constants';

import styles from './styles';

export default ({interval, type, onTypeChange, onIntervalChange}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {CHART_INTERVALS.map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.intervalContainer,
              value === interval ? styles.containerSelected : null,
            ]}
            onPress={() => onIntervalChange(value)}>
            <Text
              style={[
                styles.text,
                value === interval ? styles.textSelected : null,
              ]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {CHART_TYPES.map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.typeContainer,
              value === type ? styles.containerSelected : null,
            ]}
            onPress={() => onTypeChange(value)}>
            <Text
              style={[
                styles.text,
                value === type ? styles.textSelected : null,
              ]}>
              {value
                .split('_')
                .map((str) => str.charAt(0))
                .join('')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
