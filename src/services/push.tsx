import React, { useEffect, useCallback } from 'react';
import { Platform, View } from 'react-native';
import { Notifications } from 'react-native-notifications';
import { log } from '../utils';

interface Props {
  children: JSX.Element;
}

const NotificationManager = (props: Props): JSX.Element => {
  useEffect(() => {
    registerDevice();
    registerNotificationEvents();
  }, []);

  const registerDevice = () => {
    Notifications.events().registerRemoteNotificationsRegistered((event) => {
      // TODO: Send the token to my server so it could send back push notifications...
      log.debug('Device Token Received', event.deviceToken);
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event) => {
        console.error(event);
      },
    );

    Notifications.registerRemoteNotifications();
  };

  const registerNotificationEvents = () => {
    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        log.debug('Notification Received - Foreground', notification);
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: false, sound: false, badge: false });
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        log.debug('Notification opened by device user', notification);
        log.debug(
          `Notification opened with an action identifier: ${notification.identifier}`,
        );
        completion();
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        log.debug('Notification Received - Background', notification);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false });
      },
    );

    Notifications.getInitialNotification()
      .then((notification) => {
        log.debug('Initial notification was:', notification || 'N/A');
      })
      .catch((err) => console.error('getInitialNotifiation() failed', err));
  };

  const { children } = props;
  return <View style={{ flex: 1 }}>{children}</View>;
};

export default NotificationManager;
