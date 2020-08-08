import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { bubbleR, BUBBLE_BORDER_WIDTH } from '../../constants';

interface Style {
  container: ViewStyle;
  title: TextStyle;
  icon: ImageStyle;
}

export default EStyleSheet.create({
  container: {
    position: 'absolute',
    width: 2 * bubbleR,
    height: 2 * bubbleR,
    borderRadius: 2 * bubbleR,
    borderWidth: BUBBLE_BORDER_WIDTH,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '$deepOceanColor',
    fontWeight: 'bold',
    fontSize: 11,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
}) as Style;
