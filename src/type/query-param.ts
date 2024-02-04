export type QueryParams = {
  [key: string]: string | number | undefined;
};

export type QueryParamsPage = {
  limit: number;
  page: number;
  keyword?: string;
  orderBy?: string;
  isDisputed?: string;
  isConfirmed?: string;
  tag?: string;
  type?: string;
  status?: string;
};
