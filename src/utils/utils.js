import {DIRECTION_LEFT, OFFSET} from '../constants/charConst';
import {Platform} from 'react-native'

//return array = [{x: number, y: number}]
export function generateCharValues(data) {
  return data.map((item, index) => ({x: index + 1, y: item.value}));
}

//return array = [string]
export function generateAxisValues(data, withOffset) {
  let axisValues = data.map(item => item.time);
  return withOffset ? ['', ...axisValues, ''] : axisValues;
}

let beforeData;

export const zoom = (data, page, direction) => {
  if (page === 1) {
    beforeData = data;
  }
  let centerX = 3 + OFFSET;
  let listSizeBeforePaginationLeft = data.length - beforeData.length + centerX;
  let xValue = direction === DIRECTION_LEFT ? listSizeBeforePaginationLeft : beforeData.length-2.5;
  beforeData = data;
  return ({scaleX: data.length / 6, scaleY: 0, xValue, yValue: 0});
};
