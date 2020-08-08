import React from 'react';
import { View } from 'react-native';

import UserInactivity from '../utils/inactivity';

import {
  updateUserBlockedStatus,
  updateUserLastActivityTimeStamp,
  updateTimeSection,
} from '../actions/app';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from '../hooks';

import LockScreen from '../containers/common/lock';

import * as DateUtils from '../utils/dates';
import { INACTIVITY_TIME_ALLOWED, INACTIVITY_CHECK_INTERVAL } from '../configs';

interface Props {
  children: any;
}

const InactivityTracker = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { children } = props;

  const {
    isUserBlocked,
    signedIn,
    onStartShouldBlockCheckCompleted,
    timeSection,
  } = useShallowSelector(
    ({
      auth: { signedIn },
      app: { blocked, onStartShouldBlockCheckCompleted, timeSection },
    }) => ({
      isUserBlocked: blocked,
      signedIn,
      onStartShouldBlockCheckCompleted,
      timeSection,
    }),
  );

  const invisibleStyle = {
    opacity: 0,
    position: 'absolute',
    left: -10000,
  };

  return (
    <UserInactivity
      enabled={!isUserBlocked && signedIn && onStartShouldBlockCheckCompleted}
      timeInterval={INACTIVITY_TIME_ALLOWED}
      checkInterval={INACTIVITY_CHECK_INTERVAL}
      onStartActivity={() => {
        // TODO: find better place or rename the service?
        const timeSec = DateUtils.checkCurrentTimeSection();
        if (timeSec !== timeSection) {
          dispatch(updateTimeSection(timeSec));
        }
        dispatch(updateUserLastActivityTimeStamp(Date.now()));
      }}
      onCheck={(timestamp) => {
        const timeSec = DateUtils.checkCurrentTimeSection();
        if (timeSec !== timeSection) {
          dispatch(updateTimeSection(timeSec));
        }
        dispatch(updateUserLastActivityTimeStamp(timestamp));
      }}
      onInactivity={() => signedIn && dispatch(updateUserBlockedStatus(true))}>
      <>
        <View style={[{ flex: 1 }, isUserBlocked && invisibleStyle]}>{children}</View>
        {isUserBlocked && <LockScreen />}
      </>
    </UserInactivity>
  );
};

export default InactivityTracker;
