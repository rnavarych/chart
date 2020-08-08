import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../../configs/colors';

export default EStyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.accent1,
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    color: Colors.white,
    fontSize: '$fs16',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
