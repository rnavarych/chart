import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '$screenBackground',
  },
  loginHeader: {
    width: '100%',
    height: 140,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '$white',
    marginBottom: 30,
  },
  lenaImage: { height: 120, width: 120, marginLeft: 20, marginRight: 10 },
  logoImage: { height: 140, flex: 1, marginHorizontal: 30 },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: '$screenPaddingHorizotal',
    alignItems: 'center',
    paddingBottom: 40,
  },
  error: {
    color: 'red',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  touchIdRow: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  useTouchIdLabel: {
    marginLeft: 20,
  },
  touchIdLoginRow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
