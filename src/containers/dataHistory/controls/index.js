import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {CHART_TYPES, CHART_INTERVALS} from '../../../constants/charConst';

import styles from './styles';
import ChartButton from '../../../components/buttons/chartButton';

export const ControlsPanel = ({interval, type, onTypeChange, onIntervalChange}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {CHART_INTERVALS.map((value) => (
          <ChartButton
            focused={value === interval}
            label={value}
            width={60}
            height={40}
            containerStyle={{borderRadius: 10}}
            onPress={() => onIntervalChange(value)}
          />
        ))}
      </View>
      <View style={styles.row}>
        {CHART_TYPES.map((value) => (
          <ChartButton
            icon={value.icon}
            iconSize={18}
            focused={value.type === type}
            width={38}
            height={38}
            containerStyle={{borderRadius: 40}}
            onPress={() => onTypeChange(value.type)}
          />
        ))}
      </View>
    </View>
  );
};
