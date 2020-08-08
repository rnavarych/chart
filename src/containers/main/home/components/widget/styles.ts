import { ViewStyle, TextStyle } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Colors from '../../../../../configs/colors';

interface Style {
  container: ViewStyle;
  title: TextStyle;
  value: TextStyle;
}

export default EStyleSheet.create({
  container: {
    backgroundColor: Colors.widget.background,
    height: 70, // TODO: calculate needed
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center'
  },
  title: {
    color: Colors.widget.title,
    fontSize: '$fs10'
  },
  value: {
    color: Colors.widget.value,
    fontSize: '$fs22'
  },
}) as Style;
