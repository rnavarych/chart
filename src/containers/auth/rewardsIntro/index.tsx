import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../../components/buttons/button';
import HeaderVideo from '../../../components/headerVideo';

import * as I18n from '../../../I18n';
import styles from './styles';
import videos from '../../../configs/videos';
import * as routes from '../../../nav/routes';

interface Props {
  navigation: any; // TODO: add proper navigation type
}

function RewardsIntroScreen(props: Props) {
  const { navigation } = props;

  const title = I18n.strings('screens.rewardsIntro.title').toUpperCase();
  const text = I18n.strings('screens.rewardsIntro.text');

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <View style={styles.video}>
            <HeaderVideo
              source={videos.lenaIdle}
              muted={false}
              repeat={true}
              resizeMode="cover"
            />
          </View>
          <View style={styles.text}>
            <Text style={styles.title}>{title}</Text>
            <Text>{text}</Text>
          </View>
        </View>
        <Button
          text={I18n.strings('buttons.mainMenu')}
          onPress={() => navigation.replace(routes.MAIN_FLOW)}
        />
      </View>
    </SafeAreaView>
  );
}

export default RewardsIntroScreen;
