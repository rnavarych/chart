import {processColor} from 'react-native';

import {
  CHART_BLOOD_PRESSURE_MIN_Y,
  CHART_BLOOD_PRESSURE_MAX_Y,
} from '../../constants';

export const yAxisConfig = {
  left: {
    enabled: false,
  },
  right: {
    // axisMaximum: CHART_BLOOD_PRESSURE_MAX_Y,
    // axisMinimum: CHART_BLOOD_PRESSURE_MIN_Y,
    drawAxisLine: false,
    drawAxisLines: false,
    labelCount: 7,
    gridColor: processColor('rgba(128, 147, 176, 0.2)'),
    textSize: 10,
    textColor: processColor('#8093b0'),
  },
};

export const xAxisConfig = {
  position: 'BOTTOM',
  textSize: 10,
  textColor: processColor('#8093b0'),
  gridColor: processColor('transparent'),
};

export const visibleRangeConfig = {
  x: {min: 1440, max: 1440}, // 1440 is count of minutes per day, as minute is minimum step for X axis
};

export const markerConfig = {
  enabled: true,
  markerColor: processColor('#f4f5f8'),
  textColor: processColor('#8093b0'),
};

export const legengConfig = {enabled: false};

export const chartDescription = {text: ''};
