import React, { ReactNode, useState, useMemo, useEffect } from 'react';
import { Text, View, ViewStyle } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import codePush from 'react-native-code-push';
import { BASE_URL } from '../../configs';

import styles from './styles';

type Props = {
  style?: ViewStyle;
};

// TODO: apply global font-face later
function AppInfo(props: Props): JSX.Element {
  const [codePushVersion, setCodePushVersion] = useState('');
  const appVersion = useMemo(() => DeviceInfo.getVersion(), []);
  const buildNumber = useMemo(() => DeviceInfo.getBuildNumber(), []);
  const bundleId = useMemo(() => DeviceInfo.getBundleId(), []);
  const { style } = props;

  useEffect(() => {
    codePush.getUpdateMetadata(codePush.UpdateState.RUNNING).then((update) => {
      if (update) {
        setCodePushVersion(update.label);
      }
    });
  }, []);

  return (
    <View style={{ ...styles.container, ...style }}>
      <Text>{bundleId}</Text>
      <Text>
        Healthimation v.{appVersion} ({buildNumber})
      </Text>
      {codePushVersion !== '' && <Text>CodePush version is {codePushVersion}</Text>}
      <Text>{BASE_URL}</Text>
    </View>
  );
}

export default AppInfo;
