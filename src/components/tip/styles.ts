import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../configs/colors';
import { ViewStyle, ImageStyle, TextStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  image: ImageStyle;
  text: TextStyle;
}

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
  },
  image: { height: '100%', width: 130, marginHorizontal: 10, resizeMode: 'contain' },
  text: {
    flex: 1,
    color: Colors.blueWood,
    fontSize: '$fs16',
    fontWeight: '500',
    textAlign: 'left',
    margin: 20,
  },
}) as Style;
