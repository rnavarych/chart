import { gql } from 'apollo-boost';

export const CREATE_PROFILE = gql`
  mutation createProfile($user_id: String!, $profile: ProfileInput!) {
    createProfile(params: { user_id: $user_id, profile: $profile }) {
      user_id
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($user_id: String!, $profile: ProfileInput) {
    updateProfile(params: { user_id: $user_id, profile: $profile }) {
      user_id
    }
  }
`;

export const FETCH_PROFILE = gql`
  query fetchProfile($user_id: String!) {
    fetchProfile(params: { user_id: $user_id }) {
      full_name
      dob
      timezone
      city
      country
      locale
      state
      zip_code
      preferred_name
      weight
      height
      address1
      address2
    }
  }
`;

export const GET_DEVICES = gql`
  query getDevices($user_id: String!) {
    getDevices(params: { user_id: $user_id }) {
      id
      user_id
      device_name
      device_id
      created
    }
  }
`;

export const UPSERT_DEVICE = gql`
  mutation upsertDevice($user_id: String!, $device_name: String!, $device_id: String!) {
    upsertDevice(
      params: { user_id: $user_id, device_name: $device_name, device_id: $device_id }
    ) {
      user_id
      device_name
      device_id
    }
  }
`;

export const DELETE_DEVICE = gql`
  mutation deleteDevice($user_id: String!, $id: Int!) {
    deleteDevice(params: { user_id: $user_id, id: $id }) {
      user_id
      id
    }
  }
`;
