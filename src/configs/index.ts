import Config from 'react-native-config';

export const REQUEST_TIMEOUT = 20000;
export const BASE_URL = Config.BASE_URL;
export const PREFIX = 'gaia://';
const MINUTES = __DEV__ ? 45 : 10; // INACTIVITY MINUTES PART
const SECONDS = 0; // INACTIVITY SECONDS PART
export const INACTIVITY_TIME_ALLOWED = MINUTES * 60 * 1000 + SECONDS * 1000; // ms
export const INACTIVITY_CHECK_INTERVAL = 15 * 1000;
export const PASSWORD_MIN_LENGTH = 6; // TODO: delete this

// TODO: Change to needed intervals
export const MORNING_LIMITS = { low: '0:00:00', high: '8:00:00' };
export const AFTERNOON_LIMITS = { low: '8:00:00', high: '16:00:00' };
export const EVENING_LIMITS = { low: '16:00:00', high: '24:00:00' };

export const ENTRY_ABBREVIATIONS = {
  // TODO: Add I18n
  weight: 'WT',
  bloodPressure: 'BP',
  bloodGlucose: 'BG',
  carbs: 'CB',
  activity: 'AT',
  medications: 'MD',
};

export const ALLOW_DEBUG_LOGS: boolean = Config.ALLOW_DEBUG_LOGS === 'true';

// Authentication
// const auth = '/authentication';
// const v1Auth = '/v1/authentication';
// const v1Reg = '/v1/registration';
// const v1Forgot = '/v1/forgot';

// export const login = `${auth}${v1Auth}`;
// export const register = `${auth}${v1Reg}`;
// export const renew = `${auth}${v1Auth}/renew`;
// export const emailMagicLink = `${auth}${v1Auth}/email`;
// export const redeemMagicLink = `${auth}${v1Auth}/link`;
// export const forgotPassword = `${auth}${v1Forgot}`;
// export const redeemPassword = `${auth}${v1Forgot}/redeem`;

// Profile
// const profileService = '/profile';
// export const profile = `${profileService}/v1/profile`;
// export const device = `${profileService}/v1/device`;
// export const options = `${profileService}/v1/options`;
