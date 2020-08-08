import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $PADDING_RIGHT: 5,
  $DEFAULT_WIDTH: '$inputWidthDefault - $PADDING_RIGHT',
  $TEXT_COLOR: '$textPrimary',
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingRight: '$PADDING_RIGHT',
  },
  labelWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    height: 45,
    marginTop: 10,
  },
  label: {
    fontWeight: '500',
    fontSize: '$fs14',
    textAlign: 'left',
  },
  buttonText: {
    paddingStart: 10,
    fontWeight: '500',
    fontSize: '$fs16',
    textAlign: 'left',
  },
  buttonContent: {
    alignItems: 'flex-start',
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
  },

  pickerContainerAndroid: {
    width: '$DEFAULT_WIDTH',
    alignItems: 'center',
    backgroundColor: '$inputBg',
    paddingStart: 5,
    borderRadius: 5,
    fontSize: 16,
  },
  pickerAndroid: {
    width: '100%',
  },

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
