import api from '@/api';

export async function getDistrictsApi() {
  try {
    const { data } = await api.get('/resources/districts');
    console.log(data);
    return {
      isSuccess: true,
      data: data.payload,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getPetTypesApi() {
  try {
    const { data } = await api.get('/resources/pet_types');
    return {
      isSuccess: true,
      data: data.payload,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getNeedTypesApi() {
  try {
    const { data } = await api.get('/resources/need_types');
    return {
      isSuccess: true,
      data: data.payload,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getShopSearchResultApi(params?: any, page?: number) {
  console.log(params);
  try {
    const { data } = await api.get('/bu/', 
      { 
        params : {
          ...params.searchString && { "search_string": params.searchString },

          ...params.filter?.districts.length > 0 && { "regions": getFilterString(params.filter.districts) },
          ...params.filter?.petTypes.length > 0 && { "pets": getFilterString(params.filter.petTypes) },
          ...params.filter?.needTypes.length > 0 && { "cats": getFilterString(params.filter.needTypes) },

          ...params.regions?.length > 0 && { "regions": getFilterString(params.regions) },
          ...params.pets?.length > 0 && { "pets": getFilterString(params.pets) },
          ...params.cats?.length > 0 && { "cats": getFilterString(params.cats) },

          ...page && { "page": page }
        }
      }
    );
    console.log(data.payload);
    return {
      isSuccess: true,
      result: data.payload.data,
      nextPage: data.payload.current_page < data.payload.last_page ? (data.payload.current_page + 1) : null
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

export async function getShopQuickSearchResultApi(params?: any) {
  try {
    const { data } = await api.get('/bu/', 
      { 
        params : {
          ...params.searchString && { "search_string": params.searchString },
        }
      }
    );
    console.log(data.payload);
    return {
      isSuccess: true,
      result: data.payload.data,
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false
    }
  }
}

const getFilterString = (filters: number[]) => {
  return filters.reduce(
    (prev, current, index) => {
      return prev + (index == 0 ? "" : ",") + current
    }, 
    ""
  );
}
