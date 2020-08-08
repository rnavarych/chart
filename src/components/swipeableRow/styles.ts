import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../configs/colors';

export const BUTTON_WIDTH = 128;

export default EStyleSheet.create({
  actionText: {
    color: Colors.white,
    fontSize: '$fs16',
    backgroundColor: 'transparent',
    padding: 10,
  },
  actionButton: {
    width: BUTTON_WIDTH,
    flexDirection: 'row',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
