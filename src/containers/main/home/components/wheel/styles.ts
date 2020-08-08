import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../../../../configs/colors';

import { BACK_RADIUS, COORD_OF_CENTER } from '../../constants';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCircle: {
    position: 'absolute',
    shadowOpacity: 1,
    shadowRadius: 5,
    backgroundColor: Colors.wheel.background,
    borderRadius: BACK_RADIUS,
    top: COORD_OF_CENTER.y - BACK_RADIUS,
    left: COORD_OF_CENTER.x - BACK_RADIUS
  },
});
