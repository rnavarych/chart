import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../../configs/colors';
import { ViewStyle, TextStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  text: TextStyle;
}

export default EStyleSheet.create({
  container: {},
  text: {},
}) as Style;
