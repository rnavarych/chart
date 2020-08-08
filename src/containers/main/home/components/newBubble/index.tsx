import * as React from 'react';
import { Text, View, Animated, TouchableOpacity, ViewStyle } from 'react-native';

import { Neomorph } from 'react-native-neomorph-shadows';

import { INNER_RADIUS_SMALL, bubbleR } from '../../constants';

import styles from './styles';
import { Entry } from '../../../../../interfaces/entities';

interface NewBubbleProps {
  onPress: () => void;
  bubble: Entry;
  transform: any[];
  style?: ViewStyle;
  animatedValue: Animated.AnimatedValue;
}

const AnimatedNeomorph = Animated.createAnimatedComponent(Neomorph);

const NewBubble = (props: NewBubbleProps) => {
  const { transform, onPress, bubble, style, animatedValue } = props;
  return (
    <AnimatedNeomorph
      style={[
        styles.container,
        { borderColor: bubble.color, transform, shadowOpacity: 0.4, shadowRadius: 15 },
        style,
      ]}>
      <TouchableOpacity
        {...{ onPress }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ position: 'absolute' }}>
          <Animated.Text
            style={[
              styles.message,
              {
                opacity: animatedValue.interpolate({
                  inputRange: [bubbleR / INNER_RADIUS_SMALL, 1],
                  outputRange: [-2, 1],
                }),
              },
            ]}>
            {bubble.value} {bubble.unit}
          </Animated.Text>
        </Animated.View>
        <Animated.Image
          source={bubble.icon}
          style={[
            styles.animatedIcon,
            {
              opacity: animatedValue.interpolate({
                inputRange: [bubbleR / INNER_RADIUS_SMALL, 1],
                outputRange: [1, 0],
              }),
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [bubbleR / INNER_RADIUS_SMALL, 1],
                    outputRange: [INNER_RADIUS_SMALL / bubbleR, 1],
                  }),
                },
              ],
            },
          ]}
        />
      </TouchableOpacity>
    </AnimatedNeomorph>
  );
};

export default NewBubble;
