import { createAsyncThunk, createSlice, isRejected, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getDistrictsApi, getNeedTypesApi, getPetTypesApi, getShopSearchResultApi, getShopQuickSearchResultApi } from './api';

type FilterNameType = "districts" | "petTypes" | "needTypes";

type FilterType = {
  districts: any[],
  petTypes: any[],
  needTypes: any[],
};

export interface ShopSearchState {
  status: 'idle' | 'loading' | 'failed' | 'success';
  result: any[];
  quickSearchStatus: 'idle' | 'loading' | 'failed' | 'success';
  quickSearchResult: any[];
  history: string[];
  nextPage: number | null;
  params: any;
  filter: FilterType;
  filterString: string;
  filterList: { 
    districts: { [key: number]: string; },
    petTypes: { [key: number]: string; },
    needTypes: { 
      name: string,
      sub_cats: {
        name: string,
        sub_cats: { [key: number]: string; }
      }[]
    }[],
  };
}

const initialState: ShopSearchState = {
  status: 'idle',
  result: [],
  quickSearchStatus: 'idle',
  quickSearchResult: [],
  history: [],
  nextPage: null,
  params: {},
  filter: {
    districts: [],
    petTypes: [],
    needTypes: [],
  },
  filterString: "",
  filterList: {
    districts: {},
    petTypes: {},
    needTypes: [],
  }
};

const getDistricts = createAsyncThunk(
  'getDistricts',
  async () => {
    const response = await getDistrictsApi();
    return { response };
  }
);

const getPetTypes = createAsyncThunk(
  'getPetTypes',
  async () => {
    const response = await getPetTypesApi();
    return { response };
  }
);

const getNeedTypes = createAsyncThunk(
  'getNeedTypes',
  async () => {
    const response = await getNeedTypesApi();
    return { response };
  }
);

export const getShopSearchResult = createAsyncThunk(
  'getShopSearchResult',
  async (params: any) => {
    const response = await getShopSearchResultApi(params);
    return { params, response };
  }
);

export const getShopSearchResultNextPage = createAsyncThunk(
  'getShopSearchResultNextPage',
  async (_, { getState }) => {
    const state = getState() as any;
    const { params, nextPage } = state.shopSearch;
    const response = await getShopSearchResultApi(params, nextPage);
    return { response };
  }
);

export const getShopQuickSearchResult = createAsyncThunk(
  'getShopQuickSearchResult',
  async (params: any) => {
    const response = await getShopQuickSearchResultApi(params);
    return { response };
  }
);

export const shopSearchSlice = createSlice({
  name: 'shopSearch',
  initialState,
  reducers: {
    resetShopSearch: (state) => {
      state.status = "idle";
      state.result = [];
      state.nextPage = null;
    },
    resetShopQuickSearch: (state) => {
      state.quickSearchResult = [];
    },
    resetShopSearchFilter: (state) => {
      state.filter =  {
        districts: [],
        petTypes: [],
        needTypes: [],
      };
      state.filterString = "";
    },
    setShopSearchFilter: (state, action: PayloadAction<{ filterName: FilterNameType, value: number, label: string }>) => {
      const { filterName, value, label } = action.payload;
      const index = state.filter[filterName].findIndex(x => x == value);
      state.filter = {
        ...state.filter,
        [filterName]: index == -1
          ? state.filter[filterName].concat(value)
          : state.filter[filterName].filter(x => x != value)
      };
      state.filterString = index == -1
        ? state.filterString + (state.filterString == "" ? "" : ", ") + label
        : state.filterString.replace(", " + label, "").replace(label + ", ", "").replace(label!, "")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDistricts.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.filterList.districts = action.payload.response.data;
        }
      })
      .addCase(getPetTypes.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.filterList.petTypes = action.payload.response.data;
        }
      })
      .addCase(getNeedTypes.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.filterList.needTypes = action.payload.response.data;
        }
      })
      .addCase(getShopSearchResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShopSearchResult.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.status = 'success';
          state.params = action.payload.params;
          state.result = action.payload.response.result;
          state.nextPage = action.payload.response.nextPage;
          // add to history
          if (action.payload.params.searchString != undefined && action.payload.params.searchString != "") {
            state.history = state.history.filter(item => item !== action.payload.params.searchString);
            state.history.unshift(action.payload.params.searchString);
          }
        }
        else {
          state.status = 'failed';
        }
      })
      .addCase(getShopSearchResultNextPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShopSearchResultNextPage.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.status = 'success';
          state.result = state.result.concat(action.payload.response.result);
          state.nextPage = action.payload.response.nextPage;
        }
        else {
          state.status = 'failed';
        }
      })
      .addCase(getShopQuickSearchResult.pending, (state) => {
        state.quickSearchStatus = 'loading';
      })
      .addCase(getShopQuickSearchResult.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.quickSearchStatus = 'success';
          state.quickSearchResult = action.payload.response.result;
        }
        else {
          state.quickSearchStatus = 'failed';
        }
      })
  },
});

export const { resetShopSearch, resetShopQuickSearch, setShopSearchFilter, resetShopSearchFilter } = shopSearchSlice.actions;

export const initShopSearch = (): AppThunk => (
  dispatch,
) => {
  dispatch(resetShopSearch());
  dispatch(resetShopQuickSearch());
  dispatch(resetShopSearchFilter());
  dispatch(getDistricts());
  dispatch(getPetTypes());
  dispatch(getNeedTypes());
};

export default shopSearchSlice.reducer;
