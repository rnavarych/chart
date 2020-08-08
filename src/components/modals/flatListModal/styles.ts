import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $ITEM_HEIGHT: 50,
  pickerModal: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '$screenBackground',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 40,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  titleRow: {
    height: 35,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  modalTitle: {
    fontSize: '$fs20',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listRow: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  itemRow: {
    height: '$ITEM_HEIGHT',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  rowText: {
    width: '100%',
    textAlign: 'left',
    fontSize: '$fs16',
  },
});
