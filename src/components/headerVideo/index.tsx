import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import Video from 'react-native-video';
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

function HeaderVideo(props: Props): JSX.Element {
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
      setIsScreenFocused(true);
      return () => {
        setIsScreenFocused(false);
      };
    }, []),
  );

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <View style={styles.videoContainer}>
        <Video
          style={styles.videoStyle}
          source={source}
          muted={muted}
          resizeMode={resizeMode}
          paused={paused || !isScreenFocused}
          repeat={repeat}
          onEnd={() => {
            !repeat && setPaused(true);
          }}
          onError={(err) => log.error(err)}
        />
      </View>
    </View>
  );
}

export default HeaderVideo;
