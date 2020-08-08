import React, { useState, useCallback, useMemo } from 'react';
import {
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
  View,
  Image,
  useWindowDimensions,
  ImageSourcePropType,
} from 'react-native';

import { Neomorph } from 'react-native-neomorph-shadows';

import ActivityIndicator from '../../activityIndicator';
import Text from '../../text';

import Colors from '../../../configs/colors';
import images from '../../../configs/images';
import { log } from '../../../utils';
import styles, { DEFAULT_HEIGHT } from './styles';

interface Props {
  fetching?: boolean;
  disabled?: boolean;
  text: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  fullWidth?: boolean;
  width?: number;
  height?: number;
  buttonType?:
    | 'regular'
    | 'full-line'
    | 'navigation'
    | 'small'
    | 'dropdown'
    | 'smallForBottomPanel';
  textStyle?: TextStyle;
  // TODO: rename forceDarkText
  forceDarkText?: boolean;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
}

function Button(props: Props): JSX.Element {
  const {
    fetching = false,
    text,
    onPress,
    containerStyle,
    contentStyle,
    disabled = false,
    width = styles.$DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    buttonType = 'full-line',
    forceDarkText = false,
    textStyle,
    leftIcon,
    rightIcon,
  } = props;
  const [pressedDown, setPressedDown] = useState(false);
  const windowDimensions = useWindowDimensions();

  const handleOnPress = () => {
    if (!fetching) {
      onPress();
    }
  };

  const onPressIn = useCallback(() => {
    setPressedDown(true);
  }, [setPressedDown]);

  const onPressOut = useCallback(() => {
    setPressedDown(false);
  }, [setPressedDown]);

  const calculatedWidth = useMemo(() => {
    switch (buttonType) {
      case 'full-line':
      case 'navigation':
        return windowDimensions.width * styles.$FULL_LINE_WIDTH_PERCENT;
      case 'small':
        return text.length * styles.$smallTextSize;
      case 'smallForBottomPanel':
        return text.length * styles.$regularTextSize + 20;
      default:
        return width;
    }
  }, [windowDimensions, buttonType, width, text]);

  const calculatedHeight = useMemo(() => {
    switch (buttonType) {
      case 'small':
        return styles.$smallTextSize + 16;
      case 'smallForBottomPanel':
        return styles.$regularTextSize + 24;
      default:
        return height;
    }
  }, [buttonType, height]);

  const textStyleForButtonType = useMemo(() => {
    let btnTextStyle;
    switch (buttonType) {
      case 'navigation':
        btnTextStyle = styles.browseText;
        break;
      case 'small':
        btnTextStyle = styles.smallText;
        break;
      case 'full-line':
        btnTextStyle = styles.fullLineText;
        break;
      case 'dropdown':
        btnTextStyle = styles.dropdownText;
        break;
    }
    if (disabled) {
      btnTextStyle = { ...btnTextStyle, ...styles.disabledText };
    }
    return btnTextStyle;
  }, [buttonType, disabled]);

  const forcedDarkText = useMemo(() => {
    return forceDarkText ? styles.forcedDarkText : null;
  }, [forceDarkText]);

  return (
    <Neomorph
      style={{
        ...styles.neomorphWrapper,
        width: calculatedWidth,
        height: calculatedHeight,
        ...containerStyle,
      }}
      inner={pressedDown}
      darkShadowColor={Colors.neomorphShadow}
      lightShadowColor={Colors.neomorphLight}>
      <TouchableWithoutFeedback
        disabled={disabled}
        onPress={handleOnPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <View style={[styles.contentWrapper, contentStyle]}>
          {fetching ? (
            <ActivityIndicator />
          ) : buttonType !== 'navigation' && buttonType !== 'dropdown' ? (
            <Text
              style={{
                ...styles.text,
                ...textStyleForButtonType,
                ...forcedDarkText,
                ...textStyle,
              }}
              numberOfLines={1}>
              {text}
            </Text>
          ) : (
            // Navigation button content
            <View style={styles.browseButtonWrapper}>
              {leftIcon && (
                <Image resizeMode={'contain'} source={leftIcon} style={styles.leftIcon} />
              )}
              <Text
                style={{
                  ...textStyleForButtonType,
                  ...textStyle,
                }}
                numberOfLines={1}>
                {text}
              </Text>
              <Image
                source={
                  buttonType === 'navigation'
                    ? images.arrowRightBrowse
                    : rightIcon && rightIcon
                }
                style={styles.browseArrow}
                resizeMode={'contain'}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Neomorph>
  );
}

export default Button;
