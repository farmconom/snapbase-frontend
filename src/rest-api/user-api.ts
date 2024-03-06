import axios from '../helper/axios';
import environment from '../environment';
import { UserType } from '../type/user-type';

export async function getUsersApi(): Promise<UserType> {
  const url = `${environment.apiUrl}/users`;
  const { data } = await axios.get(url);
  return data;
}
