import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter';
import homePageDataReducer from './homePageData';
import shopDetailsReducer from './shopDetails';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homePageData: homePageDataReducer,
    shopDetails: shopDetailsReducer,
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
