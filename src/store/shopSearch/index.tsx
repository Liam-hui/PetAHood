import { createAsyncThunk, createSlice, isRejected, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store';
import { getDistrictsApi, getNeedTypesApi, getPetTypesApi, getShopSearchResultApi, getShopQuickSearchResultApi, getRatingPicksApi, getCommentsPicksApi, getSpecialCatsApi } from './api';
import { FilterType, FilterNameType } from '@/types';

export interface ShopSearchState {
  status: 'idle' | 'loading' | 'failed' | 'success';
  result: any[];
  quickSearchStatus: 'idle' | 'loading' | 'failed' | 'success';
  quickSearchResult: any[];
  history: string[];
  nextPage: number | null;
  params: any;
  filter: FilterType;
  filterString: string[];
  filterList: { 
    districts: { 
      name: string,
      subCats: {
        name: string,
        items: { id: number, name: string }[]
      }[]
    }[],
    needTypes: { 
      name: string,
      subCats: {
        name: string,
        items: { id: number, name: string }[]
      }[]
    }[],
    petTypes: { id: number, name: string }[],
    specialCats: { id: number, name: string }[],
  };
  ratingPicks: any[];
  commentsPicks: any[];
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
    specialCats: []
  },
  filterString: [],
  filterList: {
    districts: [],
    needTypes: [],
    petTypes: [],
    specialCats: []
  },
  ratingPicks: [],
  commentsPicks: []
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

const getSpecialCats = createAsyncThunk(
  'getSpecialCats',
  async () => {
    const response = await getSpecialCatsApi();
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
    return { response, nextPage };
  }
);

export const getShopQuickSearchResult = createAsyncThunk(
  'getShopQuickSearchResult',
  async (params: any) => {
    const response = await getShopQuickSearchResultApi(params);
    return { response };
  }
);

export const getRatingPicks = createAsyncThunk(
  'getRatingPicks',
  async () => {
    const response = await getRatingPicksApi();
    return { response };
  }
);

export const getCommentsPicks = createAsyncThunk(
  'getCommentsPicks',
  async () => {
    const response = await getCommentsPicksApi();
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
        specialCats: []
      };
      state.filterString = [];
    },
    setShopSearchFilter: (state, action: PayloadAction<{ filterName: FilterNameType, items: { id: number, name: string }[], isForceAdd?: boolean }>) => {
      const { filterName, items, isForceAdd } = action.payload;
      let filter = { ...state.filter };
      let filterString = state.filterString;
      for (const { id, name } of items) {
        const isSelected = filter[filterName].findIndex(x => x == id) != -1;
        filter = {
          ...filter,
          [filterName]: isSelected
            ? (isForceAdd ? filter[filterName] : filter[filterName].filter(x => x != id))
            : filter[filterName].concat(id)
        };
        filterString = isSelected
          ? (isForceAdd ? filterString : filterString.filter(x => x != name))
          : filterString.concat(name);
      }
      state.filter = filter;
      state.filterString = filterString;
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
        if (action.payload.response.isSuccess && action.payload.response.data) {
          state.filterList.petTypes = action.payload.response.data;
        }
      })
      .addCase(getNeedTypes.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.filterList.needTypes = action.payload.response.data;
        }
      })
      .addCase(getSpecialCats.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess && action.payload.response.data) {
          state.filterList.specialCats = action.payload.response.data;
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
          if (state.nextPage == null || action.payload.response.nextPage == state.nextPage + 1) {
            state.result = state.result.concat(action.payload.response.result);
            state.nextPage = action.payload.response.nextPage;
          }
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
      .addCase(getRatingPicks.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.ratingPicks = action.payload.response.result;
        }
      })
      .addCase(getCommentsPicks.fulfilled, (state, action) => {
        if (action.payload.response.isSuccess) {
          state.commentsPicks = action.payload.response.result;
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
  dispatch(getSpecialCats());
};

export default shopSearchSlice.reducer;
