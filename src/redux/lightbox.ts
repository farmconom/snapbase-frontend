import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreDispatch, StoreGetState } from '.';

export type LightBoxReducerState = {
  images: string[];
  imageIndex: number;
};

const initialState: LightBoxReducerState = {
  images: Array<string>(),
  imageIndex: 0,
};

const lightBoxSlice = createSlice({
  name: 'lightBox',
  initialState,
  reducers: {
    openLightBox: (
      state,
      action: PayloadAction<{
        images: string[];
        imageIndex: number;
      }>
    ) => ({
      ...state,
      images: action.payload.images,
      imageIndex: action.payload.imageIndex,
    }),

    setImageIndex: (state, action: PayloadAction<number>) => ({
      ...state,
      imageIndex: action.payload,
    }),

    closeLightBox: () => initialState,
  },
});
const { setImageIndex } = lightBoxSlice.actions;

export const { openLightBox, closeLightBox } = lightBoxSlice.actions;

export const onMovePrevLightBoxImage =
  () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
    const { imageIndex, images } = getState().lightBox;
    const index = (imageIndex + images.length - 1) % images.length;
    dispatch(setImageIndex(index));
  };

export const onMoveNextLightBoxImage =
  () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
    const { imageIndex, images } = getState().lightBox;
    const index = (imageIndex + 1) % images.length;
    dispatch(setImageIndex(index));
  };

export default lightBoxSlice;
