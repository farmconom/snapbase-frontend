import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type LayoutReducerState = {
  isShowLoader: boolean;
};

const initialState: LayoutReducerState = {
  isShowLoader: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleIsShowLoader: (state, action: PayloadAction<boolean>) => {
      state.isShowLoader = action.payload;
    },
  },
});

export const { toggleIsShowLoader } = layoutSlice.actions;
export default layoutSlice;
