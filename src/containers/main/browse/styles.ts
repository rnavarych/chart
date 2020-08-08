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
    paddingHorizontal: '7%',
    paddingTop: 10,
  },
  buttonsGrid: {
    flex: 0.6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginTop: 30,
  },
});
