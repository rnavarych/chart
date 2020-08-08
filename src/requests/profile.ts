import * as endpoints from '../configs';
import { callApi } from '../services/rest';

export interface ProfileBody {
  full_name: string;
  country: string;
  timezone: string;
  preferred_name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  height?: number;
  weight?: number;
  locale?: string;
  gender?: string;
  dob?: string; // RFC3339 "1990-07-23T00:00:00Z"
}

export interface ProfileOptionTuple {
  name: string;
  value: string;
}

export interface ProfileOptions {
  options: Array<ProfileOptionTuple>;
}

export const createProfile = (
  userId: string,
  body: ProfileBody,
): Promise<any> => {
  return callApi(`${endpoints.profile}/${userId}`, 'POST', body);
};

export const updateProfile = (
  userId: string,
  body: ProfileBody,
): Promise<any> => {
  return callApi(`${endpoints.profile}/${userId}`, 'PUT', body);
};

export const fetchProfile = (userId: string): Promise<ProfileBody> => {
  return callApi(`${endpoints.profile}/${userId}`, 'GET');
};

export const updateOptions = (
  userId: string,
  options: ProfileOptions,
): Promise<any> => {
  return callApi(`${endpoints.options}/${userId}`, 'PUT', options);
};
