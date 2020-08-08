import images from '../configs/images';

export const OFFSET = 0.5;
export const MIN_Y = 0;
export const MAX_Y = 300;
export const DIRECTION_LEFT = 'left';
export const DIRECTION_RIGHT = 'right';
export const ERROR_COEFFICIENT = 0.000001;

export const CHART_INTERVALS = ['D', 'W', 'M', 'Y'];
export const CHART_TYPES = [
  { type: 'weight', icon: images.icNavWeight },
  { type: 'medications', icon: images.icNavMeds },
  { type: 'carbohydrates', icon: images.icNavCarbs },
  { type: 'blood_pressure', icon: images.icNavHeartRate },
  { type: 'blood_glucose', icon: images.icNavGlucose },
  { type: 'activity', icon: images.browseActivity },
];
