import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  statsContainer: {
    width: '100%',
    paddingHorizontal: '$screenPaddingHorizotal',
    paddingVertical: '$screenPaddingVertical',
  },
  label: {
    fontSize: '$fs20',
    paddingHorizontal: 10,
  },
  badgesList: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badge: {
    marginHorizontal: 15,
  },
});
