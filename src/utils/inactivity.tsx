import React from 'react';
import { PanResponder, View } from 'react-native';
const defaultStyle = {
  flex: 1,
};

const timePassed = (lastAcivityDate: number, timeAllowed: number) => {
  if (Date.now() - lastAcivityDate >= timeAllowed) {
    return true;
  }
  return false;
};

interface Props {
  enabled: boolean;
  timeInterval: number; // ms
  checkInterval: number;
  onInactivity: () => void;
  onStartActivity?: () => void;
  onCheck?: (timestamp: number) => void;
}

interface State {
  lastActivityDate: number;
}

interface UserInactivity {
  timerId: NodeJS.Timeout;
}

class UserInactivity extends React.Component<Props, State, UserInactivity> {
  state = {
    lastActivityDate: 0, // or null?
  };

  componentDidMount() {
    const { onStartActivity } = this.props;

    // Start an initial timer if enabled
    if (this.props.enabled) {
      this.setState({ lastActivityDate: Date.now() });
      onStartActivity && onStartActivity();
      this.timerId = setInterval(() => {
        const { lastActivityDate } = this.state;
        const { timeInterval, onInactivity, enabled, onCheck } = this.props;
        if (enabled && timePassed(lastActivityDate, timeInterval)) {
          onInactivity();
        } else {
          onCheck && onCheck(lastActivityDate);
        }
      }, this.props.checkInterval);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { onStartActivity } = this.props;

    // Start a new timer
    if (prevProps.enabled === false && this.props.enabled === true) {
      this.setState({ lastActivityDate: Date.now() });
      onStartActivity && onStartActivity();
      this.timerId = setInterval(() => {
        const { lastActivityDate } = this.state;
        const { timeInterval, enabled, onInactivity, onCheck } = this.props;
        if (enabled && timePassed(lastActivityDate, timeInterval)) {
          onInactivity();
        } else {
          onCheck && onCheck(lastActivityDate);
        }
      }, this.props.checkInterval);
    }

    // Stop current timer
    if (prevProps.enabled === true && this.props.enabled === false) {
      clearInterval(this.timerId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  updateLastActivityDate = () => {
    this.props.enabled && this.setState({ lastActivityDate: Date.now() });
    return false;
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: this.updateLastActivityDate,
    onPanResponderTerminationRequest: this.updateLastActivityDate,
    onStartShouldSetPanResponderCapture: this.updateLastActivityDate,
  });

  render() {
    return (
      <View
        style={defaultStyle}
        collapsable={false}
        {...this.panResponder.panHandlers}>
        {this.props.children}
      </View>
    );
  }
}
export default UserInactivity;
