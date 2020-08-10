import {DIRECTION_LEFT, OFFSET} from '../constants/charConst';
import moment from 'moment';

import {X_AXIS_VALUES} from '../constants';

const MINUTES_PER_HOUR = 60;
const MILLIS_PER_HOUR = 60 * 60 * 1000;
const MILLIS_PER_DAY = 24 * MILLIS_PER_HOUR;

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

/*
  Minute will be the smallest step for X axis, but we need to draw only this 4 values:
  12AM, 6AM, 6PM, 12PM on the axis.
  So this method will add (4 * daysCount + 1) bearing points (with 'bearing' property) to the data array
  in order to draw only required values on X axis without drawing bearing points with color.
  This method will also add 'index' property to the points indicating number of minutes passed from
  00:00 of the first requesed day.
  'label' property indicates X axis value for the point.
*/
export const fillDaysDataWithBearingItemsAndSort = (data = [], daysCount) => {
  let frd = new Date().getTime() - (daysCount - 1) * MILLIS_PER_DAY; // first requested day
  const frdDate = new Date(frd);
  frdDate.setHours(0, 0, 0, 0);
  frd = frdDate.getTime();

  // generate bearing points
  const bearing = [];
  for (let i = 0; i < daysCount * 4 + 1; i++) {
    bearing.push({
      bearing: true,
      index: i * 6 * MINUTES_PER_HOUR,
      label: X_AXIS_VALUES[i % 4],
      color: 'transparent',
      colors: ['transparent', 'transparent'],
      time: frd + i * 6 * MILLIS_PER_HOUR,
      value: [50, 50],
    });
  }

  // calculate indexies for data items
  for (let i = 0; i < data.length; i++) {
    data[i].label = '';
    data[i].index = Math.floor((data[i].time - frd) / 60000);
  }

  const result = [...data, ...bearing];
  result.sort((a, b) => a.time - b.time);

  return result;
};

export const sameDate = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export const sortBloodPressureData = (data = []) => {
  data.sort((a, b) => a.time - b.time);
  return data;
};
