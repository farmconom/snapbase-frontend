import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export type AccountReducerState = {
  user: User | null;
  isSignIn: boolean;
  error: boolean;
};

const initialState: AccountReducerState = {
  user: null,
  isSignIn: false,
  error: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    initializeAccountSuccess: (
      state,
      action: PayloadAction<{
        user: User | null;
        isSignIn: boolean;
      }>
    ) => ({
      ...state,
      user: action.payload.user,
      isSignIn: action.payload.isSignIn,
    }),
    initializeAccountFailure: () => ({
      user: null,
      isSignIn: false,
      error: true,
    }),
    resetAccountState: () => initialState,
  },
});

// export const disconnectWallet = () => (dispatch: StoreDispatch) => {
//   setCredentialTokens(null);
//   dispatch(resetAccountState());
//   redirect(location.pathname);
// };

export const {
  initializeAccountSuccess,
  initializeAccountFailure,
  resetAccountState,
} = accountSlice.actions;
export default accountSlice;
