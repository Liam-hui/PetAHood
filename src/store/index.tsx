import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import counterReducer from './counter';
import loadingReducer from './loading';
import authReducer from './auth';
import profileReducer from './profile';
import homePageDataReducer from './homePageData';
import shopDetailsReducer from './shopDetails';
import shopSearchReducer from './shopSearch';
import blogDetailsReducer from './blogDetails';
import reviewsReducer from './reviews';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['homePageData', 'shopDetails', 'shopSearch', 'blogDetails']
  // whitelist: ['homePageData', 'shopDetails', 'shopSearch', 'blogDetails', 'auth', 'profile']
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    counter: counterReducer,
    auth: authReducer,
    profile: profileReducer,
    loading: loadingReducer,
    homePageData: homePageDataReducer,
    shopDetails: shopDetailsReducer,
    shopSearch: shopSearchReducer,
    blogDetails: blogDetailsReducer,
    reviews: reviewsReducer
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
