import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: '$screenPaddingHorizotal',
    backgroundColor: '$screenBackground',
  },
  content: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  inputMargin: {
    marginTop: 15,
    marginBottom: 0,
  },
  error: {
    color: 'red',
  },
  sendCodeButton: {
    marginTop: 15,
    marginBottom: 50,
    height: 50,
  },
  mainButton: {
    marginTop: 60,
  },
});
