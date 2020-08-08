import { gql } from 'apollo-boost';

// provisions user in Validic service
export const PROVISION_USER = gql`
  mutation provisionUser($user_id: ID!) {
    provisionUser(params: { user_id: $user_id }) {
      user_id
      validic_user_id
      marketplace_token
      marketplace_url
      mobile_token
    }
  }
`;

// get provisioned user in Validic service
export const GET_PROVISIONED_USER = gql`
  query getProvisionedUser($user_id: ID!) {
    getProvisionedUser(params: { user_id: $user_id }) {
      user_id
      validic_user_id
      marketplace_token
      marketplace_url
      mobile_token
    }
  }
`;

export const GET_TYPES_FOR_USER = gql`
  query getMetricTypesForUser($user_id: ID!) {
    getMetricTypesForUser(params: { user_id: $user_id }) {
      types
    }
  }
`;

export const REFRESH_PROVISIONED_USER = gql`
  mutation refreshProvisionedUser($user_id: ID!) {
    refreshProvisionedUser(params: { user_id: $user_id }) {
      user_id
      validic_user_id
      marketplace_token
      marketplace_url
      mobile_token
    }
  }
`;

// Mark as seen to make entries appear in the wheel ifself
export const MARK_AS_SEEN = gql`
  mutation markMetricsAsSeen($user_id: ID!, $metric_ids: [Int!]!) {
    markMetricsAsSeen(params: { user_id: $user_id, metric_ids: $metric_ids }) {
      user_id
    }
  }
`;

// Hiding metric on the server (kind of delete)
export const DELETE_METRIC = gql`
  mutation hideMetrics($user_id: ID!, $metric_ids: [Int!]!) {
    hideMetrics(params: { user_id: $user_id, metric_ids: $metric_ids }) {
      user_id
    }
  }
`;

// Manual creation of an event
export const CREATE_EVENT = gql`
  mutation createEvent(
    $user_id: ID!
    $type: String!
    $start_time: DateTime!
    $end_time: DateTime!
    $category: String!
    $source_type: String!
    $metrics: [MetricInput!]!
    $user_notes: [UserNoteInput]
  ) {
    createEvent(
      params: {
        user_id: $user_id
        type: $type
        start_time: $start_time
        end_time: $end_time
        category: $category
        source_type: $source_type
        metrics: $metrics
        user_notes: $user_notes
      }
    ) {
      user_id
    }
  }
`;

export const GET_ENTRIES_BY_TYPES = gql`
  query getMetricsForUserByTypes(
    $user_id: ID!
    $types: [String!]!
    $start_date: DateTime!
    $end_date: DateTime!
  ) {
    results: getMetricsForUserByTypes(
      params: {
        user_id: $user_id
        types: $types
        start_date: $start_date
        end_date: $end_date
      }
    ) {
      metrics {
        type
        event_types {
          type
          categories {
            name
            sources {
              type
              metrics {
                id
                seen_at
                value
                type
                origin
                start_time
                end_time
                unit
                user_notes {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;
