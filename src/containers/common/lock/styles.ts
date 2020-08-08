import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '$screenBackground'
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: '$listHorizontalPadding',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMargin: {
    marginVertical: 10,
  },
  error: {
    color: 'red'
  },
  buttonsContainer: {
    flexDirection: 'row'
  }
});
