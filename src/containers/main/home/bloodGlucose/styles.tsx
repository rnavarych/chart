import { ViewStyle, TextStyle } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  buttonContainer: ViewStyle;
}

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: '$screenPaddingHorizotal',
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    left: 0,
  },
}) as Style;
