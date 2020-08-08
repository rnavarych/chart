import * as endpoints from '../configs';
import { callApi } from '../services/rest';

interface RegisterUserBody {
  email: string;
  password: string;
  external_id?: string;
}

interface LoginBody {
  email: string;
  password: string;
  remember_me?: boolean;
}

interface RenewBody {
  token: string;
}

interface EmailMagicLinkBody {
  email: string;
}

interface RedeemMagicLinkBody {
  email: string;
  code: string;
  remember_me?: boolean;
}

interface ForgotPasswordBody {
  email: string;
  role?: string;
}

interface RedeemForgotPasswordBody {
  email: string;
  forgot_token: string;
  password: string;
}

export const registerRequest = (body: RegisterUserBody) => {
  return callApi(endpoints.register, 'POST', body);
};

export const loginRequest = (body: LoginBody) => {
  return callApi(endpoints.login, 'POST', body);
};

export const renewTokenRequest = (body: RenewBody) => {
  return callApi(endpoints.renew, 'POST', body);
};

export const emailMagicLinkRequest = (body: EmailMagicLinkBody) => {
  return callApi(endpoints.emailMagicLink, 'POST', body);
};

export const redeemMagicLinkRequest = (body: RedeemMagicLinkBody) => {
  return callApi(endpoints.redeemMagicLink, 'POST', body);
};

export const forgotPasswordRequest = (body: ForgotPasswordBody) => {
  return callApi(endpoints.forgotPassword, 'POST', body);
};

export const redeemPasswordRequest = (body: RedeemForgotPasswordBody) => {
  return callApi(endpoints.redeemPassword, 'POST', body);
};
