export type QueryParams = {
  [key: string]: string | number | undefined;
};

export type QueryParamsPage = {
  limit: number;
  page: number;
  keyword?: string;
  orderBy?: string;
  status?: string;
};
