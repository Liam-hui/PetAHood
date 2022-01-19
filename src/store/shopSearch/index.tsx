import { createAsyncThunk, createSlice, isRejected, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getShopSearchResultApi } from './api';

export interface ShopSearchState {
  status: 'idle' | 'loading' | 'failed' | 'success';
  result: any[];
  history: string[];
  params: any;
  nextPage: number | null;
}

const initialState: ShopSearchState = {
  status: 'idle',
  result: [],
  history: [],
  params: {},
  nextPage: null
};

export const getShopSearchResult = createAsyncThunk(
  'getShopSearchResult',
  async (params?: any) => {
    const response = await getShopSearchResultApi(params);
    return { params, response };
  }
);

export const getShopSearchResultNextPage = createAsyncThunk(
  'getShopSearchResultNextPage',
  async (_, { getState }) => {
    const state = getState() as any;
    const { params, nextPage } = state.shopSearch;
    const response = await getShopSearchResultApi(params, nextPage);
    return { response };
  }
);

export const shopSearchSlice = createSlice({
  name: 'shopSearch',
  initialState,
  reducers: {
    resetShopSearch: (state) => {
      state.status = "idle";
      state.result = [];
      state.params = {};
      state.nextPage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShopSearchResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShopSearchResult.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.status = 'success';
          state.result = action.payload.response.result;
          state.nextPage = action.payload.response.nextPage;
          state.params = action.payload.params;
          
          // add to history
          if (action.payload.params.searchString != undefined && action.payload.params.searchString != "") {
            const searchString = action.payload.params.searchString;
            state.history = state.history.filter(item => item !== searchString);
            state.history.unshift(searchString);
          }
        }
        else {
          state.status = 'failed';
        }
      })
      .addCase(getShopSearchResultNextPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShopSearchResultNextPage.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.status = 'success';
          state.result = state.result.concat(action.payload.response.result);
          state.nextPage = action.payload.response.nextPage;
        }
        else {
          state.status = 'failed';
        }
      })
  },
});

export const { resetShopSearch } = shopSearchSlice.actions;

export default shopSearchSlice.reducer;
