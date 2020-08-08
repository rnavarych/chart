import { ViewStyle, TextStyle } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Colors from '../../../../../configs/colors';

interface Style {
  container: ViewStyle;
}

export default EStyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
}) as Style;
