import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../../configs/colors';
import { ViewStyle, TextStyle } from 'react-native';

export const WIDTH = 30;
export const HEIGHT = 30;

interface Style {
  container: ViewStyle;
  selected: ViewStyle;
  notSelected: ViewStyle;
  label: TextStyle;
}

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  selected: {
    width: WIDTH / 2,
    height: HEIGHT / 2,
    borderRadius: Math.min(HEIGHT, WIDTH) / 2,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: Colors.accent1,
  },
  notSelected: {
    width: WIDTH / 2,
    height: HEIGHT / 2,
    borderRadius: Math.min(HEIGHT, WIDTH) / 4,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  label: {
    paddingStart: 10,
    fontSize: '$fs14',
  },
}) as Style;
