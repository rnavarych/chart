import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import Colors from './colors';

const colors = () => ({
  // UI elements' colors
  // TODO: remove or replace obsolete colors
  $screenBackground: Colors.bgLightGray,
  $headerBg: Colors.redCvs,
  $inputBg: Colors.grayExtralight,
  $errorColor: Colors.redDark,

  // these colors are just good to keep around
  $white: Colors.white,
  $black: Colors.black,

  // button
  $buttonTextRegular: Colors.blueWood,
  $buttonTextHighlighted: Colors.accent1,
  $buttonTextDisabled: Colors.grayLight,

  // text
  $deepOceanColor: Colors.deepOceanColor,
  $lightGreyText: Colors.lightGreyText,
  $textPrimary: Colors.blueWood,
  $textAccent: Colors.bluePacific,
  $clickableText: Colors.redLight,

  // switch
  $switchPositiveColor: Colors.accent1,
});

const fonts = () => ({});

const fontSizes = () => ({
  $fs51: '51 * $fontRem',
  $fs36: '36 * $fontRem',
  $fs35: '35 * $fontRem',
  $fs25: '25 * $fontRem',
  $fs24: '24 * $fontRem',
  $fs23: '23 * $fontRem',
  $fs22: '22 * $fontRem',
  $fs21: '21 * $fontRem',
  $fs20: '20 * $fontRem',
  $fs19: '19 * $fontRem',
  $fs18: '18 * $fontRem',
  $fs17: '17 * $fontRem',
  $fs16: '16 * $fontRem',
  $fs15: '15 * $fontRem',
  $fs14: '14 * $fontRem',
  $fs13: '13 * $fontRem',
  $fs12: '12 * $fontRem',
  $fs11: '11 * $fontRem',
  $fs10: '10 * $fontRem',
});

const defaults = () => ({
  $screenWidth: Dimensions.get('screen').width,
  $screenHeight: Dimensions.get('screen').height,
  $toolbarHeight: 56,
});

const dimens = () => ({
  $screenPaddingHorizotal: '7%',
  $screenPaddingVertical: 10,
  $listHorizontalPadding: '7%',
  $inputWidthDefault: 200,
  $inputFullLineWidthPercent: 0.85,
});

const neomorphStyles = () => ({
  $neoBorderRadius: 10,
  $neoComponentHeight: 45,
});

const rems = () => ({
  $fontRem: 1,
});

EStyleSheet.build({
  ...rems(),
  ...colors(),
  ...fonts(),
  ...fontSizes(),
  ...defaults(),
  ...dimens(),
  ...neomorphStyles(),
});
