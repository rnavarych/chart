export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  CountryCode: any;
  TimeZone: any;
  Locale: any;
  DateTime: any;
};


export type CreateEventParams = {
  user_id: Scalars['ID'];
  type: Scalars['String'];
  source_type: Scalars['String'];
  category: Scalars['String'];
  start_time: Scalars['DateTime'];
  end_time: Scalars['DateTime'];
  user_notes?: Maybe<Array<Maybe<UserNoteInput>>>;
  metrics: Array<MetricInput>;
  segments?: Maybe<Array<Maybe<SegmentInput>>>;
};

export type CreateEventResponse = {
   __typename?: 'CreateEventResponse';
  user_id: Scalars['ID'];
};

export type CreateProfileParams = {
  user_id: Scalars['String'];
  profile: ProfileInput;
};

export type CreateProfileResponse = {
   __typename?: 'CreateProfileResponse';
  user_id: Scalars['String'];
  profile: Profile;
};


export type DeleteDeviceParams = {
  user_id: Scalars['String'];
  id: Scalars['Int'];
};

export type DeleteDeviceResponse = {
   __typename?: 'DeleteDeviceResponse';
  user_id: Scalars['String'];
  id: Scalars['Int'];
};

export type Device = {
   __typename?: 'Device';
  id: Scalars['ID'];
  user_id: Scalars['String'];
  device_name: Scalars['String'];
  device_id: Scalars['String'];
  created: Scalars['String'];
};

export type EmailMagicLinkParams = {
  email: Scalars['String'];
};

export type EmailMagicLinkResponse = {
   __typename?: 'EmailMagicLinkResponse';
  email: Scalars['String'];
};

export type EventCategory = {
   __typename?: 'EventCategory';
  name: Scalars['String'];
  sources: Array<Maybe<EventSource>>;
};

export type EventSource = {
   __typename?: 'EventSource';
  type: Scalars['String'];
  metrics: Array<Maybe<Metric>>;
};

export type EventType = {
   __typename?: 'EventType';
  type: Scalars['String'];
  categories: Array<Maybe<EventCategory>>;
};

export type FetchMultipleProfilesParams = {
  user_ids: Array<Maybe<Scalars['String']>>;
};

export type FetchProfileParams = {
  user_id: Scalars['String'];
};

export type FoodSegmentInput = {
  brand: Scalars['String'];
  name: Scalars['String'];
  metrics: Array<MetricInput>;
  serving?: Maybe<Serving>;
};

export type GetDevicesParams = {
  user_id: Scalars['String'];
};

export type GetDevicesResponse = {
   __typename?: 'GetDevicesResponse';
  devices?: Maybe<Array<Maybe<Device>>>;
};

export type GetMetricsForUserByTypesParams = {
  user_id: Scalars['ID'];
  types: Array<Scalars['String']>;
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  count?: Maybe<Scalars['Int']>;
};

export type GetMetricsForUserByTypesResponse = {
   __typename?: 'GetMetricsForUserByTypesResponse';
  metrics?: Maybe<Array<Maybe<MetricType>>>;
};

export type GetMetricTypesForUserParams = {
  user_id: Scalars['ID'];
};

export type GetMetricTypesForUserResponse = {
   __typename?: 'GetMetricTypesForUserResponse';
  user_id: Scalars['ID'];
  types: Array<Maybe<Scalars['String']>>;
};

export type GetProvisionedUserParams = {
  user_id: Scalars['ID'];
};

export type GetSegmentsForUserParams = {
  user_id: Scalars['ID'];
  type: Scalars['String'];
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
};

export type GetSegmentsForUserResponse = {
   __typename?: 'GetSegmentsForUserResponse';
  segments: Array<Maybe<Segment>>;
};

export type GetSegmentTypesForUserParams = {
  user_id: Scalars['ID'];
};

export type HideMetricsParams = {
  user_id: Scalars['ID'];
  metric_ids: Array<Scalars['Int']>;
};

export type HideMetricsResponse = {
   __typename?: 'HideMetricsResponse';
  user_id: Scalars['ID'];
  metric_ids: Array<Scalars['Int']>;
};

export type JwtResponse = {
   __typename?: 'JWTResponse';
  token: Scalars['String'];
};


export type LoginParams = {
  email: Scalars['String'];
  password: Scalars['String'];
  remember_me?: Maybe<Scalars['Boolean']>;
};

export type MarkMetricsAsSeenParams = {
  user_id: Scalars['ID'];
  metric_ids: Array<Scalars['Int']>;
};

export type MarkMetricsAsSeenResponse = {
   __typename?: 'MarkMetricsAsSeenResponse';
  user_id: Scalars['ID'];
  metric_ids: Array<Scalars['Int']>;
};

export type Metric = {
   __typename?: 'Metric';
  id: Scalars['ID'];
  origin?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
  start_time?: Maybe<Scalars['DateTime']>;
  end_time?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['String']>;
  seen_at?: Maybe<Scalars['DateTime']>;
  user_notes?: Maybe<Array<Maybe<UserNote>>>;
};

export type MetricInput = {
  origin: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['Float'];
  unit: Scalars['String'];
};

export type MetricType = {
   __typename?: 'MetricType';
  type: Scalars['String'];
  user_id: Scalars['String'];
  event_types: Array<Maybe<EventType>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createEvent?: Maybe<CreateEventResponse>;
  createProfile?: Maybe<CreateProfileResponse>;
  deleteDevice?: Maybe<DeleteDeviceResponse>;
  emailMagicLink?: Maybe<EmailMagicLinkResponse>;
  hideMetrics?: Maybe<HideMetricsResponse>;
  login?: Maybe<JwtResponse>;
  markMetricsAsSeen?: Maybe<MarkMetricsAsSeenResponse>;
  provisionUser?: Maybe<ProvisionedUser>;
  redeemForgotPasswordToken?: Maybe<RedeemForgotPasswordTokenResponse>;
  redeemMagicLink?: Maybe<JwtResponse>;
  refreshProvisionedUser?: Maybe<ProvisionedUser>;
  register?: Maybe<JwtResponse>;
  renew?: Maybe<JwtResponse>;
  requestForgotPasswordToken?: Maybe<RequestForgotPasswordTokenResponse>;
  requestVerificationEmail?: Maybe<RequestVerificationEmailResponse>;
  updateProfile?: Maybe<UpdateProfileResponse>;
  upsertDevice?: Maybe<UpsertDeviceResponse>;
  upsertOptions?: Maybe<UpsertOptionsResponse>;
  verifyUserEmail?: Maybe<JwtResponse>;
};


export type MutationCreateEventArgs = {
  params?: Maybe<CreateEventParams>;
};


export type MutationCreateProfileArgs = {
  params?: Maybe<CreateProfileParams>;
};


export type MutationDeleteDeviceArgs = {
  params?: Maybe<DeleteDeviceParams>;
};


export type MutationEmailMagicLinkArgs = {
  params?: Maybe<EmailMagicLinkParams>;
};


export type MutationHideMetricsArgs = {
  params?: Maybe<HideMetricsParams>;
};


export type MutationLoginArgs = {
  params?: Maybe<LoginParams>;
};


export type MutationMarkMetricsAsSeenArgs = {
  params?: Maybe<MarkMetricsAsSeenParams>;
};


export type MutationProvisionUserArgs = {
  params?: Maybe<ProvisionUserParams>;
};


export type MutationRedeemForgotPasswordTokenArgs = {
  params?: Maybe<RedeemForgotPasswordTokenParams>;
};


export type MutationRedeemMagicLinkArgs = {
  params?: Maybe<RedeemMagicLinkParams>;
};


export type MutationRefreshProvisionedUserArgs = {
  params?: Maybe<RefreshProvisionedUserParams>;
};


export type MutationRegisterArgs = {
  params?: Maybe<RegisterParams>;
};


export type MutationRenewArgs = {
  params?: Maybe<RenewParams>;
};


export type MutationRequestForgotPasswordTokenArgs = {
  params?: Maybe<RequestForgotPasswordTokenParams>;
};


export type MutationRequestVerificationEmailArgs = {
  params?: Maybe<RequestVerificationEmailParams>;
};


export type MutationUpdateProfileArgs = {
  params?: Maybe<UpdateProfileParams>;
};


export type MutationUpsertDeviceArgs = {
  params?: Maybe<UpsertDeviceParams>;
};


export type MutationUpsertOptionsArgs = {
  params?: Maybe<UpsertOptionsParams>;
};


export type MutationVerifyUserEmailArgs = {
  params?: Maybe<VerifyUserEmailParams>;
};

export type Profile = {
   __typename?: 'Profile';
  full_name?: Maybe<Scalars['String']>;
  preferred_name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  timezone?: Maybe<Scalars['TimeZone']>;
  locale?: Maybe<Scalars['Locale']>;
  dob?: Maybe<Scalars['DateTime']>;
};

export type ProfileInput = {
  full_name?: Maybe<Scalars['String']>;
  preferred_name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip_code?: Maybe<Scalars['String']>;
  country: Scalars['CountryCode'];
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  timezone: Scalars['TimeZone'];
  locale?: Maybe<Scalars['Locale']>;
  dob?: Maybe<Scalars['DateTime']>;
};

export type ProfileOption = {
   __typename?: 'ProfileOption';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ProfileOptionInput = {
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ProfileWithOptions = {
   __typename?: 'ProfileWithOptions';
  full_name?: Maybe<Scalars['String']>;
  preferred_name?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  height?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  timezone?: Maybe<Scalars['TimeZone']>;
  locale?: Maybe<Scalars['Locale']>;
  dob?: Maybe<Scalars['DateTime']>;
  options?: Maybe<Array<Maybe<ProfileOption>>>;
};

export type ProvisionedUser = {
   __typename?: 'ProvisionedUser';
  user_id: Scalars['ID'];
  validic_user_id: Scalars['ID'];
  marketplace_token: Scalars['String'];
  marketplace_url: Scalars['String'];
  mobile_token: Scalars['String'];
};

export type ProvisionUserParams = {
  user_id: Scalars['ID'];
};

export type Query = {
   __typename?: 'Query';
  fetchMultipleProfiles?: Maybe<Array<Maybe<ProfileWithOptions>>>;
  fetchProfile?: Maybe<ProfileWithOptions>;
  getDevices?: Maybe<Array<Maybe<Device>>>;
  getMetricTypesForUser?: Maybe<GetMetricTypesForUserResponse>;
  getMetricsForUserByTypes?: Maybe<GetMetricsForUserByTypesResponse>;
  getProvisionedUser?: Maybe<ProvisionedUser>;
  getSegmentTypesForUser?: Maybe<Array<Maybe<SegmentType>>>;
  getSegmentsForUser?: Maybe<GetSegmentsForUserResponse>;
};


export type QueryFetchMultipleProfilesArgs = {
  params?: Maybe<FetchMultipleProfilesParams>;
};


export type QueryFetchProfileArgs = {
  params?: Maybe<FetchProfileParams>;
};


export type QueryGetDevicesArgs = {
  params?: Maybe<GetDevicesParams>;
};


export type QueryGetMetricTypesForUserArgs = {
  params?: Maybe<GetMetricTypesForUserParams>;
};


export type QueryGetMetricsForUserByTypesArgs = {
  params?: Maybe<GetMetricsForUserByTypesParams>;
};


export type QueryGetProvisionedUserArgs = {
  params?: Maybe<GetProvisionedUserParams>;
};


export type QueryGetSegmentTypesForUserArgs = {
  params?: Maybe<GetSegmentTypesForUserParams>;
};


export type QueryGetSegmentsForUserArgs = {
  params?: Maybe<GetSegmentsForUserParams>;
};

export type RedeemForgotPasswordTokenParams = {
  email: Scalars['String'];
  forgot_token: Scalars['String'];
  password: Scalars['String'];
};

export type RedeemForgotPasswordTokenResponse = {
   __typename?: 'RedeemForgotPasswordTokenResponse';
  email?: Maybe<Scalars['String']>;
  forgot_token?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type RedeemMagicLinkParams = {
  email: Scalars['String'];
  code: Scalars['String'];
  remember_me?: Maybe<Scalars['Boolean']>;
};

export type RefreshProvisionedUserParams = {
  user_id: Scalars['ID'];
};

export type RegisterParams = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  external_id?: Maybe<Scalars['String']>;
};

export type RenewParams = {
  token: Scalars['String'];
};

export type RequestForgotPasswordTokenParams = {
  email: Scalars['String'];
  role?: Maybe<Scalars['String']>;
};

export type RequestForgotPasswordTokenResponse = {
   __typename?: 'RequestForgotPasswordTokenResponse';
  email: Scalars['String'];
  role?: Maybe<Scalars['String']>;
};

export type RequestVerificationEmailParams = {
  user_id: Scalars['String'];
  role?: Maybe<Scalars['String']>;
};

export type RequestVerificationEmailResponse = {
   __typename?: 'RequestVerificationEmailResponse';
  user_id: Scalars['String'];
  role?: Maybe<Scalars['String']>;
};

export type Segment = {
   __typename?: 'Segment';
  user_id: Scalars['ID'];
  type: Scalars['String'];
  event_types?: Maybe<Array<Maybe<EventType>>>;
};

export type SegmentInput = {
  name: Scalars['String'];
  food: Array<FoodSegmentInput>;
};

export type SegmentType = {
   __typename?: 'SegmentType';
  user_id: Scalars['ID'];
  types: Array<Maybe<Scalars['String']>>;
};

export type Serving = {
  amount: Scalars['Float'];
  unit_name: Scalars['String'];
};


export type UpdateProfileParams = {
  user_id: Scalars['String'];
  profile?: Maybe<ProfileInput>;
};

export type UpdateProfileResponse = {
   __typename?: 'UpdateProfileResponse';
  user_id: Scalars['String'];
  profile?: Maybe<Profile>;
};

export type UpsertDeviceParams = {
  user_id: Scalars['String'];
  device_name: Scalars['String'];
  device_id: Scalars['String'];
};

export type UpsertDeviceResponse = {
   __typename?: 'UpsertDeviceResponse';
  user_id: Scalars['String'];
  device_name: Scalars['String'];
  device_id: Scalars['String'];
};

export type UpsertOptionsParams = {
  user_id: Scalars['String'];
  options?: Maybe<Array<Maybe<ProfileOptionInput>>>;
};

export type UpsertOptionsResponse = {
   __typename?: 'UpsertOptionsResponse';
  user_id: Scalars['String'];
  options?: Maybe<Array<Maybe<ProfileOption>>>;
};

export type UserNote = {
   __typename?: 'UserNote';
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type UserNoteInput = {
  type: Scalars['String'];
  value: Scalars['String'];
};

export type VerifyUserEmailParams = {
  user_id: Scalars['String'];
  email: Scalars['String'];
  code: Scalars['String'];
  password: Scalars['String'];
  remember_me?: Maybe<Scalars['Boolean']>;
};

