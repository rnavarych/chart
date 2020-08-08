import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../configs/colors';

export const DEFAULT_HEIGHT = 50;

const BORDER_RADIUS = 10;
const PADDING_START = 10;

export default EStyleSheet.create({
  $DEFAULT_WIDTH: '$inputWidthDefault',
  $FULL_LINE_WIDTH_PERCENT: '$inputFullLineWidthPercent',
  $PLACEHOLDER_COLOR: Colors.input.placeholder,
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  input: {
    height: DEFAULT_HEIGHT,
    flex: 1,
    paddingStart: PADDING_START,
    fontSize: '$fs18',
    color: '$buttonTextRegular',
  },
  label: {
    fontWeight: '500',
    fontSize: '$fs14',
    marginBottom: 4,
    width: '100%',
    textAlign: 'left',
    flex: 1,
  },
  labelFullLine: {
    paddingLeft: 10,
  },
  required: {
    color: Colors.error,
  },
  notValidBorder: {
    borderColor: Colors.error,
  },
  validBorder: {
    borderColor: Colors.transparent,
  },
  neomorphWrapper: {
    alignSelf: 'stretch',
  },
  neomorphContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
  },
  eyePadding: {
    padding: 10,
  },
  eyeIcon: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  errorRow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    height: 15,
    lineHeight: 10, // TODO: does lineHeight even work here?
    marginTop: 2,
    marginBottom: 3,
    justifyContent: 'center',
    paddingStart: PADDING_START,
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    fontSize: '$fs11',
  },
});
