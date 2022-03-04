import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { updatePetProfileApi, addPetProfileHealthRecordApi, editPetProfilePetInsurancedApi, getPetProfileApi, getPetProfileFashionSizeApi, getPetProfileHealthRecordApi, getPetProfileOverviewApi, getPetProfilePetInsuranceApi, updatePetProfileGroomingApi, getPetProfileGroomingApi } from './api';
import { Status } from '@/types';

export interface PetsState {
  data: { [id: string]: any; };
  status: "loading" | "idle";
  // pet profile
  getPetProfileStatus: Status;
  updatePetProfileStatus: Status;
  // overview
  getOverviewStatus: Status;
  // fashionSize
  fashionSizeLoading: boolean;
  // health record
  getHealthRecordStatus: Status;
  addHealthRecordStatus: Status;
  // pet insurance
  getPetInsuranceStatus: Status;
  editPetInsuranceStatus: Status;
  // grooming
  getGroomingStatus: Status;
  updateGroomingStatus: Status;
}

const initialState: PetsState = {
  data: {},
  status: "idle",

  // pet profile
  getPetProfileStatus: "idle",
  updatePetProfileStatus: "idle",
  // overview
  getOverviewStatus: "idle",
  // fashionSize
  fashionSizeLoading: false,
  // health record
  getHealthRecordStatus: "idle",
  addHealthRecordStatus: "idle",
  // pet insurance
  getPetInsuranceStatus: "idle",
  editPetInsuranceStatus: "idle",
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

export const getPetProfileHealthRecord = createAsyncThunk(
  'getPetProfileHealthRecord',
  async (id: number) => {
    const response = await getPetProfileHealthRecordApi(id);
    return { id, response };
  }
);

export const addPetProfileHealthRecord = createAsyncThunk(
  'addPetProfileHealthRecord',
  async ({ id, name, date, validUntil }: { id: number, name: string, date: Date, validUntil: Date }) => {
    const response = await addPetProfileHealthRecordApi(id, name, date, validUntil);
    return { response };
  }
);

export const getPetProfilePetInsurance = createAsyncThunk(
  'getPetProfilePetInsurance',
  async (id: number) => {
    const response = await getPetProfilePetInsuranceApi(id);
    return { id, response };
  }
);

export const editPetProfilePetInsurance = createAsyncThunk(
  'editPetProfilePetInsurance',
  async ({ id, insuranceId, name, startDate, endDate }: { id: number, insuranceId?: number, name: string, startDate: Date, endDate: Date }) => {
    const response = await editPetProfilePetInsurancedApi(id, name, startDate, endDate, insuranceId!);
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
    resetPetProfileStatus: (state) => {
      state.addHealthRecordStatus == "idle";
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
          state.data[action.payload.id].overflow = action.payload.response.data;
        }
      })
      // fahsion size
      .addCase(getPetProfileFashionSize.pending, (state) => {
        state.fashionSizeLoading = true;
      })
      .addCase(getPetProfileFashionSize.fulfilled, (state, action) => {
        state.fashionSizeLoading = false;
        if (action.payload.response.isSuccess) {
          state.data[action.payload.id].fashionSize = action.payload.response.data;
        }
      })
      // health record
      .addCase(getPetProfileHealthRecord.pending, (state) => {
        state.getHealthRecordStatus = "loading";
      })
      .addCase(getPetProfileHealthRecord.fulfilled, (state, action) => {
        state.getHealthRecordStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          state.data[action.payload.id].healthRecord = action.payload.response.data;
        }
      })
      .addCase(addPetProfileHealthRecord.pending, (state) => {
        state.addHealthRecordStatus = "loading";
      })
      .addCase(addPetProfileHealthRecord.fulfilled, (state, action) => {
        state.addHealthRecordStatus = action.payload.response.isSuccess ? "success" : "failed";
      })
      // pet insurance
      .addCase(getPetProfilePetInsurance.pending, (state) => {
        state.getPetInsuranceStatus = "loading";
      })
      .addCase(getPetProfilePetInsurance.fulfilled, (state, action) => {
        state.getPetInsuranceStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          state.data[action.payload.id].petInsurance = action.payload.response.data;
        }
      })
      .addCase(editPetProfilePetInsurance.pending, (state) => {
        state.editPetInsuranceStatus = "loading";
      })
      .addCase(editPetProfilePetInsurance.fulfilled, (state, action) => {
        state.editPetInsuranceStatus = action.payload.response.isSuccess ? "success" : "failed";
      })
      // grooming
      .addCase(getPetProfileGrooming.pending, (state) => {
        state.getGroomingStatus = "loading";
      })
      .addCase(getPetProfileGrooming.fulfilled, (state, action) => {
        state.getGroomingStatus = action.payload.response.isSuccess ? "success" : "failed";
        if (action.payload.response.isSuccess) {
          state.data[action.payload.id].grooming = action.payload.response.data;
        }
      })
      .addCase(updatePetProfileGrooming.pending, (state) => {
        state.updateGroomingStatus = "loading";
      })
      .addCase(updatePetProfileGrooming.fulfilled, (state, action) => {
        state.updateGroomingStatus = action.payload.response.isSuccess ? "success" : "failed";
      })
  },
});

export const getPetProfileAll = (id: number): AppThunk => (
  dispatch,
  // getState
) => {
  dispatch(getPetProfile(id));
  dispatch(getPetProfileOverview(id));
};

export const { resetPetProfileStatus } = petsSlice.actions;

export default petsSlice.reducer;

