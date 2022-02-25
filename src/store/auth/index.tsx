import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { loginApi } from './api';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface AuthState {
  status: 'idle' | 'success' | 'failed';
  isLoading: boolean;
  data: { [id: string]: any; };
  errorMsg: string | null;
}

const initialState: AuthState = {
  status: 'idle',
  isLoading: false,
  data: {},
  errorMsg: null
};

export const login = createAsyncThunk(
  'login',
  async ({ email, password }: { email: string, password: string }) => {
    const response = await loginApi(email, password);
    return { response };
  }
);

export const logout = createAsyncThunk(
  'logout',
  async () => {
    try {
      await EncryptedStorage.removeItem("token");
    }
    catch (error) {}
    return;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.response.isSuccess) {
          state.status = 'success';
        }
        else {
          state.status = 'failed';
          if (action.payload.response.errorMsg) {
            state.errorMsg = action.payload.response.errorMsg;
          }
        }
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.status = 'idle';
      })
  },
});

export default authSlice.reducer;
