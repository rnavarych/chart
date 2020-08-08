import { AnyAction } from 'redux';
import * as types from '../constants/actionTypes';
import { TimeSection } from '../interfaces/entities';

interface State {
  blocked: boolean;
  onStartShouldBlockCheckCompleted: boolean;
  lastActivityTimeStamp: number;
  shouldHideGetStarted: boolean;
  timeSection: TimeSection | null;
}

let initialState = {
  blocked: false,
  onStartShouldBlockCheckCompleted: false,
  lastActivityTimeStamp: Date.now(),
  shouldHideGetStarted: false,
  timeSection: null,
};

const app = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.UPDATE_USER_BLOCKED_STATUS: {
      return {
        ...state,
        blocked: action.isBlocked,
      };
    }
    case types.UPDATE_USER_LAST_ACTIVITY_DATE: {
      return {
        ...state,
        lastActivityTimeStamp: action.timestamp,
      };
    }
    case types.ON_START_SHOULD_BLOCK_CHECK_COMPLETED: {
      return {
        ...state,
        onStartShouldBlockCheckCompleted: true,
      };
    }
    case types.SIGN_OUT: {
      return {
        ...state,
        blocked: false,
      };
    }
    case types.HIDE_GET_STARTED_FLOW: {
      return {
        ...state,
        shouldHideGetStarted: true,
      };
    }
    case types.UPDATE_TIMESECTION: {
      return {
        ...state,
        timeSection: action.timeSection,
      };
    }

    default:
      return state;
  }
};

export default app;
