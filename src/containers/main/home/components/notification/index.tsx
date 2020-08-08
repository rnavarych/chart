import * as React from 'react';
import { Text, View } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { MainNotification } from '../../../../../interfaces/entities';

import styles from './styles';

interface NotificationProps {
  height: number;
  notification: MainNotification;
}

const Notification = (props: NotificationProps) => {
  const { notification, height } = props;
  return (
    <View style={[styles.container, { height }]}>
      {notification.bottomMessage && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>
            {notification?.bottomMessage}
          </Text>
        </View>
      )}
      {notification.bottomImage && (
        <Animatable.Image
          useNativeDriver={true}
          animation="slideInRight"
          source={notification?.bottomImage}
          style={{
            width: (height * 100) / 220,
            height: height,
            resizeMode: 'cover'
          }}
        />
      )}
    </View>
  );
};

export default Notification;
