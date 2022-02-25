import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getUserProfileApi, getUserProfileFavApi, getUserProfileFootprintApi, getUserProfileReviewsApi, getUserProfileVouchersApi } from './api';

export interface ProfileState {
  data: any | null;
  // fav
  fav: any[];
  favLoading: boolean;
  favNextPage: number | null;
  // reviews
  reviews: any[];
  reviewsLoading: boolean;
  reviewsNextPage: number | null;
  // footprint
  footprint: any;
  // vouchers
  vouchers: { "active": any[], "redeemed": any[], "expired": any[] },
  vouchersLoading: boolean;
  vouchersNextPage: { "active": number | null, "redeemed": number | null, "expired": number | null },
}

const initialState: ProfileState = {
  data: null,
  // fav
  fav: [],
  favLoading: false,
  favNextPage: null,
  // reviews
  reviews: [],
  reviewsLoading: false,
  reviewsNextPage: null,
  // footprint
  footprint: null,
  // vouchers
  vouchers: { "active": [], "redeemed": [], "expired": [] },
  vouchersLoading: false,
  vouchersNextPage: { "active": null, "redeemed": null, "expired": null },
};

export const getUserProfile = createAsyncThunk(
  'getUserProfile',
  async () => {
    const response = await getUserProfileApi();
    return { response };
  }
);

export const getUserProfileFav = createAsyncThunk(
  'getUserProfileFav',
  async (params: any, { getState }) => {
    const state = getState() as any;
    const { favNextPage } = state.profile;
    const page = params.isInit ? 1 : favNextPage == null ? 1 : favNextPage;
    const response = await getUserProfileFavApi(params, page);
    return { response, isInit: params.isInit };
  }
);

export const getUserProfileReviews = createAsyncThunk(
  'getUserProfileReviews',
  async (params: any, { getState }) => {
    const state = getState() as any;
    const { reviewsNextPage } = state.profile;
    const page = params.isInit ? 1 : reviewsNextPage == null ? 1 : reviewsNextPage;
    const response = await getUserProfileReviewsApi(page);
    return { response, isInit: params.isInit };
  }
);

export const getUserProfileFootprint = createAsyncThunk(
  'getUserProfileFootprint',
  async () => {
    const response = await getUserProfileFootprintApi();
    return { response };
  }
);

export const getUserProfileVouchers = createAsyncThunk(
  'getUserProfileVouchers',
  async (params: { type: "active" | "redeemed" | "expired", isInit?: boolean }, { getState }) => {
    const { type, isInit } = params;
    const state = getState() as any;
    const nextPage = state.profile.vouchersNextPage[type];
    const response = await getUserProfileVouchersApi(type, (isInit || nextPage == null) ? 1 : nextPage);
    return { response, type, isInit };
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearUserProfile: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.data = action.payload.response.data;
        }
      })
      .addCase(getUserProfileFav.pending, (state) => {
        state.favLoading = true;
      })
      .addCase(getUserProfileFav.fulfilled, (state, action) => {
        state.favLoading = false;
        if (action.payload.response.isSuccess) {
          state.favNextPage = action.payload.response.nextPage;
          if (action.payload.isInit)
            state.fav = action.payload.response.data;
          else 
            state.fav = state.fav.concat(action.payload.response.data);
        }
      })
      .addCase(getUserProfileReviews.pending, (state) => {
        state.reviewsLoading = true;
      })
      .addCase(getUserProfileReviews.fulfilled, (state, action) => {
        state.reviewsLoading = false;
        if (action.payload.response.isSuccess) {
          state.reviewsNextPage = action.payload.response.nextPage;
          if (action.payload.isInit)
            state.reviews = action.payload.response.data;
          else 
            state.reviews = state.reviews.concat(action.payload.response.data);
        }
      })
      .addCase(getUserProfileFootprint.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(getUserProfileFootprint.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.footprint = action.payload.response.data;
        }
      })
      .addCase(getUserProfileVouchers.pending, (state) => {
        state.vouchersLoading = true;
      })
      .addCase(getUserProfileVouchers.fulfilled, (state, action) => {
        state.vouchersLoading = false;
        if (action.payload.response.isSuccess) {
          const type = action.payload.type;
          state.vouchersNextPage[type] = action.payload.response.nextPage;
          if (action.payload.isInit)
            state.vouchers[type] = action.payload.response.data;
          else
            state.vouchers[type] = state.vouchers[type].concat(action.payload.response.data);
        }
      })
  },
});

export const getUserProfileAll = (): AppThunk => (
  dispatch,
  // getState
) => {
  dispatch(getUserProfile());
  dispatch(getUserProfileFav({ isInit: true }));
  dispatch(getUserProfileReviews({ isInit: true }));
};

export const { clearUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
