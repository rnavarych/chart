import EStyleSheet from 'react-native-extended-stylesheet';

import {
  INNER_RADIUS_SMALL,
  bubbleR,
  BACK_RADIUS,
  HORIZONTAL_PADDING,
  TOP_HEIGHT,
  CY,
  BUBBLE_BORDER_WIDTH,
} from './constants';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '$screenBackground',
  },
  topContainer: {
    height: TOP_HEIGHT,
    width: '100%',
    justifyContent: 'space-between',
  },
  bottomNote: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  menu: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  menuItem: {
    width: 200,
    height: 40,
    margin: 10,
  },
  showSampling: {
    height: 25,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  setSampling: {
    margin: 10,
    height: 25,
    width: 30,
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  setTimezone: {
    margin: 10,
    height: 25,
    width: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewMeasurement: {
    alignSelf: 'flex-end',
    marginRight: HORIZONTAL_PADDING,
  },
  newBubble: {
    position: 'absolute',
    width: 2 * INNER_RADIUS_SMALL,
    height: 2 * INNER_RADIUS_SMALL,
    borderRadius: INNER_RADIUS_SMALL,
    backgroundColor: 'white',
    borderWidth: (BUBBLE_BORDER_WIDTH * INNER_RADIUS_SMALL) / bubbleR,
  },
  oldBubble: {
    position: 'absolute',
    width: 2 * bubbleR,
    height: 2 * bubbleR,
    borderRadius: 2 * bubbleR,
    borderWidth: BUBBLE_BORDER_WIDTH,
    borderColor: 'white',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#d5dbeb',
  },
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 5,
  },
  bottomMessageContainer: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
  },
});
