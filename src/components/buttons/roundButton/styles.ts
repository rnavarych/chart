import EStyleSheet from 'react-native-extended-stylesheet';
import { ViewStyle, ImageStyle } from 'react-native';
import Colors from '../../../configs/colors';

interface Style {
  container: ViewStyle;
  button: ViewStyle;
  icon: ImageStyle;
  shadowWrapper: ViewStyle;
}

export default EStyleSheet.create({
  container: {
    marginBottom: 10,
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  shadowWrapper: {
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 30,
    // TODO: change to Colors.common.background
    backgroundColor: '$screenBackground',
  },
  button: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
}) as Style;
