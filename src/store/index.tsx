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

import resourcesReducer from './resources';
import loadingReducer from './loading';
import authReducer from './auth';
import profileReducer from './profile';
import favouritesReducer from './favourites';
import petsReducer from './pets';
import homePageDataReducer from './homePageData';
import shopDetailsReducer from './shopDetails';
import shopSearchReducer from './shopSearch';
import blogDetailsReducer from './blogDetails';
import reviewsReducer from './reviews';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['resources', 'homePageData', 'shopDetails', 'shopSearch', 'blogDetails', 'auth', 'profile', 'favourites']
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    auth: authReducer,
    resources: resourcesReducer,
    profile: profileReducer,
    favourites: favouritesReducer,
    pets: petsReducer,
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
