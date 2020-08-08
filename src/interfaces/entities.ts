export interface Entry {
  color: EntryColor;
  time: string;
  timeSection: TimeSection;
  id: string;
  message: string;
  icon: string;
  note: string;
  value: string | string[];
  unit: string;
}

export enum EntryTypes {
  WEIGHT = 'body_weight',
  BLOOD_PRESSURE = 'systolic',
  BLOOD_GLUCOSE = 'blood_glucose',
  CARBS = 'carbohydrate',
  ACTIVITY = 'steps',
  MEDICATIONS = 'medication',
}

export enum EntryColor {
  RED = '#e93244',
  GREEN = '#73d865',
  YELLOW = '#e4de47',
}

export enum TimeSection {
  MORNING,
  AFTERNOON,
  EVENING,
}

export interface MainNotification {
  wheelImage: { uri: string } | string | null;
  bottomMessage: string;
  bottomImage: { uri: string } | string | null;
}
