import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../../configs/colors';

export const DEFAULT_HEIGHT = 60;
export const HEIGHT_SMALL = 30;

export default EStyleSheet.create({
  $DEFAULT_WIDTH: '$inputWidthDefault',
  $FULL_LINE_WIDTH_PERCENT: '$inputFullLineWidthPercent',
  $smallTextSize: '$fs14',
  $regularTextSize: '$fs16',
  neomorphWrapper: {
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neomorphBackground,
  },
  contentWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  browseButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  leftIcon: {
    width: 30,
    height: 30,
    marginLeft: 25,
  },
  text: {
    fontSize: '$fs16',
    fontWeight: '500',
    textAlign: 'center',
    color: '$buttonTextHighlighted',
  },
  fullLineText: {
    fontSize: '$fs20',
    fontWeight: '600',
    color: '$buttonTextHighlighted',
  },
  smallText: {
    fontSize: '$smallTextSize',
    fontWeight: '500',
    textAlign: 'center',
    color: '$buttonTextHighlighted',
  },
  dropdownText: {
    flex: 1,
    color: '$buttonTextRegular',
  },
  browseText: {
    flex: 1,
    fontSize: '$fs18',
    fontWeight: '600',
    color: '$buttonTextRegular',
    textAlign: 'left',
    marginHorizontal: 20,
  },
  forcedDarkText: {
    color: '$buttonTextRegular',
  },
  browseArrow: {
    height: 12,
    width: 12,
    marginHorizontal: 10,
  },
  disabledText: {
    color: '$buttonTextDisabled',
  },
});
