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
    const data = await getShopDetailByIdApi(id);
    return { id, data };
  }
);

export const shopDetailsSlice = createSlice({
  name: 'shopDetails',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShopDetailById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShopDetailById.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload != null) {
          state.data[action.payload.id] = action.payload.data;
        }
      })
  },
});

export default shopDetailsSlice.reducer;
