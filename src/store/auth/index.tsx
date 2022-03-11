import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { loginApi, refreshTokenApi } from './api';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface AuthState {
  status: 'idle' | 'success' | 'failed' | 'needLoginAgain';
  isLoading: boolean;
  errorMsg: string | null;
}

const initialState: AuthState = {
  status: 'idle',
  isLoading: false,
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

export const refreshToken = createAsyncThunk(
  'refreshToken',
  async () => {
    const response = await refreshTokenApi();
    return { response };
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.status = "idle";
    },
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
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.status = 'idle';
      })
      .addCase(refreshToken.pending, (state) => {
        //
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
        }
        else {
          state.status = 'needLoginAgain';
        }
      })
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
