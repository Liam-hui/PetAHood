import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getPetResourcesApi } from './api';

export interface ResourcesState {
  petTypes: any,
  petGenders: any,
  petBreeds: any,
  petGroomServiceType: any,
  petGroomPriceType: any,
  petWeight: any,
}

const initialState: ResourcesState = {
  petTypes: {},
  petGenders: {},
  petBreeds: {},
  petGroomServiceType: {},
  petGroomPriceType: {},
  petWeight: {},
};

export const getPetResources = createAsyncThunk(
  'getPetResources',
  async () => {
    const response = await getPetResourcesApi();
    return response;
  }
);


export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPetResources.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.petTypes = action.payload.data.petTypes;
          state.petGenders = action.payload.data.petGenders;
          state.petBreeds = action.payload.data.petBreeds;
          state.petGroomServiceType = action.payload.data.petGroomServiceType;
          state.petGroomPriceType = action.payload.data.petGroomPriceType;
          state.petWeight = action.payload.data.petWeight;
        }
      })
  },
});

export const getAllResources = (): AppThunk => (
  dispatch,
  // getState
) => {
  dispatch(getPetResources());
};

export default resourcesSlice.reducer;
