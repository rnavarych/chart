import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';
import Colors from '../../../../configs/colors';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  // list
  devicesListInnerContainer: {
    width: '100%',
    marginBottom: 10,
    flex: 1,
  },
  icon: {
    height: 15,
    resizeMode: 'contain',
  },
  rectButton: {
    flex: 1,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  separator: {
    marginVertical: 0,
  },
  rowText: {
    flex: 1,
    color: Colors.black,
    backgroundColor: 'transparent',
  },
});
