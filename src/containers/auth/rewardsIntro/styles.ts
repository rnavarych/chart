import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '$screenBackground',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '$screenPaddingHorizotal',
    paddingVertical: '$screenPaddingVertical',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: '100%',
    width: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    backgroundColor: '$screenBackground',
    paddingRight: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  video: {
    height: '100%',
    width: '100%',
  },
});
