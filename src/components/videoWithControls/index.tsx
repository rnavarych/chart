import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import RNVideo from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';
import { log } from '../../utils';

interface Props {
  source: { uri: string };
  muted?: boolean;
  repeat?: boolean;
  containerStyle?: ViewStyle;
  resizeMode?: 'none' | 'contain' | 'stretch' | 'cover' | undefined;
}

function Video(props: Props): JSX.Element {
  const {
    source,
    muted = false,
    repeat = false,
    containerStyle = {},
    resizeMode = 'contain',
  } = props;
  const [isScreenFocused, setIsScreenFocused] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      log.debug('VideoWithControls: useFocusEffect - focus gained');
      setIsScreenFocused(true);
      return () => {
        log.debug('VideoWithControls: useFocusEffect - focus lost');
        setIsScreenFocused(false);
      };
    }, []),
  );

  return (
    <View style={{ ...styles.videoContainer, ...containerStyle }}>
      <RNVideo
        style={styles.videoStyle}
        source={source}
        muted={muted}
        resizeMode={resizeMode}
        paused={paused || !isScreenFocused}
        repeat={repeat}
        onEnd={() => {
          log.debug('VideoWithControls: onEnd()');
          !repeat && setPaused(true);
        }}
        onLoad={() => {
          log.debug('VideoWithControls: onLoad()');
        }}
        onPlaybackResume={() => {
          log.debug('VideoWithControls: onPlaybackResume()');
        }}
        onLoadStart={() => {
          log.debug('VideoWithControls: onLoadStart()');
        }}
        onSeek={() => {
          log.debug('VideoWithControls: onSeek()');
        }}
        onVideoError={() => {
          log.debug('VideoWithControls: onVideoError()');
        }}
        onReadyForDisplay={() => {
          log.debug('VideoWithControls: onReadyForDisplay()');
        }}
        onPlaybackStalled={() => {
          log.debug('VideoWithControls: onPlaybackStalled()');
        }}
        onError={(err) => log.error('VideoWithControls:', err)}
        controls={true}
      />
    </View>
  );
}

export default Video;
