import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    borderRadius: 15,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  text: {
    marginHorizontal: 5,
    fontSize: '$fs14',
    fontWeight: 'bold',
    color: '$textPrimary',
  },
});
