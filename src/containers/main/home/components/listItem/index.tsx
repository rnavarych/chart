import * as React from 'react';
import { Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import WheelBubble from '../bubble';

import { Entry } from '../../../../../interfaces/entities';

import { DateUtils } from '../../../../../utils';
import styles from './styles';

interface WheelListItemProps {
  entry: Entry;
  nextEntry: Entry;
  isLast: boolean;
}

const WheelListItem = React.forwardRef((props: WheelListItemProps, ref) => {
  const { entry, nextEntry, isLast } = props;
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <WheelBubble ref={ref} {...{ entry }} style={{ position: 'relative' }} />
        {!isLast && (
          <LinearGradient
            colors={[entry.color, nextEntry ? nextEntry.color : 'red']}
            style={{ width: 5, height: 20, position: 'absolute', bottom: -20 }}
          />
        )}
      </View>
      <View style={styles.bubbleInfo}>
        <View>
          <Text style={[styles.time]}>
            {moment(entry.time, DateUtils.HOURS_MINUTES_SECONDS_FORMAT).format('h:mm A')}
          </Text>
          <Text style={[styles.value]}>
            {Array.isArray(entry.value) ? entry.value.join('/') : entry.value}
            {' '}
            {entry.unit}
          </Text>
        </View>
      </View>
    </View>
  );
});

export default WheelListItem;
