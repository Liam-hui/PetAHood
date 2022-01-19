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
import homePageDataReducer from './homePageData';
import shopDetailsReducer from './shopDetails';
import shopSearchReducer from './shopSearch';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['homePageData', 'shopDetails', 'shopSearch']
};

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    counter: counterReducer,
    homePageData: homePageDataReducer,
    shopDetails: shopDetailsReducer,
    shopSearch: shopSearchReducer
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
