import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../../configs/colors';
import { ViewStyle, TextStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  selected: ViewStyle;
  notSelected: ViewStyle;
}

export default EStyleSheet.create({
  container: {},
}) as Style;
