import axios from '../helper/axios';
import environment from '../environment';
import {
  CreateUserType,
  UserResponse,
  UserType,
  UsersResponse,
} from '../type/user-type';
import { ResponseInfoBoolean } from '../type/common-type';

export async function getUsersApi(): Promise<UsersResponse> {
  const url = `${environment.apiUrl}/users`;
  const { data } = await axios.get(url);
  return data;
}

export async function getUserByIdApi(uid: string): Promise<UserResponse> {
  const url = `${environment.apiUrl}/users/${uid}`;
  const { data } = await axios.get(url);
  return data;
}

export async function cerateUserApi(
  user: CreateUserType
): Promise<UserResponse> {
  const url = `${environment.apiUrl}/users`;
  const { data } = await axios.post(url, user);
  return data;
}

export async function updateUserByIdApi(user: UserType): Promise<UserResponse> {
  const url = `${environment.apiUrl}/users/${user.uid}`;
  const { data } = await axios.patch(url, user);
  return data;
}

export async function deleteUserByIdApi(
  uid: string
): Promise<ResponseInfoBoolean> {
  const url = `${environment.apiUrl}/users/${uid}`;
  const { data } = await axios.delete(url);
  return data;
}
