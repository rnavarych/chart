import { generatePath } from './utils';
import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
// const { width: screenWidth } = Dimensions.get('screen');
// const screenHeight = 500;

// TODO: Edit proportions
// TODO: Add bubble title size calc
export const FIELD_SIZE = { width: screenWidth, height: (screenHeight * 300) / 820 };
export const COORD_OF_CENTER = { x: FIELD_SIZE.width / 2, y: FIELD_SIZE.height / 2 };
export const TOP_HEIGHT = 80;
export const TEXT_FONT = (screenHeight * 16) / 812;
export const INNER_RADIUS_BIG = (FIELD_SIZE.height * 95) / 340;
export const INNER_RADIUS_SMALL = (FIELD_SIZE.height * 70) / 340;
export const OUTER_RADIUS = (FIELD_SIZE.height * 140) / 340;
export const SMALL_RADIUS = 10;
export const bubbleR = (FIELD_SIZE.height * 25) / 340;
export const duration = 700;
export const BACK_RADIUS = (FIELD_SIZE.height * 175) / 340;
export const HORIZONTAL_PADDING = (FIELD_SIZE.width - 2*BACK_RADIUS)/2;
export const CY = TOP_HEIGHT + COORD_OF_CENTER.y;
export const CX = screenWidth / 2;
export const BUBBLE_BORDER_WIDTH = (screenHeight * 4) / 812;
export const SHORT_NAMES = {
  weight: 'WT',
  bloodPressure: 'BP',
  bloodGlucose: 'BG',
  carbs: 'CB',
  activity: 'AT',
  medications: 'MD',
};
export const ANGLE_120 = (2 * Math.PI) / 3;
export const ANGLE_240 = (4 * Math.PI) / 3;
export const ANGLE_360 = 2 * Math.PI;

const backgroundBigCircle = generatePath(INNER_RADIUS_BIG, OUTER_RADIUS, 0, ANGLE_360);

const arc1 = generatePath(
  INNER_RADIUS_SMALL + SMALL_RADIUS,
  INNER_RADIUS_BIG,
  0,
  ANGLE_120,
);
const arc1a = generatePath(
  INNER_RADIUS_SMALL,
  INNER_RADIUS_BIG - SMALL_RADIUS,
  0,
  ANGLE_120,
);
const text1 = generatePath(INNER_RADIUS_BIG, INNER_RADIUS_BIG, 0, ANGLE_120);

const arc2 = generatePath(
  INNER_RADIUS_SMALL + SMALL_RADIUS,
  INNER_RADIUS_BIG,
  ANGLE_120,
  ANGLE_240,
);
const arc2a = generatePath(
  INNER_RADIUS_SMALL,
  INNER_RADIUS_BIG - SMALL_RADIUS,
  ANGLE_120,
  ANGLE_240,
);
const text2 = generatePath(INNER_RADIUS_BIG, INNER_RADIUS_BIG, ANGLE_240, ANGLE_120);

const arc3 = generatePath(
  INNER_RADIUS_SMALL + SMALL_RADIUS,
  INNER_RADIUS_BIG,
  ANGLE_240,
  ANGLE_360,
);
const arc3a = generatePath(
  INNER_RADIUS_SMALL,
  INNER_RADIUS_BIG - SMALL_RADIUS,
  ANGLE_240,
  ANGLE_360,
);
const text3 = generatePath(INNER_RADIUS_BIG, INNER_RADIUS_BIG, ANGLE_240, ANGLE_360);

export default {
  backgroundBigCircle,
  arc1,
  arc1a,
  text3,
  arc3a,
  arc3,
  text2,
  arc2a,
  arc2,
  text1,
};
