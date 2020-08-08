import EStyleSheet from 'react-native-extended-stylesheet';
import { ViewStyle, TextStyle } from 'react-native';

interface Style {
  container: ViewStyle;
  menuItem: ViewStyle;
  itemtext: TextStyle;
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '$screenBackground',
    paddingVertical: 10,
  },
  menuItem: {
    width: 200,
    height: 40,
    margin: 10,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  itemtext: {
    fontSize: 20,
    color: 'white'
  }
});

export default styles as Style;
