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
import homePageDataReducer from './homePageData';
import shopDetailsReducer from './shopDetails';
import shopSearchReducer from './shopSearch';
import blogDetailsReducer from './blogDetails';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['homePageData', 'shopDetails', 'shopSearch', 'blogDetails']
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    counter: counterReducer,
    loading: loadingReducer,
    homePageData: homePageDataReducer,
    shopDetails: shopDetailsReducer,
    shopSearch: shopSearchReducer,
    blogDetails: blogDetailsReducer
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
