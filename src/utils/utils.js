import {DIRECTION_LEFT, OFFSET} from '../constants/charConst';
import moment from 'moment';

//return array = [{x: number, y: number}]
export function generateCharValues(data) {
  return data.map((item, index) => ({x: index + 1, y: item.value}));
}

//return array = [string]
export function generateAxisValues(data, withOffset) {
  let axisValues = data.map((item) => moment(item.end_time).format('h A'));
  return withOffset ? ['', ...axisValues, ''] : axisValues;
}

let beforeData;

export const zoom = (data, page, direction) => {
  if (page === 1) {
    beforeData = data;
  }
  let centerX = 3 + OFFSET;
  let listSizeBeforePaginationLeft = data.length - beforeData.length + centerX;
  let xValue =
    direction === DIRECTION_LEFT
      ? listSizeBeforePaginationLeft
      : beforeData.length - 2.5;
  beforeData = data;
  return {scaleX: data.length / 6, scaleY: 0, xValue, yValue: 0};
};

export const dataByWeek = (bloodGlucose) => {
  let allWeeks = [];
  let weeks = [];
  let week = 30;
  let isLastItemPerDate = false;
  bloodGlucose.map((item) => {
    if (isLastItemPerDate) {
      isLastItemPerDate = false;
      week = moment(item.end_time).week();
    }
    if (moment(item.end_time).week() === week) {
      weeks = [...weeks, item];
    } else {
      isLastItemPerDate = true;
      allWeeks = [...allWeeks, weeks];
      weeks = [item];
    }
  });
  allWeeks = [...allWeeks, weeks];
  return allWeeks;
};

export const descriptionDate = (start, end) => {
  return `${moment(start).format('DD-MM')} — ${moment(end).format('DD-MM')}`;
};

export const sortBloodPressureData = (data = []) => {
  data.sort((a, b) => a.time - b.time);
  return data;
};
