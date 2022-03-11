import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getUserProfileApi, getUserProfileFavApi, getUserProfileFootprintApi, getUserProfileOrdersApi, getUserProfileReviewsApi, getUserProfileVouchersApi } from './api';
import { Status } from '@/types';

export interface ProfileState {
  data: any | null;
  // fav
  fav: any[];
  favLoading: boolean;
  favNextPage: number | null;
  // reviews
  reviews: any[];
  reviewsStatus: Status;
  reviewsNextPage: number | null;
  // footprint
  footprint: any;
  footprintStatus: Status;
  // vouchers
  vouchers: { "active": any[], "redeemed": any[], "expired": any[] },
  vouchersStatus: Status;
  vouchersNextPage: { "active": number | null, "redeemed": number | null, "expired": number | null },
  // orders
  orders: any[],
  ordersStatus: Status;
  ordersNextPage: number | null;
}

const initialState: ProfileState = {
  data: null,
  // fav
  fav: [],
  favLoading: false,
  favNextPage: null,
  // reviews
  reviews: [],
  reviewsStatus: "idle",
  reviewsNextPage: null,
  // footprint
  footprint: null,
  footprintStatus: "idle",
  // vouchers
  vouchers: { "active": [], "redeemed": [], "expired": [] },
  vouchersStatus: "idle",
  vouchersNextPage: { "active": null, "redeemed": null, "expired": null },
  // orders
  orders: [],
  ordersStatus: "idle",
  ordersNextPage: null
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
    const { isInit } = params;
    const response = await getUserProfileFavApi(params, isInit ? 1 : favNextPage);
    return { response, isInit };
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

export const getUserProfileOrders = createAsyncThunk(
  'getUserProfileOrders',
  async (params: any, { getState }) => {
    const { isInit } = params;
    const state = getState() as any;
    const nextPage = state.profile.ordersNextPage;
    const response = await getUserProfileOrdersApi((isInit || nextPage == null) ? 1 : nextPage);
    return { response, isInit };
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearUserProfile: (state) => {
      state.data = null;
    },
    resetUserProfileStatus: (state) => {
      state.reviewsStatus = "idle";
      state.footprintStatus = "idle";
      state.vouchersStatus = "idle";
      state.ordersStatus = "idle";
    }
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
        state.reviewsStatus = "loading";
      })
      .addCase(getUserProfileReviews.fulfilled, (state, action) => {
        state.reviewsStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          state.reviewsNextPage = action.payload.response.nextPage;
          if (action.payload.isInit)
            state.reviews = action.payload.response.data;
          else 
            state.reviews = state.reviews.concat(action.payload.response.data);
        }
      })
      // footpring
      .addCase(getUserProfileFootprint.pending, (state) => {
        state.footprintStatus = "loading";
      })
      .addCase(getUserProfileFootprint.fulfilled, (state, action) => {
        state.footprintStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          state.footprint = action.payload.response.data;
        }
      })
      // vouchers
      .addCase(getUserProfileVouchers.pending, (state) => {
        state.vouchersStatus = "loading";
      })
      .addCase(getUserProfileVouchers.fulfilled, (state, action) => {
        state.vouchersStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          const type = action.payload.type;
          state.vouchersNextPage[type] = action.payload.response.nextPage;
          if (action.payload.isInit)
            state.vouchers[type] = action.payload.response.data;
          else
            state.vouchers[type] = state.vouchers[type].concat(action.payload.response.data);
        }
      })
      // orders
      .addCase(getUserProfileOrders.pending, (state) => {
        state.ordersStatus = "loading";
      })
      .addCase(getUserProfileOrders.fulfilled, (state, action) => {
        state.ordersStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          state.ordersNextPage = action.payload.response.nextPage;
          if (action.payload.isInit)
            state.orders = action.payload.response.data;
          else
            state.orders = state.orders.concat(action.payload.response.data);
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
};

export const { clearUserProfile, resetUserProfileStatus } = profileSlice.actions;

export default profileSlice.reducer;
