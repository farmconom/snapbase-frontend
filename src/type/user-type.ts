import { ResponseInfo } from './common-type';

export type UsersResponse = ResponseInfo & {
  data: UserType[];
};

export type UserResponse = ResponseInfo & {
  data: UserType;
};

export type UserType = {
  id: string;
  createdAt: Date;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
  // providerId: string;
  uid: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  // tenantId: string | null;
  // refreshToken: string;
};

export type CreateUserType = {
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
  // providerId: string;
  uid: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  // tenantId: string | null;
  // refreshToken: string;
};
