import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../configs/colors';
import { ViewStyle, ImageStyle, TextStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  image: ImageStyle;
  text: TextStyle;
  counter: TextStyle;
  counterContainer: ViewStyle;
  counterOuterBorder: ViewStyle;
}

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  image: { width: 100, height: 100, resizeMode: 'contain' },
  text: {
    color: Colors.black,
    fontSize: '$fs16',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  counterOuterBorder: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    zIndex: 1,
    borderWidth: 4,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderColor: Colors.redDark,
  },
  counter: {
    fontSize: '$fs14',
    fontWeight: 'bold',
    color: Colors.redDark,
    textAlign: 'center',
  },
}) as Style;
