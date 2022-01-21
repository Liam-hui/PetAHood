import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getShopDetailByIdApi } from './api';

export interface ShopDetailsState {
  status: 'idle' | 'loading' | 'failed';
  data: { [id: string]: any; };
}

const initialState: ShopDetailsState = {
  status: 'idle',
  data: {}
};

export const getShopDetailById = createAsyncThunk(
  'getShopDetailById',
  async (id: number) => {
    const response = await getShopDetailByIdApi(id);
    return { id, response };
  }
);

export const shopDetailsSlice = createSlice({
  name: 'shopDetails',
  initialState,
  reducers: {
    clearShopDetails: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShopDetailById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShopDetailById.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.status = 'idle';
          state.data[action.payload.id] = action.payload.response.data;
        }
        else {
          state.status = 'idle';
        }
      })
  },
});

export const { clearShopDetails } = shopDetailsSlice.actions;

export default shopDetailsSlice.reducer;
