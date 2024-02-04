import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import {
  configureStore,
  combineReducers,
  CombinedState,
  Reducer,
} from '@reduxjs/toolkit';
import lightBoxSlice, { LightBoxReducerState } from './lightbox';
import layoutSlice, { LayoutReducerState } from './layout';
import accountSlice, { AccountReducerState } from './account';

export type ReduxRootState = {
  account: AccountReducerState;
  lightBox: LightBoxReducerState;
  layout: LayoutReducerState;
};

const rootReducer: Reducer<CombinedState<ReduxRootState>> = combineReducers({
  account: accountSlice.reducer,
  lightBox: lightBoxSlice.reducer,
  layout: layoutSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type StoreDispatch = typeof store.dispatch;
export type StoreGetState = typeof store.getState;

export const useDispatch: () => StoreDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<ReduxRootState> =
  useReduxSelector;

export type RootState = ReturnType<typeof rootReducer>;

export default store;
