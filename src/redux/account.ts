import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AccountReducerState = {
  // user: User | null;
  isSignIn: boolean;
  error: boolean;
};

const initialState: AccountReducerState = {
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
        isSignIn: boolean;
      }>
    ) => ({
      ...state,
      isSignIn: action.payload.isSignIn,
    }),
    initializeAccountFailure: () => ({
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
