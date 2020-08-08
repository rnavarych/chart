import React from 'react';
import { ViewStyle, View } from 'react-native';

import { Neomorph } from 'react-native-neomorph-shadows';

import Colors from '../../configs/colors';
import styles from './styles';

interface Props {
  width: number;
  height: number;
  inner?: boolean;
  /** Style of an enclosing Neomorph container. Do not use it for aligning child views inside the wrapper  */
  style?: ViewStyle;
  /** Style of an inner view that holds child views */
  contentContainerStyle?: ViewStyle;
  children?: Element;
  darkShadowColor?: string;
  lightShadowColor?: string;
}

const defaults = {
  darkShadowColor: Colors.neomorphShadow,
  lightShadowColor: Colors.neomorphLight,
};

// Important! This component does not support flex. You have to provide width and height
function NeomorphWrapper(props: Props): JSX.Element {
  const {
    width,
    height,
    inner = false,
    children,
    style,
    contentContainerStyle,
    darkShadowColor = defaults.darkShadowColor,
    lightShadowColor = defaults.lightShadowColor,
  } = props;

  return (
    <Neomorph
      style={{
        ...styles.neomorphWrapper,
        ...style,
        width,
        height,
      }}
      {...{ inner, darkShadowColor, lightShadowColor }}>
      <View
        style={{ ...styles.contentContainer, ...contentContainerStyle, width, height }}>
        {children}
      </View>
    </Neomorph>
  );
}

export default NeomorphWrapper;
