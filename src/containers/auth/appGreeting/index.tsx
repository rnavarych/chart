import React, { useState, useMemo, useEffect } from 'react';
import { Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import codePush from 'react-native-code-push';

import Button from '../../../components/buttons/button';
import AppInfo from '../../../components/appInfo';

import * as routes from '../../../nav/routes';
import * as I18n from '../../../I18n';
import { BASE_URL } from '../../../configs';
import styles from './styles';

interface Props {
  navigation: any; // TODO: add proper navigation type
}

function AppGreetingScreen(props: Props) {
  const { navigation } = props;
  const [codePushVersion, setCodePushVersion] = useState('');
  const appVersion = useMemo(() => DeviceInfo.getVersion(), []);
  const buildNumber = useMemo(() => DeviceInfo.getBuildNumber(), []);
  const bundleId = useMemo(() => DeviceInfo.getBundleId(), []);

  useEffect(() => {
    codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then((update) => {
      if (update) {
        setCodePushVersion(update.label);
      }
    });
  }, []);

  const openLandingVideoScreen = () => {
    navigation.navigate(routes.LANDING);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text>{I18n.strings('screens.appGreeting.title')}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button
          text={I18n.strings('buttons.getStarted')}
          onPress={openLandingVideoScreen}
        />
      </View>
      <AppInfo />
    </SafeAreaView>
  );
}

export default AppGreetingScreen;
