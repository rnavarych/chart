import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '$screenBackground',
  },
  screen: { marginTop: 0 },
  inputFirstInBlock: { marginTop: 35 },
  inputField: { marginTop: 0 },
  buttonsContainer: {
    flexDirection: 'row',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '$screenPaddingHorizotal',
    paddingTop: '$screenPaddingVertical',
    paddingBottom: 20,
  },
  firstElement: {
    marginTop: 40,
  },
  error: {
    color: '$errorColor',
  },
  bottomInputsRow: { width: '100%', flexDirection: 'row', marginTop: 10 },
  shortInputContainer: { flex: 1, alignItems: 'flex-end' },
  shortInput: {
    width: 50,
  },
  genderColumn: {
    flex: 3,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heightColumn: {
    flex: 4,
    paddingHorizontal: 10,
  },
  weightColumn: { flex: 4, paddingHorizontal: 10 },
  inputLabel: { fontSize: '$fs13', fontWeight: 'bold', marginRight: 5 },
  columnLabel: {
    fontSize: '$fs13',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
