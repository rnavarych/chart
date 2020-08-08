import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFocusEffect } from '@react-navigation/native';

import VideoWithButtons, {
  VideoWithButtonType,
} from '../../../components/videoWithButtons';

import * as I18n from '../../../I18n';
import styles from './styles';

interface Route {
  params: {
    title: string;
    rightText: string;
    nextScreen?: string;
    source: { uri: string };
  };
}

interface Props {
  navigation: any; // TODO: add proper navigation type
  route: Route;
}

function AuthVideoScreen(props: Props) {
  const { navigation } = props;
  const { title, rightText, nextScreen, source } = props.route.params;
  const [isScreenFocused, setScreenFocused] = useState(true);
  const videoRef = useRef<VideoWithButtonType>(null);

  useFocusEffect(
    React.useCallback(() => {
      setScreenFocused(true);
      return () => {
        setScreenFocused(false);
      };
    }, []),
  );

  const handleLeftClick = () => {
    videoRef.current && videoRef.current.rewatch();
  };

  const handleRightClick = () => {
    nextScreen ? navigation.replace(nextScreen) : navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <VideoWithButtons
          ref={videoRef}
          source={source}
          leftButtonTitle={I18n.strings('buttons.rewatch')}
          onLeftClick={handleLeftClick}
          rightButtonTitle={rightText}
          onRightClick={handleRightClick}
          isActive={isScreenFocused}
          muted={false}
        />
      </View>
    </SafeAreaView>
  );
}

export default AuthVideoScreen;
