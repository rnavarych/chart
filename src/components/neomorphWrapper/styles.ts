import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../configs/colors';

export default EStyleSheet.create({
  contentContainer: {
    borderRadius: 10,
    borderColor: Colors.transparent,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  neomorphWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neomorphBackground,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
  },
});
