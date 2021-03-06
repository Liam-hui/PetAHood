import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getBlogDetailsByIdApi } from './api';

export interface BlogDetailsState {
  status: 'idle' | 'loading' | 'failed';
  data: { [id: string]: any; };
}

const initialState: BlogDetailsState = {
  status: 'idle',
  data: {}
};

export const getBlogDetailsById = createAsyncThunk(
  'getBlogDetailsById',
  async (id: number) => {
    const response = await getBlogDetailsByIdApi(id);
    return { id, response };
  }
);

export const blogDetailsSlice = createSlice({
  name: 'blogDetails',
  initialState,
  reducers: {
    clearBlogDetails: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogDetailsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBlogDetailsById.fulfilled, (state, action) => {
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

export const { clearBlogDetails } = blogDetailsSlice.actions;

export default blogDetailsSlice.reducer;
