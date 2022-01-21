import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
  isVisible: true | false;
}

const initialState: LoadingState = {
  isVisible: false
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isVisible = true;
    },
    hideLoading: (state) => {
      state.isVisible = false;
    }
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
