import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { updatePetProfileApi, getPetProfileApi, getPetProfileFashionSizeApi, getPetProfileHealthRecordApi, getPetProfileOverviewApi, getPetProfileInsuranceApi, updatePetProfileGroomingApi, getPetProfileGroomingApi, updatePetProfileInsuranceApi, updatePetProfileHealthRecordApi, updatePetProfileFashionSizeApi } from './api';
import { Status } from '@/types';

export interface PetsState {
  data: { [id: string]: any; };
  errorMsg: string | undefined;
  // pet profile
  getPetProfileStatus: Status;
  updatePetProfileStatus: Status;
  // overview
  getOverviewStatus: Status;
  // fashionSize
  getFashionSizeStatus: Status;
  updateFashionSizeStatus: Status;
  // health record
  getHealthRecordStatus: Status;
  updateHealthRecordStatus: Status;
  // pet insurance
  getInsuranceStatus: Status;
  updateInsuranceStatus: Status;
  // grooming
  getGroomingStatus: Status;
  updateGroomingStatus: Status;
}

const initialState: PetsState = {
  data: {},
  errorMsg: undefined,
  // pet profile
  getPetProfileStatus: "idle",
  updatePetProfileStatus: "idle",
  // overview
  getOverviewStatus: "idle",
  // fashionSize
  getFashionSizeStatus: "idle",
  updateFashionSizeStatus: "idle",
  // health record
  getHealthRecordStatus: "idle",
  updateHealthRecordStatus: "idle",
  // pet insurance
  getInsuranceStatus: "idle",
  updateInsuranceStatus: "idle",
  // grooming
  getGroomingStatus: "idle",
  updateGroomingStatus: "idle",
};

export const getPetProfile = createAsyncThunk(
  'getPetProfile',
  async (id: number) => {
    const response = await getPetProfileApi(id);
    return { id, response };
  }
);

export const updatePetProfile = createAsyncThunk(
  'updatePetProfile',
  async (params: any) => {
    const response = await updatePetProfileApi(params);
    return { response };
  }
);

export const getPetProfileOverview = createAsyncThunk(
  'getPetProfileOverview',
  async (id: number) => {
    const response = await getPetProfileOverviewApi(id);
    return { id, response };
  }
);

export const getPetProfileFashionSize = createAsyncThunk(
  'getPetProfileFashionSize',
  async (id: number) => {
    const response = await getPetProfileFashionSizeApi(id);
    return { id, response };
  }
);

export const updatePetProfileFashionSize = createAsyncThunk(
  'updatePetProfileFashionSize',
  async (params: any) => {
    const response = await updatePetProfileFashionSizeApi(params);
    return { response };
  }
);

export const getPetProfileHealthRecord = createAsyncThunk(
  'getPetProfileHealthRecord',
  async (id: number) => {
    const response = await getPetProfileHealthRecordApi(id);
    return { id, response };
  }
);

export const updatePetProfileHealthRecord = createAsyncThunk(
  'updatePetProfileHealthRecord',
  async (params: any) => {
    const response = await updatePetProfileHealthRecordApi(params);
    return { response };
  }
);

export const getPetProfileInsurance = createAsyncThunk(
  'getPetProfileInsurance',
  async (id: number) => {
    const response = await getPetProfileInsuranceApi(id);
    return { id, response };
  }
);

export const updatePetProfileInsurance = createAsyncThunk(
  'updatePetProfileInsurance',
  async (params: any) => {
    const response = await updatePetProfileInsuranceApi(params);
    return { response };
  }
);

export const getPetProfileGrooming = createAsyncThunk(
  'getPetProfileGrooming',
  async (id: number) => {
    const response = await getPetProfileGroomingApi(id);
    return { id, response };
  }
);

export const updatePetProfileGrooming = createAsyncThunk(
  'updatePetProfileGrooming',
  async (params: any) => {
    const response = await updatePetProfileGroomingApi(params);
    return { response };
  }
);

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    clearPetProfileData: (state) => {
      state.data = {};
    },
    resetPetProfileStatus: (state) => {
      state.errorMsg = undefined;
      // pet profile
      state.getPetProfileStatus = "idle";
      state.updatePetProfileStatus = "idle";
      // overview
      state.getOverviewStatus = "idle";
      // fashionSize
      state.getFashionSizeStatus = "idle";
      state.updateFashionSizeStatus = "idle";
      // health record
      state.getHealthRecordStatus = "idle";
      state.updateHealthRecordStatus = "idle";
      // pet insurance
      state.getInsuranceStatus = "idle";
      state.updateInsuranceStatus = "idle";
      // grooming
      state.getGroomingStatus = "idle";
      state.updateGroomingStatus = "idle";
    },
    resetPetProfileUpdateStatus: (state) => {
      state.errorMsg = undefined;
      // pet profile
      state.updatePetProfileStatus = "idle";
      // fashionSize
      state.updateFashionSizeStatus = "idle";
      // health record
      state.updateHealthRecordStatus = "idle";
      // pet insurance
      state.updateInsuranceStatus = "idle";
      // grooming
      state.updateGroomingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // pet profile
      .addCase(getPetProfile.pending, (state) => {
        state.getPetProfileStatus = 'loading';
      })
      .addCase(getPetProfile.fulfilled, (state, action) => {
        state.getPetProfileStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          if (!state.data[action.payload.id])
            state.data[action.payload.id] = {};
          state.data[action.payload.id].detail = action.payload.response.data;
        }
      })
      .addCase(updatePetProfile.pending, (state) => {
        state.updatePetProfileStatus = "loading";
      })
      .addCase(updatePetProfile.fulfilled, (state, action) => {
        state.updatePetProfileStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (!action.payload.response.isSuccess) {
          state.errorMsg = action.payload.response.errorMsg;
        }
      })
      // overview
      .addCase(getPetProfileOverview.pending, (state) => {
        state.getOverviewStatus = "loading";
      })
      .addCase(getPetProfileOverview.fulfilled, (state, action) => {
        state.getOverviewStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          if (!state.data[action.payload.id])
            state.data[action.payload.id] = {};
          state.data[action.payload.id].overview = action.payload.response.data;
        }
      })
      // fahsion size
      .addCase(getPetProfileFashionSize.pending, (state) => {
        state.getFashionSizeStatus = "loading";
      })
      .addCase(getPetProfileFashionSize.fulfilled, (state, action) => {
        state.getFashionSizeStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          if (!state.data[action.payload.id])
            state.data[action.payload.id] = {};
          state.data[action.payload.id].fashionSize = action.payload.response.data;
        }
      })
      .addCase(updatePetProfileFashionSize.pending, (state) => {
        state.updateFashionSizeStatus = "loading";
      })
      .addCase(updatePetProfileFashionSize.fulfilled, (state, action) => {
        state.updateFashionSizeStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (!action.payload.response.isSuccess) {
          state.errorMsg = action.payload.response.errorMsg;
        }
      })
      // health record
      .addCase(getPetProfileHealthRecord.pending, (state) => {
        state.getHealthRecordStatus = "loading";
      })
      .addCase(getPetProfileHealthRecord.fulfilled, (state, action) => {
        state.getHealthRecordStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          if (!state.data[action.payload.id])
            state.data[action.payload.id] = {};
          state.data[action.payload.id].healthRecord = action.payload.response.data;
        }
      })
      .addCase(updatePetProfileHealthRecord.pending, (state) => {
        state.updateHealthRecordStatus = "loading";
      })
      .addCase(updatePetProfileHealthRecord.fulfilled, (state, action) => {
        state.updateHealthRecordStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (!action.payload.response.isSuccess) {
          state.errorMsg = action.payload.response.errorMsg;
        }
      })
      // pet insurance
      .addCase(getPetProfileInsurance.pending, (state) => {
        state.getInsuranceStatus = "loading";
      })
      .addCase(getPetProfileInsurance.fulfilled, (state, action) => {
        state.getInsuranceStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          if (!state.data[action.payload.id])
            state.data[action.payload.id] = {};
          state.data[action.payload.id].petInsurance = action.payload.response.data;
        }
      })
      .addCase(updatePetProfileInsurance.pending, (state) => {
        state.updateInsuranceStatus = "loading";
      })
      .addCase(updatePetProfileInsurance.fulfilled, (state, action) => {
        state.updateInsuranceStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (!action.payload.response.isSuccess) {
          state.errorMsg = action.payload.response.errorMsg;
        }
      })
      // grooming
      .addCase(getPetProfileGrooming.pending, (state) => {
        state.getGroomingStatus = "loading";
      })
      .addCase(getPetProfileGrooming.fulfilled, (state, action) => {
        state.getGroomingStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          if (!state.data[action.payload.id])
            state.data[action.payload.id] = {};
          state.data[action.payload.id].grooming = action.payload.response.data;
        }
      })
      .addCase(updatePetProfileGrooming.pending, (state) => {
        state.updateGroomingStatus = "loading";
      })
      .addCase(updatePetProfileGrooming.fulfilled, (state, action) => {
        state.updateGroomingStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (!action.payload.response.isSuccess) {
          state.errorMsg = action.payload.response.errorMsg;
        }
      })
  },
});

export const { clearPetProfileData } = petsSlice.actions;

export const clearPetProfile = (): AppThunk => (
  dispatch,
) => {
  dispatch(clearPetProfileData());
  dispatch(resetPetProfileStatus());
  dispatch(resetPetProfileUpdateStatus());
};

export const getPetProfileAll = (id: number): AppThunk => (
  dispatch,
) => {
  dispatch(getPetProfile(id));
  dispatch(getPetProfileOverview(id));
  dispatch(getPetProfileFashionSize(id));
};

export const { resetPetProfileStatus, resetPetProfileUpdateStatus } = petsSlice.actions;

export default petsSlice.reducer;

