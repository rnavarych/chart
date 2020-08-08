import moment from 'moment';

import { Dispatch } from 'redux';

import { Entry, EntryColor, EntryTypes } from '../interfaces/entities';
import { CreateEntryProps } from '../interfaces/props';
import * as DateUtils from './dates';

import images from '../configs/images';
import { initiateNewEntryAddition, markFirstEntryAdded } from '../actions/wheel';
import { globalStore } from '../store';
import { ENTRY_ABBREVIATIONS } from '../configs';

import { v4 as uuidv4 } from 'uuid';

interface UserNote {
  type: string;
  value: string;
}

interface ServerEntry {
  unit: string;
  value: number;
  id: string;
  type: string;
  origin: string;
  start_time: string;
  end_time: string;
  user_notes: UserNote[];
}

export const composeEntry = (props: ServerEntry): Entry => {
  const { id, end_time, user_notes, value, unit, type } = props;
  const timeSection = DateUtils.detectTimeSection(end_time);
  const time = DateUtils.format(end_time, DateUtils.HOURS_MINUTES_SECONDS_FORMAT);
  const { color, note } = determineColorAndMessage(String(value), type);
  return {
    id,
    time,
    timeSection,
    message: '',
    color,
    icon: getIconByEntryType(type),
    note,
    value: String(value),
    unit,
  };
};

// Helper to build body of an entry
export const createEntry = (props: CreateEntryProps): Entry => {
  const { color, message, creationTime, icon, note, value, unit } = props;
  const timeSection = DateUtils.detectTimeSection(creationTime);
  const time = DateUtils.format(creationTime, DateUtils.HOURS_MINUTES_SECONDS_FORMAT);
  return {
    id: uuidv4(),
    time,
    timeSection,
    message,
    color,
    icon,
    note,
    value,
    unit,
  };
};

// Needed just because we need to catch the first time creation on an entry
//  and update the flag in the store
export const entryCreationMiddleware = (
  dispatch: Dispatch,
  value: string | string[] | boolean,
  type: EntryTypes,
  time?: string,
) => {
  if (globalStore.store) {
    const firstEntryAdded = globalStore.store.getState().wheel.addedEntryFirstTime;
    if (!firstEntryAdded) {
      dispatch(markFirstEntryAdded());
    }
  }
  // TODO: check this is it needed?
  const creationTime = time
    ? moment(time, 'HH:mm').toLocaleString()
    : moment(new Date()).toLocaleString();
  dispatch(
    initiateNewEntryAddition(calculateAndBuildNewEntry(value, type, creationTime)),
  );
};

export const calculateAndBuildNewEntry = (
  value: string | string[] | boolean,
  type: EntryTypes,
  creationTime: string,
) => {
  const { color, message, note } = determineColorAndMessage(value, type);
  const evaluatedValue =
    typeof value === 'boolean' ? determineValueForBoolean(value, type) : value;
  const unit = determineUnit(type);
  return createEntry({
    color,
    message,
    creationTime,
    icon: getIconByEntryType(type),
    note,
    value: evaluatedValue,
    unit,
  });
};

export const determineValueForBoolean = (value: boolean, type: EntryTypes) => {
  switch (type) {
    case EntryTypes.MEDICATIONS:
      return value ? 'Medications Taken' : 'Medications Not Taken';
    default:
      return '';
  }
};

// TODO: maybe use it? to deal with server bad units
export const determineUnit = (type: EntryTypes): string => {
  switch (type) {
    case EntryTypes.ACTIVITY:
      // TODO: add active zone handling and workout
      return ' steps';
    case EntryTypes.WEIGHT:
      return ' lbs';
    case EntryTypes.MEDICATIONS:
      return '';
    case EntryTypes.CARBS:
      return 'g carbs';
    case EntryTypes.BLOOD_GLUCOSE:
      return ' mg/dl';
    case EntryTypes.BLOOD_PRESSURE:
      return ' mmHg';
    default:
      return '';
  }
};

export const determineColorAndMessage = (
  value: string | string[] | boolean,
  type: EntryTypes,
): { color: EntryColor; message: string; note: string } => {
  if (Array.isArray(value)) {
    switch (type) {
      case EntryTypes.BLOOD_PRESSURE:
        const [upper, lower] = value;
        return evaluateValueForBloodPressure(upper, lower);
      default:
        return {
          color: EntryColor.RED,
          message: 'Error occured',
          note: '',
        };
    }
  }
  if (typeof value === 'boolean') {
    switch (type) {
      case EntryTypes.MEDICATIONS:
        return evaluateValueForMedications(value);
      default:
        return {
          color: EntryColor.RED,
          message: 'Error occured',
          note: '',
        };
    }
  }
  if (typeof value === 'string') {
    switch (type) {
      case EntryTypes.ACTIVITY:
        return evaluateValueForActivity(value);
      case EntryTypes.WEIGHT:
        // TODO: add real data here for prev weight
        return evaluateValueForWeight(value, '80');
      case EntryTypes.CARBS:
        return evaluateValueForCarbs(value);
      case EntryTypes.BLOOD_GLUCOSE:
        return evaluateValueForBloodGlucose(value);
      default:
        return {
          color: EntryColor.RED,
          message: 'Error occured',
          note: '',
        };
    }
  }
  return {
    color: EntryColor.RED,
    message: 'Error occured',
    note: '',
  };
};

const evaluateValueForActivity = (value: string) => {
  return {
    color: EntryColor.GREEN,
    message: `${value}\nGreat job!`,
    note: 'Keep it up!',
  };
};

const evaluateValueForBloodGlucose = (value: string) => {
  const glucoseValue = parseFloat(value);
  if (glucoseValue < 50) {
    return {
      color: EntryColor.RED,
      message: `${value} mg/dl`,
      note: 'Severe low blood glucose\nSeek immediate medical advice',
    };
  }
  if (glucoseValue >= 50 && glucoseValue < 70) {
    return {
      color: EntryColor.RED,
      message: `${value} mg/dl`,
      note: 'Low blood glucose\nCorrect with 15 grams of carbohydrates',
    };
  }
  if (glucoseValue >= 70 && glucoseValue <= 180) {
    return {
      color: EntryColor.GREEN,
      message: `${value} mg/dl`,
      note: 'Congratulation!\nYou are in target range',
    };
  }
  if (glucoseValue >= 181 && glucoseValue <= 240) {
    return {
      color: EntryColor.YELLOW,
      message: `${value} mg/dl`,
      note: 'Blood glucose is high\nMedications, diet and exercise may bring it down',
    };
  }
  if (glucoseValue > 240) {
    return {
      color: EntryColor.RED,
      message: `${value} mg/dl`,
      note: 'Blood glucose is too high\nIf frequent seek medical advice',
    };
  }
  return {
    color: EntryColor.RED,
    message: `${value} mg/dl`,
    note: 'Error',
  };
};

const evaluateValueForBloodPressure = (upper: string, lower: string) => {
  const upperPressure = parseInt(upper);
  const lowerPressure = parseInt(lower);
  if (upperPressure < 100 && lowerPressure < 60) {
    return {
      color: EntryColor.RED,
      message: `${upperPressure}/${lowerPressure} mmHg`,
      note: 'If you have dizziness please seek medical advice',
    };
  }
  if (
    upperPressure <= 120 &&
    upperPressure >= 100 &&
    lowerPressure >= 60 &&
    lowerPressure < 80
  ) {
    return {
      color: EntryColor.GREEN,
      message: `${upperPressure}/${lowerPressure} mmHg`,
      note: '',
    };
  }
  if (upperPressure <= 129 && upperPressure > 120 && lowerPressure < 80) {
    return {
      color: EntryColor.GREEN,
      message: `${upperPressure}/${lowerPressure} mmHg`,
      note: '',
    };
  }
  if (
    (upperPressure <= 139 && upperPressure >= 130) ||
    (lowerPressure >= 80 && lowerPressure <= 89)
  ) {
    return {
      color: EntryColor.YELLOW,
      message: `${upperPressure}/${lowerPressure} mmHg`,
      note: '',
    };
  }
  if (upperPressure > 140 || lowerPressure > 90) {
    return {
      color: EntryColor.RED,
      message: `${upperPressure}/${lowerPressure} mmHg`,
      note: 'If you have dizziness please seek medical advice',
    };
  }
  return {
    color: EntryColor.GREEN,
    message: 'Great job!',
    note: '',
  };
};

const evaluateValueForCarbs = (value: string) => {
  return {
    color: EntryColor.GREEN,
    message: `${value}g`,
    note:
      'Avoid sugar and sugary drinks\nLimit carbs from white flour products like white bread, pizza, pasta\nAnd limit starchy food like white potato, rice and corn',
  };
};

const evaluateValueForMedications = (taken: boolean) => {
  if (taken) {
    return {
      color: EntryColor.GREEN,
      message: 'Well done!',
      note: '',
    };
  } else {
    return {
      color: EntryColor.RED,
      message: "Don't forget next time!",
      note: '',
    };
  }
};

const evaluateValueForWeight = (value: string, previousWeight: string) => {
  const weight = parseInt(value);
  const prevWeight = parseInt(previousWeight);
  if (weight < prevWeight) {
    return {
      color: EntryColor.GREEN,
      message: `${weight} kg\nWow!`,
      note: 'Look like you are on the right track!',
    };
  }
  if (weight === prevWeight) {
    return {
      color: EntryColor.GREEN,
      message: `${weight} kg`,
      note: 'Looks good!',
    };
  }
  if (weight > prevWeight) {
    return {
      color: EntryColor.YELLOW,
      message: `${weight} kg\nCool!`,
      note: 'Good people should be huge!',
    };
  }
  return {
    color: EntryColor.GREEN,
    message: 'Error',
    note: '',
  };
};

export const getIconByEntryType = (type: EntryTypes): string => {
  switch (type) {
    case EntryTypes.WEIGHT:
      return images.icNavWeight;
    case EntryTypes.ACTIVITY:
      return images.icNavActivity;
    case EntryTypes.BLOOD_GLUCOSE:
      return images.icNavGlucose;
    case EntryTypes.BLOOD_PRESSURE:
      return images.icNavHeartRate;
    case EntryTypes.MEDICATIONS:
      return images.icNavMeds;
    case EntryTypes.CARBS:
      return images.icNavCarbs;
    default:
      // TODO: handling this case needed
      return 'Error';
  }
};
