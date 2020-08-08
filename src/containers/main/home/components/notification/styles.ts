import { ViewStyle, TextStyle, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Style {
  container: ViewStyle;
}

export default EStyleSheet.create({
  container: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
  },
}) as Style;
