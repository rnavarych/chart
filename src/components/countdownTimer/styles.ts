import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../configs/colors';
import { ViewStyle, TextStyle } from 'react-native';

export interface Styles {
  timeBackground: ViewStyle;
  text: TextStyle;
  buttonsContainer: ViewStyle;
}

export default EStyleSheet.create({
  timeBackground: {
    backgroundColor: Colors.accent1,
  },
  text: {
    color: Colors.white,
    fontSize: '$fs20',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
}) as Styles;
