import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getReviewsByIdApi } from './api';

export interface ReviewsState {
  hasInit: boolean,
  status: 'idle' | 'loading' | 'failed' | 'success';
  data: any[];
  nextPage: number | null;
}

const initialState: ReviewsState = {
  hasInit: false,
  status: 'idle',
  data: [],
  nextPage: null,
};

export const getReviewsById = createAsyncThunk(
  'getReviewsById',
  async (id: number, { getState }) => {
    const state = getState() as any;
    const { nextPage } = state.reviews;
    const response = await getReviewsByIdApi(id, nextPage == null ? 1 : nextPage);
    return { response };
  }
);

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    resetReviews: (state) => {
      state.hasInit = false;
      state.status = 'idle';
      state.data = [];
      state.nextPage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReviewsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReviewsById.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.status = 'idle';
          state.data = state.data.concat(action.payload.response.data);
          state.nextPage = action.payload.response.nextPage;
          if (!state.hasInit)
            state.hasInit = true;
        }
        else {
          state.status = 'failed';
        }
      })
  },
});

export const { resetReviews } = reviewsSlice.actions;


export default reviewsSlice.reducer;
