import React, {useState, useCallback, Suspense} from 'react';
import {View, Text} from 'react-native';

import ControlsPanel from './controls';

import {CHART_INTERVALS, CHART_TYPES} from '../../constants';

import styles from './styles';

const BloodGlucose = React.lazy(() => import('../chartContainer'));
const BloodPressure = React.lazy(() => import('../temp'));

export default () => {
  const [interval, setInterval] = useState(CHART_INTERVALS[0]);
  const [type, setType] = useState(CHART_TYPES[3]);

  const onIntervalChange = useCallback(
    (selected) => {
      setInterval(selected);
    },
    [setInterval],
  );

  const onTypeChange = useCallback(
    (selected) => {
      setType(selected);
    },
    [setType],
  );

  let content = null;
  switch (type) {
    case CHART_TYPES[3]:
      content = (
        <Suspense fallback={<Text style={styles.placeholder}>Loading...</Text>}>
          <BloodPressure />
        </Suspense>
      );
      break;
    case CHART_TYPES[4]:
      content = (
        <Suspense fallback={<Text style={styles.placeholder}>Loading...</Text>}>
          <BloodGlucose />
        </Suspense>
      );
      break;
    default:
      content = <Text style={styles.placeholder}>Not implemented yet..</Text>;
  }

  return (
    <View style={styles.container}>
      <ControlsPanel
        interval={interval}
        type={type}
        onIntervalChange={onIntervalChange}
        onTypeChange={onTypeChange}
      />
      <View style={styles.fragment}>{content}</View>
    </View>
  );
};
