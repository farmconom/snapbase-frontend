import { User } from 'firebase/auth';
import { CreateUserType } from '../type/user-type';

export function convertUserDataForCreate(user: User, displayName?: string) {
  const newUser: CreateUserType = {
    email: user.email,
    phoneNumber: user.phoneNumber,
    displayName: displayName || user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    emailVerified: user.emailVerified,
    isAnonymous: user.isAnonymous,
  };
  return newUser;
}
