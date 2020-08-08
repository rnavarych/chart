import JwtDecode from 'jwt-decode';
import { log } from './';

export const decodeUserId = (token: string): string | null => {
  let userId = null;
  try {
    const decoded: any = JwtDecode(token);
    userId = decoded ? decoded.sub : null;
  } catch (error) {
    log.debug('decodeUserId():', error);
  }
  return userId;
};

export const decodeVerifiedFlag = (token: string): boolean => {
  let verified = false;
  try {
    const decoded: any = JwtDecode(token);
    if (decoded) {
      verified = decoded.vfd && false;
    }
  } catch (error) {
    log.debug('decodeVerifiedFlag():', error);
  }
  return verified;
};
