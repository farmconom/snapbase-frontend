import { NestHttpException } from './common';

export interface CommonAuthResponse {
  status: number;
  message: string;
  data: SinginRespData | AuthRespData | NestHttpException | null;
}

export type SinginRespData = {
  nonce: number;
  msg: string;
};

export type AuthRespData = {
  user: unknown;
  tokens: JwtToken;
};

export type JwtToken = {
  accessToken: string;
  refreshToken: string;
};
