import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  scanButtonsContainer: {
    flexDirection: 'row',
  },
  devicesList: {
    width: '100%',
  },
  listRowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  listRowText: { flex: 1, paddingLeft: 10 },
  bluetoothOffContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  bluetoothOffText: {
    textAlign: 'center',
    fontSize: '$fs18',
  },
  scanIndicator: {
    marginVertical: 10,
  },
});
