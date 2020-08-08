import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../../../configs/colors';

export default EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginVertical: 10,
    width: '100%',
    fontSize: '$fs18',
    textAlign: 'center',
  },
  listContainer: { width: '100%', flex: 1, backgroundColor: Colors.grayLight },
  categoryRowContainer: {
    height: 50,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  exerciseRowContainer: {
    height: 50,
    width: '100%',
    paddingVertical: 10,
    paddingRight: 30,
    paddingLeft: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.grayExtralight,
  },
  rowText: {
    flex: 1,
    color: Colors.black,
    backgroundColor: 'transparent',
    fontSize: '$fs16',
  },
  rowIcon: {
    height: 15,
    resizeMode: 'contain',
  },
});
