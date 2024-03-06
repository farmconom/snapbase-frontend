import { QueryParams } from '../type/query-param-type';

export const queryParamsToUrl = (params?: QueryParams, isAnd?: boolean) => {
  if (!params) return '';
  const keys = Object.keys(params);
  const stringParam = keys
    .map((key, i) => {
      const symbol = i === 0 && !isAnd ? '?' : '&';
      return `${symbol}${key}=${params[key]}`;
    })
    .join('');
  return stringParam;
};
