import * as types from '../constants/actionTypes';
import { TimeSection } from '../interfaces/entities';

// WARNING: you do not need to use this action when signing out the user.
// All happens on signOut action itself.
export const updateUserBlockedStatus = (isBlocked: boolean) => ({
  type: types.UPDATE_USER_BLOCKED_STATUS,
  isBlocked,
});

export const updateUserLastActivityTimeStamp = (timestamp: number) => ({
  type: types.UPDATE_USER_LAST_ACTIVITY_DATE,
  timestamp,
});

export const completeOnStartBlockCheck = () => ({
  type: types.ON_START_SHOULD_BLOCK_CHECK_COMPLETED,
});

export const hideGetStartedFlow = () => ({
  type: types.HIDE_GET_STARTED_FLOW,
});

export const updateTimeSection = (timeSection: TimeSection) => ({
  type: types.UPDATE_TIMESECTION,
  timeSection,
});
