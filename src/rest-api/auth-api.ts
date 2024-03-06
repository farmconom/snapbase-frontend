import axios from '../helper/axios';
import environment from '../environment';
import { SignedUrlResponse } from '../type/common-type';

export async function sendEmailVerification(
  email: string
): Promise<SignedUrlResponse> {
  const url = `${environment.apiUrl}/firebase/verification-link/${email}`;
  const { data } = await axios.get(url);
  return data;
}
