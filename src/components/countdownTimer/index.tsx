import React, { forwardRef, useImperativeHandle } from 'react';
import { View, ViewStyle } from 'react-native';
import CountDown from 'react-native-countdown-component';

import log from '../../utils/log';

import styles from './styles';

export interface TCountDownTimer {
  restart: () => void;
}

type Props = {
  containerStyle?: ViewStyle;
  onPressed?: () => void;
  onFinished?: () => void;
  duration: number;
  running: boolean;
};

const CountdownTimer = forwardRef((props: Props, ref) => {
  const { containerStyle, duration, running, onPressed, onFinished } = props;
  const [id, setId] = React.useState(1);

  useImperativeHandle(ref, () => ({
    // I know it looks weird, but that's actually in the github doc
    restart: () => {
      log.debug('Timer restarted, new id:', id + 1);
      setId(id + 1);
    },
  }));

  const onTimerFinished = () => {
    log.debug('Timer finished');
    if (onFinished) {
      onFinished();
    }
  };

  const onTimerPressed = () => {
    log.debug('Timer pressed');
    if (onPressed) {
      onPressed();
    }
  };

  return (
    <View style={containerStyle ? containerStyle : undefined}>
      <CountDown
        id={id.toString()}
        digitStyle={styles.timeBackground}
        digitTxtStyle={styles.text}
        showSeparator={true}
        timeToShow={['M', 'S']}
        timeLabels={{ m: '', s: '' }}
        until={duration}
        onFinish={onTimerFinished}
        onPress={onTimerPressed}
        running={running}
      />
    </View>
  );
});

export default CountdownTimer;
