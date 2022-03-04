import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getFavsApi, userToggleFavApi } from './api';
import { Status } from '@/types';

export interface FavouritesState {
  ids: number[],
  status: Status,
  data: any[];
  nextPage: number | null;
}

const initialState: FavouritesState = {
  ids: [],
  status: "idle",
  data: [],
  nextPage: null,
};

export const getFavs = createAsyncThunk(
  'getFavs',
  async (params: any, { getState }) => {
    const state = getState() as any;
    const { nextPage } = state.favourites;
    const { isInit, ids } = params;
    if (ids.length > 0) {
      const response = await getFavsApi(params, isInit ? 1 : nextPage);
      return { response, isInit };
    }
    else {
      return { response: { isSuccess: true, data: [], nextPage: null }, isInit: true };
    }
  }
);

export const userToggleFav = createAsyncThunk(
  'userToggleFav',
  async (id: number) => {
    const response = await userToggleFavApi(id);
    return { response };
  }
);

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFav: (state, action) => {
      const id = action.payload;
      if (state.ids.findIndex(x => x == id) == -1 ){
        state.ids = state.ids.concat([id])
      }
      else {
        state.ids = state.ids.filter(x => x != id);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFavs.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.status = 'idle';
          state.nextPage = action.payload.response.nextPage;
          if (action.payload.isInit) {
            state.data = action.payload.response.data;
          }
          else {
            state.data = state.data.concat(action.payload.response.data);
          }
        }
        else {
          state.status = 'failed';
        }
      })
  },
});

export const { toggleFav } = favouritesSlice.actions;

export default favouritesSlice.reducer;
