import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../../../configs/colors';

export default EStyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  categoryTitle: {
    marginVertical: 10,
    width: '100%',
    fontSize: '$fs18',
    textAlign: 'center',
  },
  listRowContainer: {
    flex: 1,
    height: 50,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
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
  timerContainer: {
    marginVertical: 10,
  },
  timerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  timerButton: {
    marginBottom: 0,
    marginHorizontal: 20,
  },
  descriptionContainer: {
    paddingHorizontal: '$screenPaddingHorizotal',
    paddingVertical: '$screenPaddingVertical',
  },
  directionsTitle: {
    marginVertical: 5,
    fontSize: '$fs16',
    fontWeight: 'bold',
  },
});
