import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { INNER_RADIUS_SMALL, BUBBLE_BORDER_WIDTH, bubbleR } from '../../constants';

interface Style {
  container: ViewStyle;
  message: TextStyle;
  animatedTitle: TextStyle;
  animatedIcon: ImageStyle;
}

export default EStyleSheet.create({
  container: {
    position: 'absolute',
    width: 2 * INNER_RADIUS_SMALL,
    height: 2 * INNER_RADIUS_SMALL,
    borderRadius: INNER_RADIUS_SMALL,
    backgroundColor: '#eaebef',
    borderWidth: (BUBBLE_BORDER_WIDTH * INNER_RADIUS_SMALL) / bubbleR,
  },
  message: {
    fontSize: 16,
    width: 2 * INNER_RADIUS_SMALL - 30,
    textAlign: 'center',
  },
  animatedTitle: {
    color: '$deepOceanColor',
    fontWeight: 'bold',
    fontSize: 11,
  },
  animatedIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
}) as Style;
