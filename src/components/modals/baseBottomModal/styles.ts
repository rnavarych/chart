import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  // bottom modal (for iOS)
  pickerModal: {
    width: '100%',
    flex: 1,
    backgroundColor: 'transparent',
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: 340,
    paddingBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '$screenBackground',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  panelTopRow: { width: '100%', flexDirection: 'row', justifyContent: 'flex-start' },
  modalTitle: {
    fontSize: '$fs20',
    flex: 1,
    fontWeight: 'bold',
  },
  panelBottomRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  panelContentRow: {
    flex: 1,
  },
  pickerIOS: {
    width: '100%',
    paddingHorizontal: 25,
    height: 200,
  },
  pickerContainerModal: {
    width: '$screenWidth',
    alignItems: 'center',
  },
  crossIcon: {
    width: 15,
    height: 15,
  },
  crossIconContainer: {
    padding: 10,
  },
});
