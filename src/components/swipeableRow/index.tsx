import React, { useRef, ReactNode } from 'react';
import { Animated, Text, View, I18nManager } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import styles, { BUTTON_WIDTH } from './styles';

interface Props {
  children: ReactNode;
  actionName: string;
  actionColor: string;
  onActionPressed: () => void;
  closeOnButtonPressed?: boolean;
  closeAfterAction?: boolean;
}

const SwipeableRow = (props: Props) => {
  const {
    children,
    actionName,
    actionColor,
    onActionPressed,
    closeOnButtonPressed = false,
  } = props;
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      if (closeOnButtonPressed) {
        close();
      }
      onActionPressed();
    };

    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress) => (
    <View style={styles.actionButton}>
      {renderRightAction(actionName, actionColor, BUTTON_WIDTH, progress)}
    </View>
  );

  const close = () => {
    swipeableRef.current?.close();
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
};

export default SwipeableRow;
