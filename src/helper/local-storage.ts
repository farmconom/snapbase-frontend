import { tokenKey } from '../constant/local-storage';
import { JwtToken } from '../type/auth';
import { setAxiosAuthorization } from './axios';

export const setCredentialTokens = (tokens: JwtToken | null) => {
  if (tokens) {
    localStorage.setItem(tokenKey.accessToken, tokens.accessToken);
    localStorage.setItem(tokenKey.refreshToken, tokens.refreshToken);
    setAxiosAuthorization(tokens);
  } else {
    localStorage.removeItem(tokenKey.accessToken);
    localStorage.removeItem(tokenKey.refreshToken);
    setAxiosAuthorization(null);
  }
};

export const getCredentialTokens = () => {
  const accessToken = localStorage.getItem(tokenKey.accessToken);
  const refreshToken = localStorage.getItem(tokenKey.refreshToken);
  if (!!accessToken && !!refreshToken) {
    return { accessToken, refreshToken };
  }
  return null;
};

export const setAnonymousCredentialTokens = (tokens: JwtToken | null) => {
  if (tokens) {
    localStorage.setItem(tokenKey.anonymousAccessToken, tokens.accessToken);
    localStorage.setItem(tokenKey.anonymousRefreshToken, tokens.refreshToken);
    setAxiosAuthorization(tokens);
  } else {
    localStorage.removeItem(tokenKey.anonymousAccessToken);
    localStorage.removeItem(tokenKey.anonymousRefreshToken);
    setAxiosAuthorization(null);
  }
};

export const getAnonymousCredentialTokens = () => {
  const accessToken = localStorage.getItem(tokenKey.anonymousAccessToken);
  const refreshToken = localStorage.getItem(tokenKey.anonymousRefreshToken);
  if (!!accessToken && !!refreshToken) {
    return { accessToken, refreshToken };
  }
  return null;
};
