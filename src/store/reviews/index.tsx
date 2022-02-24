import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getReviewsByIdApi } from './api';

export interface ReviewsState {
  status: 'idle' | 'loading' | 'failed';
  data: any[];
  nextPage: number | null;
}

const initialState: ReviewsState = {
  status: 'idle',
  data: [],
  nextPage: null,
};

export const getReviewsById = createAsyncThunk(
  'getReviewsById',
  async (id: number, { getState }) => {
    const state = getState() as any;
    const { nextPage } = state.reviews;
    const response = await getReviewsByIdApi(id, nextPage == null ? 0 : nextPage);
    return { response };
  }
);

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReviewsById.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.status = 'idle';
          state.data = action.payload.response.data;
        }
        else {
          state.status = 'failed';
        }
      })
  },
});

export default reviewsSlice.reducer;
