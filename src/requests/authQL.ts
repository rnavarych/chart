import { gql } from 'apollo-boost';

export const REGISTER_USER = gql`
  mutation register($email: String!) {
    register(params: { email: $email }) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!, $remember_me: Boolean!) {
    login(params: { email: $email, password: $password, remember_me: $remember_me }) {
      token
    }
  }
`;

export const RENEW_AUTH_TOKEN = gql`
  mutation renew($token: String!) {
    renew(params: { token: $token }) {
      token
    }
  }
`;

export const EMAIL_MAGIC_LINK = gql`
  mutation emailMagicLink($email: String!) {
    emailMagicLink(params: { email: $email }) {
      email
    }
  }
`;

export const REDEEM_MAGIC_LINK = gql`
  mutation redeemMagicLink($email: String!, $code: String!, $remember_me: Boolean!) {
    redeemMagicLink(params: { email: $email, code: $code, remember_me: $remember_me }) {
      token
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation requestForgotPasswordToken($email: String!) {
    requestForgotPasswordToken(params: { email: $email }) {
      email
    }
  }
`;

export const REDEEM_FORGOT_PASSWORD = gql`
  mutation redeemForgotPasswordToken(
    $email: String!
    $forgot_token: String!
    $password: String!
  ) {
    redeemForgotPasswordToken(
      params: { email: $email, forgot_token: $forgot_token, password: $password }
    ) {
      email
    }
  }
`;

export const REQUEST_VERIFICATION_EMAIL = gql`
  mutation requestVerificationEmail($user_id: String!) {
    requestVerificationEmail(params: { user_id: $user_id }) {
      user_id
      role
    }
  }
`;

export const VERIFY_USER_EMAIL = gql`
  mutation verifyUserEmail(
    $user_id: String!
    $email: String!
    $code: String!
    $password: String!
  ) {
    verifyUserEmail(
      params: { user_id: $user_id, email: $email, code: $code, password: $password }
    ) {
      token
    }
  }
`;
