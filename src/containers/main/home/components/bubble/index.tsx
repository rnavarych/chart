import * as React from 'react';
import { Image, Animated, ViewStyle } from 'react-native';

import { Neomorph } from 'react-native-neomorph-shadows';

import styles from './styles';
import { Entry } from '../../../../../interfaces/entities';

interface WheelBubbleProps {
  entry: Entry;
  notVisible?: boolean;
  isAppearingOne?: boolean;
  transform?: any[];
  style?: ViewStyle;
}

const AnimatedNeomorph = Animated.createAnimatedComponent(Neomorph);

const WheelBubble = React.forwardRef((props: WheelBubbleProps, ref) => {
  const {
    entry,
    notVisible = false,
    isAppearingOne = false,
    transform = [],
    style,
  } = props;
  return (
    <AnimatedNeomorph
      innerRef={ref}
      pointerEvents={'none'} // TODO: Should we have them pressable?
      key={entry.id}
      style={[
        styles.container,
        {
          opacity: notVisible ? 0 : 1,
          backgroundColor: isAppearingOne ? null : '#eaebef',
          borderColor: isAppearingOne ? 'transparent' : entry.color,
          transform,
          shadowOpacity: 0.4,
          shadowRadius: 5,
        },
        style,
      ]}>
      {/* <Text style={[styles.title, isAppearingOne && { color: 'transparent' }]}>
        {entry.title}
      </Text> */}
      <Image style={[styles.icon, isAppearingOne && { opacity: 0 }]} source={entry.icon}/>
    </AnimatedNeomorph>
  );
});

export default WheelBubble;
