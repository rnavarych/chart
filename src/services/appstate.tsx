import React from 'react';
import { AppState } from 'react-native';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';

import {
  updateUserBlockedStatus,
  updateUserLastActivityTimeStamp,
  completeOnStartBlockCheck,
  updateTimeSection,
} from '../actions/app';
import { diffBetweenDatesMoreThan, checkCurrentTimeSection } from '../utils/dates';

import { INACTIVITY_TIME_ALLOWED } from '../configs';
import { TimeSection } from '../interfaces/entities';

interface Props {
  blocked: boolean;
  children: any;
  signedIn: boolean;
  lastActivityTimeStamp: number;
  updateUserLastActivityTimeStamp: (timestamp: number) => void;
  updateUserBlockedStatus: (status: boolean) => void;
  completeOnStartBlockCheck: () => void;
  updateTimeSection: (timeSection: TimeSection) => void;
}

// TODO: implementing AppState tracking using functional component doesn't seem to be working
// See: https://github.com/LaurenceRolandJames/AppStateActiveRepro/tree/master
// nextAppState never changed (only changed if we use useEffect without [] param at all)
class AppStateTracker extends React.Component<Props> {
  state = {
    appState: AppState.currentState,
  };

  blockTheApp = () => this.props.updateUserBlockedStatus(true);

  componentDidMount() {
    if (
      !this.props.blocked &&
      this.props.signedIn &&
      diffBetweenDatesMoreThan(
        this.props.lastActivityTimeStamp,
        Date.now(),
        INACTIVITY_TIME_ALLOWED,
      )
    ) {
      this.blockTheApp();
    }
    this.props.completeOnStartBlockCheck();
    this.props.updateTimeSection(checkCurrentTimeSection());
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState: string) => {
    // TODO: check Android and iOS both behavior
    if (
      !this.props.blocked &&
      this.props.signedIn &&
      this.state.appState.match(/inactive|background/) && // inactive|
      nextAppState === 'active' &&
      diffBetweenDatesMoreThan(
        this.props.lastActivityTimeStamp,
        Date.now(),
        INACTIVITY_TIME_ALLOWED,
      )
    ) {
      this.blockTheApp();
    }
    this.props.updateTimeSection(checkCurrentTimeSection());
    this.setState({ appState: nextAppState });
  };

  render() {
    return this.props.children;
  }
}

const mapStateToProps = ({
  auth: { signedIn },
  app: { lastActivityTimeStamp, blocked },
}) => ({
  signedIn,
  lastActivityTimeStamp,
  blocked,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateUserBlockedStatus: (status: boolean) => dispatch(updateUserBlockedStatus(status)),
  updateUserLastActivityTimeStamp: (timestamp: number) =>
    dispatch(updateUserLastActivityTimeStamp(timestamp)),
  completeOnStartBlockCheck: () => dispatch(completeOnStartBlockCheck()),
  updateTimeSection: (timeSection: TimeSection) =>
    dispatch(updateTimeSection(timeSection)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppStateTracker);
