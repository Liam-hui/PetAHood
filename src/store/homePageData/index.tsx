import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getHomePageBannersApi, getHomePageSlidersApi, getHomePageBlogsApi } from './api';

export interface HomePageDataState {
  status: 'idle' | 'loading' | 'failed';
  banners: Object[];
  sliders: Object[];
  blogs: Object[];
}

const initialState: HomePageDataState = {
  status: 'idle',
  banners: [],
  sliders: [],
  blogs: []
};

export const getHomePageBanners = createAsyncThunk(
  'getHomePageBanners',
  async () => {
    const data = await getHomePageBannersApi();
    return data;
  }
);

export const getHomePageSliders = createAsyncThunk(
  'getHomePageSliders',
  async () => {
    const data = await getHomePageSlidersApi();
    return data;
  }
);

export const getHomePageBlogs = createAsyncThunk(
  'getHomePageBlogs',
  async () => {
    const data = await getHomePageBlogsApi();
    return data;
  }
);

export const homePageDataSlice = createSlice({
  name: 'homePageData',
  initialState,
  reducers: {
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHomePageBanners.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload != null) {
          state.banners = action.payload;
        }
      })
      .addCase(getHomePageSliders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHomePageSliders.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload != null) {
          state.sliders = action.payload;
        }
      })
      .addCase(getHomePageBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHomePageBlogs.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload != null) {
          state.blogs = action.payload;
        }
      });
  },
});


export const getHomePageData = (): AppThunk => (
  dispatch,
  // getState
) => {
  dispatch(getHomePageBanners());
  dispatch(getHomePageSliders());
  dispatch(getHomePageBlogs());
};

export default homePageDataSlice.reducer;
