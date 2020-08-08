import rudderClient from '@rudderstack/rudder-sdk-react-native';
import { Middleware } from 'redux';
import * as types from '../../constants/actionTypes';
import { log } from '../../utils';

const rudderEventTracker: Middleware = (store) => (next) => (action) => {
  // get event to send to RudderStack
  const event: RudderEvent | null = getRudderEvent(action);
  if (event) {
    log.trace('RudderEvent:', event);
    rudderClient.track(event.event, event.properties);
  }
  const returnValue = next(action);
  // we can place additional tracking here if we need to track next state
  return returnValue;
};

class RudderEvent {
  event: string;
  properties?: object;

  constructor(action: string, data?: object) {
    this.event = action;
    this.properties = data;
  }
}

const getRudderEvent = (action: any): RudderEvent | null => {
  switch (action.type) {
    case types.SIGN_IN:
    case types.SIGN_OUT:
      return new RudderEvent(action.type);
    default:
      return null;
  }
};

export default rudderEventTracker;
