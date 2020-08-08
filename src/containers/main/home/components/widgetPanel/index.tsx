import * as React from 'react';
import { Text, View, ViewStyle } from 'react-native';

import Widget from '../widget';

import styles from './styles';

interface WidgetProps {
  glucose: string;
  pressure: string;
  steps: string;
  activeMinutes: string;
  exerciseMinutes: string;
  height: number;
  containerStyle: ViewStyle;
}

const WidgetPanel = (props: WidgetProps) => {
  const style = { flex: 1, margin: 10 };
  const style5 = { flex: 1, margin: 5 };

  const {
    glucose,
    pressure,
    steps,
    activeMinutes,
    exerciseMinutes,
    height,
    containerStyle,
  } = props;

  return (
    <View style={[styles.container, { height }, containerStyle]}>
      <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 10 }}>
        <Widget title={'Blood Glucose'} value={glucose} {...{ style }} />
        <Widget title={'Blood Pressure'} value={pressure} {...{ style }} />
      </View>
      <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 15 }}>
        <Widget title={'Steps'} value={steps} {...{ style: style5 }} />
        <Widget title={'Active Minutes'} value={activeMinutes} {...{ style: style5 }} />
        <Widget
          title={'Exercise Minutes'}
          value={exerciseMinutes}
          {...{ style: style5 }}
        />
      </View>
    </View>
  );
};

export default WidgetPanel;
