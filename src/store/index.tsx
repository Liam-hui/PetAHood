import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter';
import homePageDataReducer from './homePageData';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homePageData: homePageDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
