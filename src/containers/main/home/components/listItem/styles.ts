import EStyleSheet from 'react-native-extended-stylesheet';
import { ViewStyle, TextStyle } from 'react-native';

import { BUBBLE_BORDER_WIDTH } from '../../constants';

interface Style {
  container: ViewStyle;
  bubble: ViewStyle;
  bubbleInfo: ViewStyle;
  time: TextStyle;
  value: TextStyle;
  delete: ViewStyle;
}

export default EStyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10,
  },
  bubble: {
    borderRadius: 50,
    height: 50,
    width: 50,
    borderWidth: BUBBLE_BORDER_WIDTH,
    backgroundColor: 'white',
  },
  bubbleInfo: {
    flex: 1,
    marginStart: 20,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: '$fs12',
    color: '$deepOceanColor',
    opacity: 0.5
  },
  value: {
    fontSize: '$fs18',
    color: '$deepOceanColor'
  },
  delete: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
}) as Style;
