export type ErrorType = {
  code?: string;
  message?: string;
};

export type NestHttpException = {
  status: number;
  message: string;
};

export type SvgDimension = {
  width?: number;
  height?: number;
};

export type ResponseInfo = {
  status: number;
  message: string;
};

export type SignedUrlResponse = ResponseInfo & {
  data: string;
};

export type PageInfo = {
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
};

export type BreadcrumbItem = {
  label: string;
  url?: string;
};

export type SearchKeywordType = { text: string; type: 'posts' | 'tags' };
