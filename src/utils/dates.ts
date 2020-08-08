import { SERVER_DATE_FORMAT } from '../constants';
import { MORNING_LIMITS, AFTERNOON_LIMITS, EVENING_LIMITS } from '../configs';

import { Entry } from '../interfaces/entities';
import moment from 'moment';

import { TimeSection } from '../interfaces/entities';

export const DATE_FORMAT = 'DD.MM.YYYY';
export const HOURS_MINUTES_SECONDS_FORMAT = 'HH:mm:ss';
export const IS = 's';

export const diffBetweenDatesMoreThan = (
  beforeDate: number,
  afterDate: number,
  interval: number,
) => {
  if (afterDate < beforeDate) throw Error('The second argument should be latest date.');
  if (afterDate - beforeDate >= interval) {
    return true;
  }
  return false;
};

export const convertServerStringToDate = (serverDate: string): Date => {
  return new Date(serverDate);
};

export const convertDateToServerString = (date: Date): string => {
  return moment(date).format(SERVER_DATE_FORMAT);
};

export const formatDate = (time: string | Date): string =>
  moment(time).format(DATE_FORMAT);

export const format = (time: string | Date, formatter: string): string =>
  moment(time).format(formatter);

export const formatTimestamp = (timestamp: number, formatter: string): string =>
  moment(timestamp).format(formatter);

export const isBetween_Hours = (
  timeToCheck: string,
  lowLimit: string,
  highLimit: string,
) => {
  const time = moment(
    format(timeToCheck, HOURS_MINUTES_SECONDS_FORMAT),
    HOURS_MINUTES_SECONDS_FORMAT,
  );
  const minTime = moment(lowLimit, HOURS_MINUTES_SECONDS_FORMAT);
  const maxTime = moment(highLimit, HOURS_MINUTES_SECONDS_FORMAT);

  return time.isBetween(minTime, maxTime);
};

export const isSame_Hours = (time1: string, time2: string) => {
  const momentTime1 = moment(time1, HOURS_MINUTES_SECONDS_FORMAT);
  const momentTime2 = moment(time2, HOURS_MINUTES_SECONDS_FORMAT);

  return momentTime1.isSame(momentTime2);
};

export const detectTimeSection = (time: string): TimeSection => {
  if (
    isBetween_Hours(time, MORNING_LIMITS.low, MORNING_LIMITS.high) ||
    isSame_Hours(time, MORNING_LIMITS.low)
  ) {
    return TimeSection.MORNING;
  }
  if (
    isBetween_Hours(time, AFTERNOON_LIMITS.low, AFTERNOON_LIMITS.high) ||
    isSame_Hours(time, AFTERNOON_LIMITS.low)
  ) {
    return TimeSection.AFTERNOON;
  }
  if (
    isBetween_Hours(time, EVENING_LIMITS.low, EVENING_LIMITS.high) ||
    isSame_Hours(time, EVENING_LIMITS.low) ||
    isSame_Hours(time, EVENING_LIMITS.high) // TODO: 24 and 0 hours not equal for moment library
  ) {
    return TimeSection.EVENING;
  }
  throw Error('Timesection limits are not covering the clock completely. They should.');
};

export const checkCurrentTimeSection = () => {
  return detectTimeSection(moment(new Date()).toLocaleString());
};

export const compareTime = (time1: string, time2: string, format: string) => {
  const momentTime1 = moment(time1, format);
  const momentTime2 = moment(time2, format);
  if (moment(momentTime1).isBefore(momentTime2)) {
    return -1;
  }
  if (moment(momentTime1).isAfter(momentTime2)) {
    return 1;
  }
  return 0;
};

export const getStartAndEndOfTheDay = (format: string): { start: Date; end: Date } => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start.getTime());
  end.setHours(23, 59, 59, 999);

  return { start, end };
};
