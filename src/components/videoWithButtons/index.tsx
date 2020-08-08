import React, { useRef, useImperativeHandle, useState, Ref } from 'react';
import { View, ViewStyle } from 'react-native';
import Button from '../buttons/button';
import Video from 'react-native-video';

import styles from './styles';
import { log } from '../../utils';

export interface VideoWithButtonType {
  rewatch: () => void;
}

interface Props {
  source: { uri: string };
  leftButtonTitle: string;
  onLeftClick: () => void;
  rightButtonTitle: string;
  onRightClick: () => void;
  isActive: boolean;
  muted?: boolean;
  repeat?: boolean;
  containerStyle?: ViewStyle;
}

function VideoWithButtons(
  props: Props,
  ref: Ref<VideoWithButtonType>,
): JSX.Element {
  const {
    source,
    leftButtonTitle,
    rightButtonTitle,
    onLeftClick,
    onRightClick,
    isActive,
    muted = false,
    repeat = false,
    containerStyle = {},
  } = props;
  const videoComponent = useRef<Video>(null);
  const [paused, setPaused] = useState<boolean>(!isActive);

  useImperativeHandle(ref, () => ({
    rewatch: () => {
      if (videoComponent.current) {
        videoComponent.current.seek(0);
        if (paused) {
          setPaused(false);
        }
      }
    },
  }));

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.videoContainer}>
        <Video
          style={styles.videoStyle}
          ref={videoComponent}
          source={source}
          muted={muted}
          resizeMode="cover"
          paused={paused || !isActive}
          repeat={repeat}
          onEnd={() => {
            if (!repeat) {
              setPaused(true);
            }
          }}
          onError={(err) => log.error(err)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button text={leftButtonTitle} onPress={onLeftClick} />
        <Button text={rightButtonTitle} onPress={onRightClick} />
      </View>
    </View>
  );
}

export default React.forwardRef(VideoWithButtons);
