import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getHomePageButtonsApi, getHomePageBannersApi, getHomePageSlidersApi, getHomePageBlogsApi } from './api';

export interface HomePageDataState {
  status: 'idle' | 'loading' | 'failed';
  buttons: Object[] | null;
  banners: Object[] | null;
  sliders: Object[] | null;
  blogs: Object[] | null;
}

const initialState: HomePageDataState = {
  status: 'idle',
  buttons: null,
  banners: null,
  sliders: null,
  blogs: null
};

export const getHomePageButtons = createAsyncThunk(
  'getHomePageButtons',
  async () => {
    const response = await getHomePageButtonsApi();
    return response;
  }
);

export const getHomePageBanners = createAsyncThunk(
  'getHomePageBanners',
  async () => {
    const response = await getHomePageBannersApi();
    return response;
  }
);

export const getHomePageSliders = createAsyncThunk(
  'getHomePageSliders',
  async () => {
    const response = await getHomePageSlidersApi();
    return response;
  }
);

export const getHomePageBlogs = createAsyncThunk(
  'getHomePageBlogs',
  async () => {
    const response = await getHomePageBlogsApi();
    return response;
  }
);

export const homePageDataSlice = createSlice({
  name: 'homePageData',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageButtons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHomePageButtons.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.isSuccess) {
          state.buttons = action.payload.data;
        }
      })
      .addCase(getHomePageBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHomePageBanners.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.isSuccess) {
          state.banners = action.payload.data;
        }
      })
      .addCase(getHomePageSliders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHomePageSliders.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.isSuccess) {
          state.sliders = action.payload.data;
        }
      })
      .addCase(getHomePageBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHomePageBlogs.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.isSuccess) {
          state.blogs = action.payload.data;
        }
      });
  },
});


export const getHomePageData = (): AppThunk => (
  dispatch,
  // getState
) => {
  dispatch(getHomePageButtons());
  dispatch(getHomePageBanners());
  dispatch(getHomePageSliders());
  dispatch(getHomePageBlogs());
};

export default homePageDataSlice.reducer;
